var btn = document.getElementById('menu');
var btn1 = document.getElementById('daoru');
var btn2 = document.getElementById('jiazai');
var btn3 = document.getElementById('shibie');
var btn4 = document.getElementById('test');
function printDOM() {
    //发送消息到content.js
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function (response) {
            console.log(response.farewell);
        });
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
btn3.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { greeting: "shibie" }, function (response) {
            console.log(response.farewell);
        });
    });
    
});
btn4.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { greeting: "test" }, function (response) {
            console.log(response.farewell);
        });
    });
    
});