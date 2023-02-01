var btn = document.getElementById('menu');
var btn1 = document.getElementById('daoru');
var btn2 = document.getElementById('jiazai');
function printDOM(){
    // 获取当前标签页的DOM
    chrome.tabs.printDOM(function (dom) {
        console.log(dom);
    });
}
btn1.addEventListener('click', function () {
    //通讯到background.js
    chrome.runtime.sendMessage({
        greeting: "hello"
    }, function (response) {
        console.log(response.farewell);
    });
    // 新建一个标签页
    chrome.tabs.create({
        url: 'DanMu://123'
    });
    console.log('daoru');
});
btn2.addEventListener('click', function () {
    console.log('jiazai');
    printDOM();
});