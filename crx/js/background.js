function getinfo() {
    // get请求
    fetch('http://localhost:8000/')
        .then(response => response.json())
        .then(data => console.log(data));
}
//收到通讯
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log(sender.tab ?
        "from a content script:" + sender.tab.url :
        "from the extension");
    console.log(request.greeting);
    if (request.greeting == "hello")
        setInterval(getinfo, 1000);
    sendResponse({
        farewell: "goodbye"
    });
});