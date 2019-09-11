var total = 13 //图片数目
var init = function() {
  var winWidth = $(window).width()

  var spacing = 4 //间距
  var pWidth = (winWidth - spacing * 3) / 4
  var str = ''
  for (var i = 1; i <= total; i++) {
    var imgSrc = 'img/' + i + '.jpg'
    str += `<li data-id="${i}" class="animated bounceIn" style="width: ${pWidth}px; height: ${pWidth}px; margin: ${spacing /
      2}px 0;"><canvas id="cvs_${i}" width= ${pWidth +
      0.5}px; height= ${pWidth + 0.5}px;></canvas></li>`

    var imageObj = new Image()
    imageObj.index = i
    imageObj.onload = function() {
      var cvs = $('#cvs_' + this.index)[0].getContext('2d')
      var ss //便于缩略图展示 长图定height 宽图定width
      if (this.width > this.height) {
        ss = this.height
      } else {
        ss = this.width
      }
      // console.log(ss, pWidth)
      cvs.drawImage(this, 0, 0, ss, ss, 0, 0, pWidth, pWidth)
    }
    imageObj.src = imgSrc
  }

  // console.log(str)
  $('.wrapper').html(str)
}
