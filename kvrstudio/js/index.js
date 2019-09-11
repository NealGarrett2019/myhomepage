var oCaro = document.getElementsByClassName('carousel')[0],
    oUl = oCaro.getElementsByTagName('ul')[0],
    oLis = oUl.getElementsByTagName('li'),
    oNext = document.getElementById('next'),
    oPrev = document.getElementById('prev');
var oImg = oLis[0].getElementsByTagName('img')[0];
var timer1;
var flag = true;


function moveDis(dis) {
    var time = 900; //设定轮播时间
    var eachTime = 30; //定时器时长
    var step = dis/(time/eachTime);
    var timer1 = setInterval(move,eachTime);
    var newLeft = oUl.offsetLeft + dis;
    function move() {
        flag = false;
        if(dis > 0 && newLeft > oUl.offsetLeft || dis < 0 && newLeft < oUl.offsetLeft){
            oUl.style.left = oUl.offsetLeft + step + 'px';
        }else {
            clearInterval(timer1);
            oUl.style.left = newLeft + 'px';
            if(newLeft == -10620){
                oUl.style.left = '-1180px';
            }
            if(newLeft == 0){
                oUl.style.left = '-9440px';
            }
            flag = true;
        }
    }
}

oNext.onclick = function () {
    if (flag === false) return;
    moveDis(-1180);
    
}
oPrev.onclick = function () {
    if (flag === false) return;
    moveDis(1180);
    
}

//自动轮播
var timer2;
var oExpend = document.getElementsByClassName('wrapper-expand')[0];
timer2 = setInterval(oNext.onclick, 4000);
oExpend.onmouseover = function () {
    clearInterval(timer2);
}
oExpend.onmouseout = function () {
    timer2 = setInterval(oNext.onclick, 4000);
}