function getinfo() {
    // get请求
    fetch('http://localhost:8000/')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // 解析json
            if (data.status == "send") {
                // 停止定时器
                chrome.storage.local.get(['timer'], function (result) {
                    clearInterval(result.timer);
                });
                chrome.storage.local.set({danmu:data.data});
            }
        })
}

//收到通讯
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
    console.log(request.greeting);
    if (request.greeting == "hello")
        var timer = setInterval(getinfo, 1000);
    // 全局变量
    chrome.storage.local.set({ timer: timer });
    sendResponse({
        farewell: "goodbye"
    });
});