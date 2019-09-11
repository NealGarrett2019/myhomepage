var oAudio = document.getElementById('audio'),
  oCurrentTime = document.getElementsByClassName('current-time')[0],
  oAllTime = document.getElementsByClassName('all-time')[0],
  oBtn = document.getElementsByClassName('btn')[0],
  //oBtn下的播放|暂停icon
  oPlay = oBtn.getElementsByTagName('span')[0],
  //进度条
  oProActive = document.getElementsByClassName('pro-active')[0],
  //进度条上的小圆点
  oRadioBox = document.getElementsByClassName('radio-box')[0]
// oRadio = oRadioBox.getElementsByTagName('span')[0];

var oPrevious = document.getElementsByClassName('previous')[0],
  oNext = document.getElementsByClassName('next')[0]

var oMain = document.getElementsByClassName('main')[0],
  oImg = oMain.getElementsByTagName('img')[0]

//歌名 & 歌手
var oName = document.getElementById('_name'),
  oSname = document.getElementById('_sname')

//设定计时器 以获取每秒的播放进度
var timer,
  duration,
  oPresent,
  index = 0

var list = [
  {
    name: '妳太善良',
    sname: '张智霖',
    src: './source/张智霖 - 妳太善良.mp3',
    ssrc: './source/张智霖.png'
  },
  {
    name: 'Viva la Vida',
    sname: 'Darin',
    src: './source/Darin - Viva la Vida.mp3',
    ssrc: './source/Darin1.jpg'
  },
  {
    name: '奇迹の蔷薇',
    sname: 'Galla',
    src: './source/Galla - 奇迹の蔷薇 (奇迹的蔷薇).mp3',
    ssrc: './source/GALLA.png'
  }
]

// oAllTime总时长是要等素材加载好才能获取的 ondurationchange线上用这个
oAudio.oncanplay = onCanplay

// 鼠标点击 暂停/播放事件
oBtn.onmouseup = function() {
  return oAudio.paused ? musicPlay() : musicPause()
}

//播放结束，列表循环
oAudio.onended = function() {
  musicPause()
  oAudio.currentTime = 0
  nextPlay() //列表循环
  //musicPlay() 单曲循环
}

//鼠标拖动播放进度条
//播放时间变化 & 显示时间变化 & 松开鼠标播放
oRadioBox.onmousedown = () => {
  //鼠标拖拽时 不让进度条自动增长
  clearInterval(timer)
  //初始化mPresent
  var mPresent = oPresent
  document.body.onmousemove = e => {
    var newWidth = e.clientX - oProActive.getBoundingClientRect().left
    //控制newWidth的值的范围[0，240]
    if (newWidth < 0) {
      newWidth = 0
    } else if (newWidth > 240) {
      newWidth = 240
    }
    mPresent = parseFloat(newWidth / 240) * 100
    // 进度条变化
    oProActive.style.width = mPresent + '%'
    // oCurrentTime.innerHTML 变化
    oCurrentTime.innerHTML = conversion((duration * mPresent) / 100)
  }

  //绑定一个鼠标抬起事件 同样给到body 并且移除这两个事件
  document.body.onmouseup = () => {
    document.body.onmousemove = null
    document.body.onmouseup = null
    oAudio.currentTime = (duration * mPresent) / 100
    musicPlay()
  }
}

//上一曲
oPrevious.onclick = () => {
  musicPause()
  index--
  index = index < 0 ? list.length - 1 : index
  //切换歌曲函数
  tabFn(index)
}

//下一曲
oNext.onclick = nextPlay
function nextPlay() {
  musicPause()
  index++
  index = index > list.length - 1 ? 0 : index
  tabFn(index)
}

//音量控制
var vol = document.getElementsByClassName('vol')[0],
  vSpan = vol.getElementsByTagName('span')[0],
  volActive = document.getElementsByClassName('vol-active')[0],
  volBar = document.getElementsByClassName('vol-bar')[0],
  barBox = document.getElementsByClassName('bar-box')[0],
  volDot = document.getElementsByClassName('vol-dot')[0]

vol.onclick = () => {
  volBar.style.display = volBar.style.display != 'none' ? 'none' : 'block'
  //取消冒泡  若不取消，每次调解完音量 控制条会自动隐藏
  volBar.onclick = e => {
    e.stopPropagation()
  }
}
//音量控制 控制条
barBox.onmousedown = () => {
  document.body.onmousemove = e => {
    var newHeight = -(e.clientY - volActive.getBoundingClientRect().bottom)
    if (newHeight < 4) {
      newHeight = 4
      vSpan.className = 'iconfont icon-tubiaozhizuomoban' //音量图标替换为静音
    } else if (newHeight > 100) {
      newHeight = 100
      vSpan.className = 'iconfont icon-shengyinkai'
    } else {
      vSpan.className = 'iconfont icon-shengyinkai'
    }

    volActive.style.height = newHeight + 'px'
    oAudio.volume = parseFloat(newHeight / 100).toFixed(1)
  }
  document.body.onmouseup = () => {
    document.body.onmousemove = null
    document.body.onmouseup = null
  }
}

//播放
function musicPlay() {
  oAudio.play()
  oImg.style.animationPlayState = 'running'
  oMain.className = 'main mainAf'
  //按钮变成暂停状态
  oPlay.className = 'iconfont icon-zanting'
  timer = setInterval(movePro, 200)
}

//暂停
function musicPause() {
  oAudio.pause()
  //按钮变成播放状态
  oPlay.className = 'iconfont icon-bofang'
  clearInterval(timer)
  oImg.style.animationPlayState = 'paused'
  oMain.className = 'main'
}

//播放进度条变化
function movePro() {
  var currenttime = oAudio.currentTime
  oPresent = (parseFloat(currenttime / duration) * 100).toFixed(2) + '%'
  oCurrentTime.innerHTML = conversion(currenttime)
  oProActive.style.width = oPresent
}

//audio.oncanplay触发函数
function onCanplay() {
  oCurrentTime.innerHTML = conversion(this.currentTime)
  duration = this.duration
  oAllTime.innerHTML = conversion(duration)
}

//切换src && 歌曲信息
function showMore(num) {
  //每次切换 播放前获取相应的src资源
  oAudio.src = list[num].src
  //歌手 && 歌名 展示
  oName.innerText = list[num].name
  oSname.innerText = list[num].sname
  oImg.src = list[num].ssrc
}

//切换歌曲函数
function tabFn(index) {
  oAudio.currentTime = 0
  oAudio.oncanplay = onCanplay
  showMore(index)
  musicPlay()
}

//时长转化      eg. 220s -> 03:40
function conversion(time) {
  var MinT =
    parseInt(time / 60) < 10 ? '0' + parseInt(time / 60) : parseInt(time / 60)
  var SecT =
    parseInt(time % 60) < 10 ? '0' + parseInt(time % 60) : parseInt(time % 60)
  return MinT + ':' + SecT
}
