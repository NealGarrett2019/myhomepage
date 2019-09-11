// 初始化 图片加载 到列表
init()

var $img = $('#largeImg')
var cId //当前放大图的id 索引值 1~total
$('.wrapper').on('tap', 'li', function() {
  var _id = (cId = $(this).attr('data-id'))
  // console.log(_id)
  loadImg(_id)
})

//上滑回到列表  & 左滑切换  & 右滑切换
$('.large-box')
  .on('swipeUp', function() {
    $(this).hide()
    init()
  })
  .swipeLeft(function() {
    cId++
    // 最后一张 停止右滑
    if (cId > total) {
      cId = total
    } else {
      loadImg(cId, function() {
        $img[0].addEventListener(
          'webkitAnimationEnd',
          function() {
            $img.removeClass('animated bounceInRight')
            $img[0].removeEventListener('webkitAnimationEnd', this) //removeEventListener 要传两个参数，第三个可不传，默认false
          },
          false
        )
        $img.addClass('animated bounceInRight')
      })
    }
  })
  .swipeRight(function() {
    cId--
    // 最后一张 停止左滑
    if (cId < 1) {
      cId = 1
    } else {
      loadImg(cId, function() {
        $img[0].addEventListener(
          'webkitAnimationEnd',
          function() {
            $img.removeClass('animated bounceInLeft')
            $img[0].removeEventListener('webkitAnimationEnd', this)
          },
          false
        )
        $img.addClass('animated bounceInLeft')
      })
    }
  })

//图片加载函数
function loadImg(id, callback) {
  // console.log(333)
  $('.large-box').css('display', 'flex')
  var imgsrc = 'img/' + id + '.jpg'
  var imageObj = new Image()
  imageObj.src = imgsrc
  imageObj.onload = function() {
    var w = this.width
    var h = this.height
    //   console.log(pr)
    var pr = $(window).height() / $(window).width() //设备屏幕高宽比 每次加载时获取新的
    $img.css({ height: 'auto', width: 'auto' })
    if (h / w > pr) {
      $img.attr('src', imgsrc).css('height', '100vh')
    } else {
      $img.attr('src', imgsrc).css('width', '100vw')
    }
  }
  //回调函数 有则执行
  callback && callback()
}
