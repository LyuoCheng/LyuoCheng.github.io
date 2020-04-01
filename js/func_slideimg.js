window.onload = function () {
	mainWidth = document.getElementById("main").offsetWidth;
	imgArr = document.getElementsByClassName("img");
	imgBoxMarginLeft = (mainWidth - imgArr[0].offsetWidth) / 2; //初始化图片位置，单位px
	this.setImgBoxMargin(imgBoxMarginLeft);
	imgNum = imgArr.length; //获取有几张图片
	imgFlag = 0;

	lastPX = 0;
	imgWrap = document.getElementById('img-wrap');
	startX = 0;
	endX = 0;
	t1 = 0;
	t2 = 0;

	var imgBoxWidth = 10;
	for (var i = 0; i < imgNum; i++) {
		imgBoxWidth += imgArr[i].offsetWidth;
	}
	document.getElementById("imgbox").style.width = (imgBoxWidth) + "px";

	document.addEventListener("keydown", keydown);

	document.getElementById('main').addEventListener('mouseenter', beginListen);
	document.getElementById('main').addEventListener('mouseleave', stopListen);

	imgWrap.addEventListener('touchstart', touch, false);
	imgWrap.addEventListener('touchmove', touch, false);
	imgWrap.addEventListener('touchend', touch, false);
	imgWrap.addEventListener('touchcancel', touch, false);


}

window.onresize = function () { //窗口变化重置图片位置
	var newMainWidth = document.getElementById("main").offsetWidth;
	imgBoxMarginLeft = imgBoxMarginLeft + (newMainWidth - mainWidth) / 2;
	this.setImgBoxMargin(imgBoxMarginLeft);
	mainWidth = document.getElementById("main").offsetWidth;
}


function setImgBoxMargin(MarginLeft, time = 0.5) {
	// document.getElementById("imgbox").style.marginLeft = MarginLeft + "px";
	document.getElementById("imgbox").style.transform = "translateX(" + MarginLeft + "px";
	document.getElementById("imgbox").style.transition = "all " + time + "s ease-in-out";
}

function previousImg() {
	if (imgFlag == 0);
	else {
		imgFlag--;
		var step = (imgArr[imgFlag].offsetWidth + imgArr[imgFlag + 1].offsetWidth) / 2;
		imgBoxMarginLeft = imgBoxMarginLeft + step;
		this.setImgBoxMargin(imgBoxMarginLeft);
	}
}

function nextImg() {
	if (imgFlag == imgNum - 1);
	else {
		imgFlag++;
		var step = (imgArr[imgFlag].offsetWidth + imgArr[imgFlag - 1].offsetWidth) / 2;
		imgBoxMarginLeft = imgBoxMarginLeft - step;
		this.setImgBoxMargin(imgBoxMarginLeft);
	}
}

function keydown(event) {
	switch (event.keyCode) {
		case 37:
			previousImg();
			break;
		case 39:
			nextImg();
			break;
	}
}

function mouseDown(event) {
	var event = event || window.event;
	var posX = event.pageX;
	var posY = event.pageY;
	var windowWidth = window.innerWidth;
	if (posX < (windowWidth / 2)) {
		previousImg();
	} else {
		nextImg();
	}
}

function beginListen() {
	document.addEventListener('click', mouseDown);
}

function stopListen() {
	document.removeEventListener('click', mouseDown);
}


function touch(event) {
	var marginLeft_temp = imgBoxMarginLeft;
	var touch = event.targetTouches[0];
	var tar = event.target;
	if (event.type == 'touchmove') {
		var dis = touch.pageX - lastPX;
		endX = touch.pageX;
		if (imgFlag == 1 && dis > 50) {
			dis = 50;
		}
		if (imgFlag == imgNum && dis < -50) {
			dis = -50;
		}
		marginLeft_temp += dis;
		setImgBoxMargin(marginLeft_temp, 0);
	}

	if (event.type == 'touchend') {
		var minus = endX - startX;
		t2 = new Date().getTime() - t1;
		if (Math.abs(minus) > 0) { // 有拖动操作 
			if (Math.abs(minus) < mainWidth * 0.4 && t2 > 500) { // 拖动距离不够,返回! 
				setImgBoxMargin(imgBoxMarginLeft);
			} else { // 超过20%,看方向 
				if (Math.abs(minus) < 20) {
					console.log('距离很短' + minus);
					setImgBoxMargin(imgBoxMarginLeft);
					return;
				} else if (minus < 0) { // endX < startX,向左滑动,是下一张 
					if (imgFlag == imgNum) setImgBoxMargin(imgBoxMarginLeft);
					nextImg();
				} else { // endX > startX ,向右滑动, 是上一张 
					if (imgFlag == 1) setImgBoxMargin(imgBoxMarginLeft);
					previousImg();
				}
			}
		} else { //没有拖动操作 

		}
	}
	if (event.type == 'touchstart') {
		lastPX = touch.pageX;
		startX = lastPX;
		endX = startX;
		t1 = new Date().getTime();
	}
	return false;
}