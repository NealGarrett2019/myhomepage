var aUl = document.getElementsByClassName('sorts')
var oMain = document.getElementsByClassName('main')[0]
var dataArr = []

function init() {
  // 初始化数据
  for (var i = 0; i < sorts.length; i += 10) {
    dataArr.push(sorts.slice(i, i + 10))
  }
  render()
}
init()
// 根据数据渲染页面
function render() {
  for (var j = 0; j < aUl.length; j++) {
    var str = ''
    for (var i = 0; i < dataArr[j].length; i++) {
      str +=
        `<li class="clearfixed" data-one="` +
        j +
        `" data-two=` +
        i +
        `>
                <p class="num" style="${
                  i < 3 ? 'color: #d10000; font-weight:600;' : ''
                }">${i + 1}</p>
                <p class="name">${dataArr[j][i].name}</p>
                <div class="box"></div>
            </li> `
    }
    aUl[j].innerHTML = str
  }
}
oMain.addEventListener('mouseover', function(e) {
  var target = e.target
  if (target.nodeName != 'LI') return
  var oBox = target.getElementsByClassName('box')[0]
  if (oBox.innerHTML) return
  var j = target.getAttribute('data-one')
  var i = target.getAttribute('data-two')
  var ss = `<div class="spread">
        <a class="img" href="javascript:;">
            <img src="${dataArr[j][i].url}" alt="" height="120px">
        </a>
        <div class="info">
            <p class="info__name">
                <a title="${dataArr[j][i].name}" href="javascript:;">${
    dataArr[j][i].name
  }</a>
            </p>
            <p class="info__price">
                <span class="info__price--cur">¥34.30</span>
                <del class="info__price--del">¥49.00</del>
            </p>
            <p class="info__comment">
                <a href="javascript:;">568</a>条评论
            </p>
        </div>
    </div>`
  oBox.innerHTML = ss
})
