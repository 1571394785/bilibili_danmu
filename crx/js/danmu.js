class DanmuAnsis {
    jiexi(xml1) {
        xml3=new DOMParser().parseFromString(xml1,"text/xml");
        var danmu = xml3.getElementsByTagName('d');
        var text = [];
        var aDanmu = { text: "这是弹幕", color: "white", size: 1, position: 0, time: 2 };
        for (var i = 0; i < danmu.length; i++) {
            // 读取属性
            shuxing = danmu[i].getAttribute('p').split(',');
            aDanmu = { "text": danmu[i].innerHTML, "color": shuxing[3], "size": 1, "position": 0, "time": parseInt(parseFloat(shuxing[0]) * 10) };
            text.push(aDanmu);
        }
        return text;
    }
}
danmuAnsis = new DanmuAnsis();
danmuAnsis.jiexi(xml);