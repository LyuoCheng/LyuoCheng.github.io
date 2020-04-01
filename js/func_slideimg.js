window.onload = function () {
	mainWidth = document.getElementById("main").offsetWidth; //获取main元素的宽度
	imgArr = document.getElementsByClassName("img"); //获取class=img的元素数组
	imgBoxMarginLeft = (mainWidth - imgArr[0].offsetWidth) / 2; //图片位置变量
	this.setImgBoxMargin(imgBoxMarginLeft); //初始化图片位置
	imgNum = imgArr.length; //获取有几张图片
	imgFlag = 0; //检测移动到第几张图片

	lastPX = 0; //手指上一次点击的位置
	imgWrap = document.getElementById('img-wrap'); //获取img-wrap
	startX = 0; //手指开始滑动的起点
	endX = 0; //手机结束滑动的终点
	t1 = 0; //手指开始滑动时间点
	t2 = 0; //手指结束滑动时间点

	//确定imgbox有多宽
	var imgBoxWidth = 10;//给个初始变量，防止因为四舍五入距离不够
	for (var i = 0; i < imgNum; i++) {//循环统计图片的总宽度
		imgBoxWidth += imgArr[i].offsetWidth;
	}
	document.getElementById("imgbox").style.width = (imgBoxWidth) + "px";//设置imgbox的宽度

	document.addEventListener("keydown", keydown);//键盘事件监听，用键盘的←→按钮控制图片翻页

	document.getElementById('main').addEventListener('mouseenter', beginListen, false);//鼠标点击屏幕左右侧翻页
	document.getElementById('main').addEventListener('mouseleave', stopListen, false);

	imgWrap.addEventListener('touchstart', touch, false);//触摸监听
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


function setImgBoxMargin(MarginLeft, time = 0.5) {// 设置图片位置
	// document.getElementById("imgbox").style.marginLeft = MarginLeft + "px";
	document.getElementById("imgbox").style.transform = "translateX(" + MarginLeft + "px";
	document.getElementById("imgbox").style.transition = "all " + time + "s ease-in-out";
}

function previousImg() { //上一张图片
	if (imgFlag == 0);
	else {
		imgFlag--;
		var step = (imgArr[imgFlag].offsetWidth + imgArr[imgFlag + 1].offsetWidth) / 2;
		imgBoxMarginLeft = imgBoxMarginLeft + step;
		this.setImgBoxMargin(imgBoxMarginLeft);
	}
}

function nextImg() { //下一张图片
	if (imgFlag == imgNum - 1);
	else {
		imgFlag++;
		var step = (imgArr[imgFlag].offsetWidth + imgArr[imgFlag - 1].offsetWidth) / 2;
		imgBoxMarginLeft = imgBoxMarginLeft - step;
		this.setImgBoxMargin(imgBoxMarginLeft);
	}
}

function keydown(event) { //键盘事件判断
	switch (event.keyCode) {
		case 37:
			previousImg();
			break;
		case 39:
			nextImg();
			break;
	}
}

function mouseDown(event) { //鼠标点击判断
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

function wheelScroll(event){ //鼠标滚轮判断
	var event = event||window.event;
	if(event.deltaY <0) previousImg();
	else if(event.deltaY > 0) nextImg();
}

function beginListen() { //监听到鼠标移动到imgbox，开始监听鼠标点击和滚轮事件
	document.addEventListener('click', mouseDown, false);
	document.addEventListener('wheel', wheelScroll, false);
}

function stopListen() {//监听到鼠标移出imgbox，结束监听鼠标点击和滚轮事件
	document.removeEventListener('click', mouseDown, false);
	document.removeEventListener('wheel', wheelScroll, false);
}


function touch(event) { //处理点击事件
	var marginLeft_temp = imgBoxMarginLeft;
	var touch = event.targetTouches[0];
	var tar = event.target;
	if (event.type == 'touchmove') {
		var dis = touch.pageX - lastPX;
		endX = touch.pageX;
		if (imgFlag == 0 && dis > 50) {
			dis = 50;
		}
		if (imgFlag == imgNum-1 && dis < -50) {
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
					if (imgFlag == imgNum -1) setImgBoxMargin(imgBoxMarginLeft);
					nextImg();
				} else { // endX > startX ,向右滑动, 是上一张 
					if (imgFlag == 0) setImgBoxMargin(imgBoxMarginLeft);
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