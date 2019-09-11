var tabs = document.getElementById('tabs').getElementsByTagName('li'),
  lists = document.getElementById('lists').getElementsByTagName('ul')

//点击切换 seckill-con lists 秒杀商品展示
for (var i = 0; i < tabs.length; i++) {
  tabs[i].onclick = function() {
    for (var i = 0; i < tabs.length; i++) {
      // console.log(tabs[i].className);
      if (tabs[i] == this) {
        tabs[i].className = 'active'
        lists[i].className = 'clearfixed active'
      } else {
        tabs[i].className = ''
        lists[i].className = 'clearfixed'
      }
    }
  }
}

//固定seckill-banner -> 右侧滚动条
var secBanner = document.getElementsByClassName('seckill-banner')[0]
window.onscroll = function() {
  var scrollTop =
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    window.pageYOffset
  // console.log(scrollTop)
  if (scrollTop >= 260) {
    secBanner.className = 'seckill-banner fixed'
  } else {
    secBanner.className = 'seckill-banner'
  }
}

// nav-items部分显隐效果
var oUl = document
    .getElementsByClassName('header-nav')[0]
    .getElementsByClassName('nav-items')[0],
  oItem = oUl.getElementsByClassName('item')
var showBox = document.getElementsByClassName('show-box')
var oMenu = document.getElementsByClassName('header-nav-menu')

oUl.onmouseover = () => {
  oUl.className = 'nav-items active'
  for (var i = 0; i < oItem.length; i++) {
    oItem[i].index = i
    oItem[i].onmouseenter = function() {
      for (var j = 0; j < showBox.length; j++) {
        if (j == this.index) {
          // showBox[j].style.opacity = '1' 不好用，出现上下滑动 下边虚化
          showBox[j].style.display = 'block'
        } else {
          showBox[j].style.display = 'none'
        }
      }
    }
  }
}
oUl.onmouseleave = () => {
  oUl.className = 'nav-items'
}
