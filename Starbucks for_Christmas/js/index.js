var oBanner = document.getElementById('banner_pics')
var myMap = document.getElementById('myMap')
var oimg = oBanner.getElementsByTagName('img')[0]

var arr = myMap.areas[0].coords.split(',')
var arr1 = ['35.47%', '62.27%', '64.22%', '70.8%']

window.onresize = function() {
  var arrN = []
  for (var i = 0; i < 4; i++) {
    var num

    if (oBanner.offsetWidth > 992) {
      num = parseFloat(arr[i]) / 100
    } else {
      num = parseFloat(arr1[i]) / 100
    }

    if (i % 2) {
      arrN.push(num * oimg.offsetHeight)
    } else {
      arrN.push(oBanner.offsetWidth * num)
    }
  }
  myMap.areas[0].coords = arrN.toString()
  //   console.log(myMap.areas[0].coords)
}

var mySwiper = new Swiper('.barista .swiper-container', {
  direction: 'horizontal', // 垂直切换选项
  loop: true, // 循环模式选项

  slidesPerView: 'auto',
  loopedSlides: 5,
  spaceBetween: 20,
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
})
