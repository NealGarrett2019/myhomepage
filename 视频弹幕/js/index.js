var oSend = document.getElementsByClassName('send')[0],
    oInput = document.getElementsByTagName('input')[0];
var oMain = document.getElementsByClassName('main')[0];

oSend.onclick = function() {
    var val = oInput.value;//获取发送内容

    // 对val进行判断，并清空发过的弹幕
    if(val.length <= 0 || (/^\s+$/).test(val)) {
        alert('内容不能为空！');
        return;
    }else if(val.length > 20){
        alert('内容不得超过20字！');
        oInput.value = '';
        return;
        // oInput.value = ''; 函数都跳出去了，还怎么清空啊！！！
    }  
    createBrg(val);
    oInput.value = '';
}


//生成弹幕（DOM元素）
function createBrg(str) {
    var oSpan = document.createElement('span');
    oSpan.innerText = str;
    oMain.append(oSpan);
    var brgLength = oSpan.offsetWidth;
    moveBrg(oSpan,brgLength);
    // console.log(oSpan.offsetWidth)
    placeBrg(oSpan);
    sizeBrg(oSpan);
    discolourBrg(oSpan);
}

//弹幕运动
function moveBrg(dom,brgLength) {
    var nowLeft;
    var timer = setInterval(() => {
        nowLeft = dom.offsetLeft -4;
        dom.style.left = nowLeft + 'px';
        if(-nowLeft >= brgLength) {
                // console.log(888)
                oMain.removeChild(dom);//object.parentNode.removeChild(object)
                // dom.removeNode(true);dom.removeNode(false); 只能在IE中使用
                clearInterval(timer);//删除了对象，但内存中还存在它的事件、属性    
            }
        // console.log(888) //我用来查看计时器清除情况
    }, 50); 
}

//随机高度  （规定了4个高度值即4行）
function placeBrg(dom) {
    var num = Math.random();
    if(num < 0.25){
        dom.style.top = 0 + 'px';
    }else if(num < 0.5 && num >=0.25) {
        dom.style.top = 25 + 'px';
    }else if(num < 0.75 && num >=0.5) {
        dom.style.top = 50 + 'px';
    }else {
        dom.style.top = 75 + 'px';
    }
}

//随机大小 (设置14-24大小的字)
function sizeBrg(dom) {
    dom.style.fontSize = Math.floor(Math.random()*11 + 14) + 'px';
    // console.log(dom.style.fontSize);
}

//随机颜色
function discolourBrg(dom) {
    // rgb(num1, num2, num3)
    //Math.random()*256
    dom.style.color = 'rgb' + '(' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ')';
    // console.log(dom.style.color);
    // dom.style.textShadowColor = dom.style.color
}
//给input绑定enter发送事件
oInput.onkeydown = (e) => {
    oInput.focus()
    if(e.keyCode == 13) {     
        oSend.style.borderStyle = 'inset';//btn获得按下效果
    }
    oInput.onkeyup = (e) => {
        if(e.keyCode == 13) {
            oSend.onclick();//两个if中任选一个放 即可 效果无差  逻辑顺序上该放这里 
            oSend.style.borderStyle = 'outset';//btn复位
        }
    }
}

//视频播放时 input自动获取焦点 （我设置监测时间间隔为0.5）
var video = document.getElementById('video');

setInterval(() => {
        if(!video.paused){
        oInput.focus()
    }
}, 500);
