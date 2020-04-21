window.onload = function () {
    mainEle = document.getElementById('main');
    mainWidth = mainEle.offsetWidth;

    videoWrap = new Array();
    for (var i = 0; i < 3; i++) videoWrap[i] = document.createElement('div');

    vbNum = 0;
    videoBox = new Array();
    videoFrame = new Array();
    videoMsg=[
        {"name":"PUNK LUDA",
        "url":"//player.bilibili.com/player.html?aid=412507620&bvid=BV1uV411f7WV&cid=173831641&page=1&high_quality=1&danmaku=0",
        "doc":"I am PUNK LUDA's Doc"}
    ];

    for (i in videoMsg) {
        var videoCtn = videoMsg[i];
        videoBox[vbNum] = document.createElement('div');
        videoBox[vbNum].setAttribute('class', 'videobox');

        var name = document.createElement('h2');
        var nameNode = document.createTextNode(videoCtn.name);
        name.appendChild(nameNode);

        videoFrame[vbNum] = document.createElement('iframe');
        videoFrame[vbNum].setAttribute('class','iframe');
        videoFrame[vbNum].src = videoCtn.url;
        videoFrame[vbNum].frameBorder = "no";
        videoFrame[vbNum].frameSpacing = "no";
        videoFrame[vbNum].allowFullscreen = "true";
        videoFrame[vbNum].sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts";
        // video.style.width=videoBox[vbNum].offsetWidth;
        // video.style.height=0.5625*videoBox[vbNum].offsetWidth;

        var doc = document.createElement('p');
        var docNode = document.createTextNode(videoCtn.doc);
        doc.appendChild(docNode);

        videoBox[vbNum].appendChild(videoFrame[vbNum]);
        videoBox[vbNum].appendChild(name);
        videoBox[vbNum].appendChild(doc);

        vbNum++;

    }
    appendElement(mainEle, 1);
    var videoHeight=videoBox[0].offsetWidth * 0.5625;
    for(var i=0; i<vbNum ;i++) {
        videoFrame[i].height=videoHeight;
    }
    
}

window.onresize =function(){
    var videoHeight=videoBox[0].offsetWidth * 0.5625;
    for(var i=0; i<vbNum ;i++) videoFrame[i].height=videoHeight;

}


function appendElement(ele, childNum) {
    for (var i = 0; i < childNum; i++) {
        if (childNum == 3) videoWrap[i].className = "videowrap3";
        if (childNum == 2) videoWrap[i].className = "videowrap2";
        if (childNum == 1) videoWrap[i].className = "videowrap1";
        ele.appendChild(videoWrap[i]);
    }
    for (var i = 0; i < vbNum; i++) {
        videoWrap[0].appendChild(videoBox[i]);
    }
}