class DanmuAnsis {
    jiexi(xml1) {
        var hang = xml1.split('\n');
        console.log(hang.length);
        var text = [];
        for (var i = 0; i < hang.length; i++) {
            // 如果是<d开头
            if (hang[i].indexOf('<d') != -1) {
                var shuxing = hang[i].split('p="')[1].split('"')[0].split(',');
                var aDanmu = { "text": hang[i].split('>')[1].split('<')[0], "color": shuxing[3], "size": 1, "position": 0, "time": parseInt(parseFloat(shuxing[0]) * 10) };
                text.push(aDanmu);
            }
        }
        // var xml3 = new DOMParser().parseFromString(xml1, "text/xml");
        // var danmu = xml3.getElementsByTagName('d');
        // console.log("找到了d标签",danmu.length)
        // var text = [];
        // var aDanmu = { text: "这是弹幕", color: "white", size: 1, position: 0, time: 2 };
        // for (var i = 0; i < danmu.length; i++) {
        //     // 读取属性
        //     var shuxing = danmu[i].getAttribute('p').split(',');
        //     aDanmu = { "text": danmu[i].innerHTML, "color": shuxing[3], "size": 1, "position": 0, "time": parseInt(parseFloat(shuxing[0]) * 10) };
        //     text.push(aDanmu);
        // }
        // console.log('运行了',i);
        console.log(text);
        return text;
    }
}
// 接收消息
function getDOM() {
    // 获取dom文本
    var dom = document.body.innerHTML;
    return dom;
}
function findAllVideo() {
    console.log('findAllVideo');
    var video = document.getElementsByTagName('video');
    // 输出所有video标签的秒数
    for (var i = 0; i < video.length; i++) {
        console.log(video[i].duration);
        console.log(video[i].currentTime);
        window.current_time = video[i].currentTime;
        window.duration = video[i].duration;
        window.current_video = video[i];
    }
    run(1);
}
function findDOM() {
    // 检测鼠标悬浮的元素
    $(document).unbind('click');
    $(document).unbind('mousemove');
    $(document).mousemove(function (e) {
        var dom = e.target;
        var div = window.div;
        if (dom.id == 'select') {
        } else {
            $(window.div).css("left", dom.getBoundingClientRect().left + window.scrollX);
            $(window.div).css("top", dom.getBoundingClientRect().top + window.scrollY);
            div.style.width = dom.offsetWidth + 'px';
            div.style.height = dom.offsetHeight + 'px';
        }

    });
    // 监听鼠标点击事件
    $(document).click(function (e) {
        var select_dom = e.target;
        window.div.style.display = 'none';
        window.select_dom = select_dom;
        console.log(select_dom);
        // 移除监听点击事件
        $(document).unbind('click');
        // 移除监听鼠标移动事件
        $(document).unbind('mousemove');
        run(0);
    });

}
// 判断自己是否在iframe
function isIframe() {
    var isIframe = window != window.top ? true : false;
    return isIframe;
}
// 监听video播放的时间
function video_s() {
    var video = []
    video_dom = document.getElementsByTagName('video');
    for (var i = 0; i < video_dom.length; i++) {
        video.push(video_dom[i]);
    }
    for (var i = 0; i < video.length; i++) {
        // video是否在播放
        // 保存当前播放时间
        chrome.storage.local.set({ 'nowTime': video[i].currentTime });
    }

}
//构建弹幕
function createdanmu() {
    danmu = ["123", "456"];
    color = ["#FE0302", "#FF7204", "#FFAA02", "#FFD302", "#FFFF00", "#A0EE00", "#00CD00", "#019899", "#4266BE", "#89D5FF", "#CC0273", "#222222", "#9B9B9B", "#FFFFFF"];
    random_danmu = danmu[Math.floor(Math.random() * danmu.length)];
    random_color = color[Math.floor(Math.random() * color.length)];
    //random_position大部分0，少部分1，2
    random_position = Math.floor(Math.random() * 3);
    random_position = String(random_position);
    json1 = {
        "text": random_danmu,
        "color": random_color,
        "size": "1",
        "position": "0",
        "time": $('#danmu').data("nowTime") + 1
    };
    return json1;
}
//添加弹幕
function add() {
    var dm = createdanmu()
    $("#danmu").danmu("addDanmu", dm)
}
// 校准弹幕和播放器的时间
function set_time() {
    chrome.storage.local.get(['nowTime'], function (result) {
        var nowTime = result.nowTime;
        var danmu_nowTime = $("#danmu").data("nowTime") / 10;
        // console.log("获取到的校准时间", nowTime, danmu_nowTime);
        // 如果绝对值小于3秒，就不校准
        if (Math.abs(nowTime - danmu_nowTime) > 3) {
            $("#danmu").data("nowTime", parseInt(nowTime * 10));
            console.log("校准时间", nowTime);
        }

    });
}
//运行弹幕
function run(flag) {
    if (flag == 1) {
        console.log('run in auto mode');
    } else {
        var dom = window.select_dom;
        console.log('run in select mode');
    }
    chrome.storage.local.get(['danmu'], function (result) {
        console.log(result.danmu);
        var danmu = result.danmu;
        danmu = new DanmuAnsis().jiexi(danmu);
        $("#danmu").danmu("addDanmu", danmu);
        // 打印所有弹幕
        console.log($("#danmu").data("danmu"));
    });
    if (flag == 0) {
        $("#danmu").danmu({
            height: window.select_dom.offsetHeight,
            width: window.select_dom.offsetWidth,
            zindex: 9999,   //弹幕区域z-index属性
            speed: 9000,      //滚动弹幕的默认速度，这是数值是弹幕滚过每672像素所需要的时间（毫秒）
            sumTime: 244000,   //弹幕流的总时间
            danmuLoop: false,   //是否循环播放弹幕
            defaultFontColor: "#FFFFFF",   //弹幕的默认颜色
            fontSizeSmall: 16,     //小弹幕的字号大小
            FontSizeBig: 24,       //大弹幕的字号大小
            opacity: "0.6",			//默认弹幕透明度
            topBottonDanmuTime: 6000,   // 顶部底部弹幕持续时间（毫秒）
            SubtitleProtection: false,     //是否字幕保护
            positionOptimize: true,         //是否位置优化，位置优化是指像AB站那样弹幕主要漂浮于区域上半部分
            maxCountInScreen: 1000,   //屏幕上的最大的显示弹幕数目,弹幕数量过多时,优先加载最新的。
            maxCountPerSec: 1000      //每分秒钟最多的弹幕数目,弹幕数量过多时,优先加载最新的。
        });
        $("#danmu").css("left", dom.getBoundingClientRect().left + window.scrollX);
        $("#danmu").css("top", dom.getBoundingClientRect().top + window.scrollY);


    } else if (flag == 1) {
        $("#danmu").danmu({
            height: 500,
            width: 500,
            zindex: 9999,   //弹幕区域z-index属性
            speed: 9000,      //滚动弹幕的默认速度，这是数值是弹幕滚过每672像素所需要的时间（毫秒）
            sumTime: 244000,   //弹幕流的总时间
            danmuLoop: false,   //是否循环播放弹幕
            defaultFontColor: "#FFFFFF",   //弹幕的默认颜色
            fontSizeSmall: 16,     //小弹幕的字号大小
            FontSizeBig: 24,       //大弹幕的字号大小
            opacity: "0.6",			//默认弹幕透明度
            topBottonDanmuTime: 6000,   // 顶部底部弹幕持续时间（毫秒）
            SubtitleProtection: false,     //是否字幕保护
            positionOptimize: true,         //是否位置优化，位置优化是指像AB站那样弹幕主要漂浮于区域上半部分
            maxCountInScreen: 1000,   //屏幕上的最大的显示弹幕数目,弹幕数量过多时,优先加载最新的。
            maxCountPerSec: 1000      //每分秒钟最多的弹幕数目,弹幕数量过多时,优先加载最新的。
        });
        $("#danmu").css("left", 0);
        $("#danmu").css("top", 0);
        $("#danmu").css("width", "100%");
        $("#danmu").css("height", "100%");
    }
    $("#danmu").danmu("danmuStart");
    $("#danmu").css("pointer-events", "none");
    // 启动校准
    setInterval(set_time, 1000);


    console.log("弹幕运行");
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
    if (request.greeting == "hello" && isIframe() == false) {
        框选新建();
        findDOM();
    }
    if (request.greeting == "hello" && isIframe() == true)

        sendResponse({ farewell: "run" });
    if (request.greeting == "shibie") {
        console.log("开始识别");
        add_a_red_zhezhao();
    }
    sendResponse({ farewell: "shibie" });
    if (request.greeting == "test")
        setInterval(video_s, 1000);
});
function add_a_red_zhezhao() {
    try {
        document.getElementsByTagName("video")[0].parentNode.appendChild(识别新建());
        run(1);
    }
    catch (e) {
        console.log(e);
    }

}
setInterval(video_s, 1000);

// 新建一个div用以显示框选元素
var div = document.createElement('div');
div.id = 'select';
div.style.position = 'absolute';
div.style.top = '0';
div.style.left = '0';
div.style.border = '1px solid red';
div.style.zIndex = '999999';
div.style.backgroundColor = 'rgba(255,0,0,0.2)';
div.style.pointerEvents = 'none';
document.body.appendChild(div);
// 全局变量
window.div = div;
function 框选新建() {
    // 新建一个弹幕div
    var danmu = document.createElement('div');
    danmu.id = 'danmu';
    danmu.style.position = 'absolute';
    danmu.style.backgroundColor = 'rgba(100,255,100,0)';
    document.body.appendChild(danmu);
}
function 识别新建() {
    // 新建一个弹幕div
    var danmu = document.createElement('div');
    danmu.id = 'danmu';
    danmu.style.top = '0';
    danmu.style.left = '0';
    danmu.style.position = 'absolute';
    danmu.style.backgroundColor = 'rgba(100,255,100,0)';
    danmu.style.width = '100%';
    danmu.style.height = '100%';
    danmu.style.zIndex = '999999';
    danmu.style.pointerEvents = 'none';
    return danmu;
}
