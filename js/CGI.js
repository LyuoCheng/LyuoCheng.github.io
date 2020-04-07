window.onload = function () {
    path = "";
    mainEle = document.getElementById('main');
    mainWidth = mainEle.offsetWidth;
    videoWrap = new Array();
    vwNum = 0;
    var xmlhttp= new this.XMLHttpRequest();
    
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
        videoWrap[i] = document.createElement('div');
        if (childNum == 3) videoWrap[i].setAttribute("class", "videowrap3");
        if (childNum == 2) videoWrap[i].setAttribute("class", "videowrap2");
        if (childNum == 1) videoWrap[i].setAttribute("class", "videowrap1");
        ele.appendChild(videoWrap[i]);
    }
    var videoNum = 10;
    var videoBox = new Array();
    for (var i = 0; i < videoNum; i++) {
        videoBox[i] = document.createElement('div');
        videoBox[i].setAttribute('class', 'videobox');
        var index = i % childNum;
        videoWrap[index].appendChild(videoBox[i]);
    }
}

function removeElement(ele, childNum) {
    for (var i = 0; i < childNum; i++) {
        ele.removeChild(videoWrap[i]);
    }
}