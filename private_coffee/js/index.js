var toRight = document.getElementsByClassName('toRight');
var logoMove = document.getElementsByClassName('logoMove');
// 窗口的高度
var screenHeight = document.documentElement.clientHeight || document.body.clientHeight;

move([
    {
        dom: logoMove,
        move: 'logoMoveAni'
    },
    {
        dom: toRight,
        move: 'toRightAni'
    }
]);
window.onscroll = function () {
    move([
        {
            dom: logoMove,
            move: 'logoMoveAni'
        },
        {
            dom: toRight,
            move: 'toRightAni'
        }
    ]);
}

function move(list) {
    list.forEach(function (ele, index) {
        //元素距离文档顶部的高度
        var eleTop;
        //浏览器滚动条滚动过去的距离
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
        var len = ele.dom.length;
        if(len) {//传入ele.dom的是dom集合
            for(var i = 0; i < len; i++) {
                eleTop = ele.dom[i].offsetTop;
                if(scrollHeight + screenHeight > eleTop){
                    ele.dom[i].classList.add(ele.move);
                }
            }
        }else {//传入的ele.dom是dom元素
            eleTop = ele.dom.offsetTop;
            if(scrollHeight + screenHeight > eleTop){
                ele.dom.classList.add(ele.move);
            }
        }
    });
}



//选项卡切换咖啡类型
var coffeeItems = Array.prototype.slice.call(document.getElementsByClassName('coffee-item'));
var activeCoffee = document.getElementsByClassName('active')[0];
var items = document.getElementsByClassName('item');
var activeItem = items[0];
coffeeItems.forEach(function (ele, index) {
    ele.onclick = function () {
        //切换下标线
        activeCoffee.classList.remove('active');
        activeCoffee = ele.getElementsByTagName('span')[0];
        activeCoffee.classList.add('active');

        //切换咖啡种类
        activeItem.style.display = 'none';
        activeItem = items[index];
        activeItem.style.display = 'block';
    }

})