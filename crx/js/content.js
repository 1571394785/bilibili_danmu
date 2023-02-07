class DanmuAnsis {
    jiexi(xml1) {
        var xml3 = new DOMParser().parseFromString(xml1, "text/xml");
        var danmu = xml3.getElementsByTagName('d');
        var text = [];
        var aDanmu = { text: "这是弹幕", color: "white", size: 1, position: 0, time: 2 };
        for (var i = 0; i < danmu.length; i++) {
            // 读取属性
            var shuxing = danmu[i].getAttribute('p').split(',');
            aDanmu = { "text": danmu[i].innerHTML, "color": shuxing[3], "size": 1, "position": 0, "time": parseInt(parseFloat(shuxing[0]) * 10) };
            text.push(aDanmu);
        }
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
            div.style.top = dom.getBoundingClientRect().top + 'px';
            div.style.left = dom.getBoundingClientRect().left + 'px';
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
        console.log("获取到的校准时间", nowTime, danmu_nowTime);
        // 如果绝对值小于3秒，就不校准
        if (Math.abs(nowTime - danmu_nowTime) > 3) {
            $("#danmu").danmu("setTime", parseInt(nowTime * 10));
            console.log("校准时间", nowTime);
        }

    });
}
//运行弹幕
function run(flag = 0) {
    if (flag == 1) {
        var dom = window.current_video;
    } else {
        var dom = window.select_dom;
    }
    chrome.storage.local.get(['danmu'], function (result) {
        var danmu = result.danmu;
        danmu = new DanmuAnsis().jiexi(danmu);
        $("#danmu").danmu("addDanmu", danmu);
    });
    $("#danmu").danmu({
        height: window.select_dom.offsetHeight,
        width: window.select_dom.offsetWidth,
        zindex: 9999,   //弹幕区域z-index属性
        speed: 9000,      //滚动弹幕的默认速度，这是数值是弹幕滚过每672像素所需要的时间（毫秒）
        sumTime: 65565,   //弹幕流的总时间
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
    $("#danmu").danmu("danmuStart");
    $("#danmu").css("left", window.select_dom.getBoundingClientRect().left);
    $("#danmu").css("top", window.select_dom.getBoundingClientRect().top + window.scrollY);
    console.log(window.select_dom.getBoundingClientRect().top)
    console.log(window.scrollY)
    $("#danmu").css("pointer-events", "none");
    // 启动校准
    setInterval(set_time, 1000);
    setInterval(video_s, 1000);
}
// 监听窗口全屏
document.addEventListener("fullscreenchange", function (e) {
    if (document.fullscreenElement) {
        console.log("进入全屏", document.fullscreenElement);
        // 将#danmu移到全屏元素的父元素
        var old = $("#danmu")
        $(document.fullscreenElement).parent().append($("#danmu"));
        // 删除原来的
        old.remove();
        // 重新设置弹幕的顶 左
        $("#danmu").css("left", document.fullscreenElement.getBoundingClientRect().left);
        $("#danmu").css("top", document.fullscreenElement.getBoundingClientRect().top + window.scrollY);

    }
    else {
        console.log("退出全屏");
    }
});
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
    if (request.greeting == "hello" && isIframe() == false)

        findDOM();
    if (request.greeting == "hello" && isIframe() == ture)

    sendResponse({ farewell: "run" });
    if (request.greeting == "shibie")
        findAllVideo();
    sendResponse({ farewell: "shibie" });
    if (request.greeting == "test")
        setInterval(video_s, 1000);
});
setInterval(video_s, 1000);

    // 新建一个div用以显示框选元素
    var div = document.createElement('div');
    div.id = 'select';
    div.style.position = 'absolute';
    div.style.top = '0';
    div.style.left = '0';
    div.style.border = '1px solid red';
    div.style.zIndex = '999999';
    div.style.backgroundColor = 'rgba(255,0,0,0.6)';
    div.style.pointerEvents = 'none';
    document.body.appendChild(div);
    // 全局变量
    window.div = div;

    // 新建一个弹幕div
    var danmu = document.createElement('div');
    danmu.id = 'danmu';
    danmu.style.position = 'absolute';
    danmu.style.backgroundColor = 'rgba(100,255,100,0)';
    document.body.appendChild(danmu);

