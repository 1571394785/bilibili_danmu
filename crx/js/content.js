// 接收消息
function getDOM() {
    // 获取dom文本
    var dom = document.body.innerHTML;
    return dom;
}
function findAllVideo() {
    var video = document.getElementsByTagName('video');
    // 删除所有video标签
    for (var i = 0; i < video.length; i++) {
        video[i].parentNode.removeChild(video[i]);
    }
    console.log(video.length);
    return video.length;
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
            div.style.top = dom.offsetTop + 'px';
            div.style.left = dom.offsetLeft + 'px';
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
        run();
    });
    
}
//构建弹幕
function createdanmu() {
    danmu= ["123","456"];
    color=["#FE0302","#FF7204","#FFAA02","#FFD302","#FFFF00","#A0EE00","#00CD00","#019899","#4266BE","#89D5FF","#CC0273","#222222","#9B9B9B","#FFFFFF"];
    random_danmu=danmu[Math.floor(Math.random()*danmu.length)];
    random_color=color[Math.floor(Math.random()*color.length)];
    //random_position大部分0，少部分1，2
    random_position=Math.floor(Math.random()*3);
    random_position=String(random_position);
    json1 = {
        "text": random_danmu,
        "color":random_color,
        "size": "1",
        "position": "0",
        "time": $('#danmu').data("nowTime")+1
    };
    return json1;
}
//添加弹幕
function add(){
    var dm=createdanmu()
    $("#danmu").danmu("addDanmu",dm)
}
//运行弹幕
function run(){
    
    $("#danmu").danmu({
        height: window.select_dom.offsetHeight,
        width: window.select_dom.offsetWidth,
        zindex :9999,   //弹幕区域z-index属性
        speed:9000,      //滚动弹幕的默认速度，这是数值是弹幕滚过每672像素所需要的时间（毫秒）
        sumTime:65565,   //弹幕流的总时间
        danmuLoop:false,   //是否循环播放弹幕
        defaultFontColor:"#FFFFFF",   //弹幕的默认颜色
        fontSizeSmall:16,     //小弹幕的字号大小
        FontSizeBig:24,       //大弹幕的字号大小
        opacity:"0.6",			//默认弹幕透明度
        topBottonDanmuTime:6000,   // 顶部底部弹幕持续时间（毫秒）
        SubtitleProtection:false,     //是否字幕保护
        positionOptimize:false,         //是否位置优化，位置优化是指像AB站那样弹幕主要漂浮于区域上半部分
        maxCountInScreen: 1000,   //屏幕上的最大的显示弹幕数目,弹幕数量过多时,优先加载最新的。
        maxCountPerSec: 1000      //每分秒钟最多的弹幕数目,弹幕数量过多时,优先加载最新的。
    });
    $("#danmu").danmu("danmuStart");
    $("#danmu").css("left",window.select_dom.offsetLeft);
    $("#danmu").css("top",window.select_dom.offsetTop);
    $("#danmu").css("pointer-events","none");
    setInterval(add,101);
}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
    if (request.greeting == "hello")
        findDOM();
        sendResponse({ farewell: findAllVideo() });
});
// 新建一个div用以显示框选元素
var div = document.createElement('div');
div.id = 'select';
div.style.position = 'absolute';
div.style.top = '0';
div.style.left = '0';
div.style.border = '1px solid red';
div.style.zIndex = '999999';
div.style.backgroundColor = 'rgba(255,0,0,0.3)';
div.style.pointerEvents = 'none';
document.body.appendChild(div);
// 全局变量
window.div = div;

// 新建一个弹幕div
var danmu = document.createElement('div');
danmu.id = 'danmu';
danmu.style.position = 'absolute';
danmu.style.backgroundColor = 'rgba(100,100,100,0.3)';
document.body.appendChild(danmu);