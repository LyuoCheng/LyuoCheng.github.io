window.onload = function () {
    path = "";
    mainEle = document.getElementById('main');
    mainWidth = mainEle.offsetWidth;

    videoWrap = new Array();
    vwNum = 0;
    for (var i = 0; i < 3; i++) videoWrap[i] = document.createElement('div');

    vbNum = 0;
    videoBox = new Array();
    var xmlhttp = new this.XMLHttpRequest();
    xmlhttp.open("GET", "/json/CGI.json", true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var videoMsg = JSON.parse(this.responseText);
            for (i in videoMsg) {
                var videoCtn=videoMsg[i];
                videoBox[vbNum] = document.createElement('div');
                videoBox[vbNum].setAttribute('class', 'videobox');

                var name = document.createElement('h2');
                var nameNode = document.createTextNode(videoCtn[0]);
                name.appendChild(nameNode);

                var video = document.createElement('iframe');
                video.src=videoCtn[1];
                video.frameBorder="no";
                video.frameSpacing="no";
                video.allowFullscreen="true";
                // video.style.width=videoBox[vbNum].offsetWidth;
                // video.style.height=0.5625*videoBox[vbNum].offsetWidth;

                var doc = document.createElement('p');
                var docNode = document.createTextNode(videoCtn[2]);
                doc.appendChild(docNode);

                videoBox[vbNum].appendChild(video);
                videoBox[vbNum].appendChild(name);
                videoBox[vbNum].appendChild(doc);

                vbNum++;
            }
        }
    }
    

    if (mainWidth >= 1264) {
        vwNum = 3;
        appendElement(mainEle, vwNum, path);
    } else if (1264 > mainWidth && mainWidth >= 836) {
        vwNum = 2;
        appendElement(mainEle, vwNum, path);
    } else if (836 > mainWidth) {
        vwNum = 1;
        appendElement(mainEle, vwNum, path);
    }
}

window.onresize = function () {
    removeElement(mainEle, vwNum);
    mainWidth = mainEle.offsetWidth;
    if (mainWidth >= 1264) {
        vwNum = 3;
        appendElement(mainEle, vwNum, path);
    } else if (1264 > mainWidth && mainWidth >= 836) {
        vwNum = 2;
        appendElement(mainEle, vwNum, path);
    } else if (836 > mainWidth) {
        vwNum = 1;
        appendElement(mainEle, vwNum, path);
    }
}

function appendElement(ele, childNum, filedir) {
    for (var i = 0; i < childNum; i++) {
        if (childNum == 3) videoWrap[i].className="videowrap3";
        if (childNum == 2) videoWrap[i].className= "videowrap2";
        if (childNum == 1) videoWrap[i].className="videowrap1";
        ele.appendChild(videoWrap[i]);
    }
    for (var i = 0; i < vbNum; i++) {
        var index = i % childNum;
        videoWrap[index].appendChild(videoBox[i]);
    }
}

function removeElement(ele, childNum) {
    for (var i = 0; i < childNum; i++) {
        ele.removeChild(videoWrap[i]);
    }
}