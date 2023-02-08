function search() {
    var search = document.getElementById("search").value;
    if (search == "") {
        alert("请输入要搜索的番剧名称");
        return;
    }
    console.log(search);
    var url = "https://api.dandanplay.net/api/v2/search/episodes?anime=" + search;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var data = JSON.parse(xhr.responseText);
                解析(data);
            }
        }

    }
    xhr.send();
}
function 解析(data){
    // 删除之前的搜索结果
    var result = document.getElementById("result");
    result.innerHTML = "";
    var json=data
    console.log(json["animes"]);
    var li=document.createElement("li");
    for (var i = 0; i < json["animes"].length; i++) {
        var div=document.createElement("div");
        div.innerHTML ="<h2 class='result_title'>"+ json["animes"][i]["animeTitle"]+"</h2>";
        document.getElementById("result").appendChild(div);
        for (var j = 0; j < json["animes"][i]["episodes"].length; j++) {
            var li=document.createElement("li");
            // 设置鼠标样式
            li.style.cursor = "pointer";
            li.className = "result-item";
            // 设置鼠标点击事件
            li.addEventListener("click", function () {
                下载弹幕(this.getAttribute("episodeId"));
            });
            li.setAttribute("episodeId", json["animes"][i]["episodes"][j]["episodeId"]);
            li.innerHTML = json["animes"][i]["episodes"][j]["episodeTitle"];
            div.appendChild(li);
        }
    }
    // 给class=result_title添加点击事件
    var result_title = document.getElementsByClassName("result_title");
    for (var i = 0; i < result_title.length; i++) {
        result_title[i].addEventListener("click", function () {
            var result_item = document.getElementsByClassName("result-item");
            for (var j = 0; j < result_item.length; j++) {
                if (result_item[j].parentNode == this.parentNode) {
                    if (result_item[j].style.display == "none" || result_item[j].style.display == "") {
                        result_item[j].style.display = "block";
                    } else {
                        result_item[j].style.display = "none";
                    }
                }
            }
        });
    }
}
function 下载弹幕(episodeId) {
    var url = "https://api.dandanplay.net/api/v2/comment/" + episodeId+"?withRelated=true";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                data = JSON.parse(xhr.responseText);
                将弹幕解析到xml(data);
            }
        }
    }
    xhr.send();
}
function 将弹幕解析到xml(data){
    var json=data
    var xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<i>\n';
    for (var i = 0; i < json["comments"].length; i++) {
        xml += '<d p="'+json["comments"][i]["p"]+'">'+json["comments"][i]["m"]+'</d>\n';
    }
    console.log("运行了",i);
    xml += '</i>';
    console.log(xml);
    chrome.storage.local.set({danmu:xml});
    alert("弹幕已经加载完成");
}
document.getElementById("search").addEventListener("keydown", function (e) {
    if (e.keyCode == 13) {
        search();
    }
});
document.getElementById("search-btn").addEventListener("click", function () {
    search();
});