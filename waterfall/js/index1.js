var flag = false
var num = 1
function send() {
  if (!flag) {
    // ajax('GET','http://localhost/03waterfall/getPics.php',dealData,'cpage=1',true);
    ajax('GET', 'getPics.txt', dealData, 'cpage=' + num, true)
    flag = true
    num++
  }
}
send()

var oUl = document.getElementsByClassName('list')[0]
var aLi = oUl.getElementsByTagName('li')

function dealData(data) {
  var data = JSON.parse(data)
  // console.log(data)

  if (data.length > 0) {
    data.forEach(function(ele, index) {
      var oItem = document.createElement('div')
      oItem.className = 'item'
      var oImg = new Image()
      oImg.src = ele.image

      oImg.height = (230 * ele.height) / ele.width //为请求来但未加载完成的图片预留高度，预留位置

      oItem.appendChild(oImg)
      // aLi[1].appendChild(oItem); 假设aLi[1]最短，那么 这么加
      aLi[findShortest(aLi)].appendChild(oItem)
    })
    flag = false
  } else {
    alert('数据已全部加载')
  }
}

function findShortest(list) {
  var len = list.length
  var index = 0
  var min = list[0].offsetHeight
  for (var i = 1; i < len; i++) {
    var h = list[i].offsetHeight
    // console.log(h,min)
    if (h < min) {
      min = h
      index = i
    }
  }
  return index
}
// console.log(findShortest(aLi))

// 何时再次发送ajax请求呢？
// 逻辑关系是： 滚动条过去的高度+窗口高度>最短的那一列高度值

// 滚动条事件
window.onscroll = function() {
  var index = findShortest(aLi) //最短那列的序数
  var h = aLi[index].offsetHeight //它的高度

  var scrollHeight =
    document.documentElement.scrollTop || document.body.scrollTop
  var clientHeight =
    document.documentElement.clientHeight || document.body.clientHeight

  if (scrollHeight + clientHeight > h) {
    send()
  }
}

// 总结：
// 1. 图片无需通过.style.height或者.style.width 来设置宽高，直接obj.height和obj.width;同样的还有它的src，obj.src = url---
// 2. ajax里的url值可以是相对的也可以是绝对的，绝对情况下，出错几率很低；
// 3. 滚动条过去的高度 兼容写法：
//     scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
// 4. 窗口高度兼容写法 ：
//     clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
// 5. 瀑布流 还是用float来堆元素吧  记得给它的父亲清除浮动;
// 6. img是特殊的行级块元素，默认样式可以通过display：block；来消除；
// ……………………
