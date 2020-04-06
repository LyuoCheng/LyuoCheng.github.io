window.onload = function () {
    mainEle = document.getElementById('main');
    mainWidth = mainEle.offsetWidth;
    videoWrap = new Array();
    vwNum = 0;
    if (mainWidth >= 1264) {
        vwNum = 3
        appendElement(mainEle, vwNum, "");
    } else if (1264 > mainWidth && mainWidth >= 836) {
        vwNum = 2;
        appendElement(mainEle, vwNum, "");
    } else if (836 > mainWidth) {
        vwNum = 1;
        appendElement(mainEle, vwNum, "");
    }
}

function appendElement(ele, childNum, filedir) {
    for (var i = 0; i < childNum; i++) {
        videoWrap[i] = document.createElement('div');
        if(childNum==3) videoWrap[i].setAttribute("class","videowrap3");
        if(childNum==2) videoWrap[i].setAttribute("class","videowrap2");
        if(childNum==1) videoWrap[i].setAttribute("class","videowrap1");
        ele.appendChild(videoWrap[i]);
    }
}