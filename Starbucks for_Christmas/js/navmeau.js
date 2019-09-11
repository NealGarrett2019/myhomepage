$('#list>li>a').click(function() {
  $(this)
    .next('ul')
    .slideToggle()
  $(this)
    .find('.caret')
    .toggleClass('rot')
})
$('#meau').click(() => {
  $('.navmeau').addClass('show')
  $('#shade')
    .fadeIn(300)
    .click(() => {
      $('.navmeau').removeClass('show')
      $('#shade').fadeOut(300)
    })
})

//获取滚动距离 sTop1
var sTop1 = $(window).scrollTop()
$(window).scroll(() => {
  $('.navmeau').removeClass('show')
  $('#shade').fadeOut(300)

  var sTop2 = $(this).scrollTop()
  //  document.title = sTop1 + '|' + sTop2

  // 获取实时滚动距离 sTop2 sTop2>sTop1 表示向下滚动页面
  if (sTop2 > 100) {
    $('.header').attr('id', 'header')

    if (sTop2 > sTop1) {
      $('#header').css({ top: '-65px' })
      //  #header 高度为60px，但还有 1px y-shadow + 4px blur
    } else {
      $('#header').css({ top: 0 })
    }
  } else {
    //   滚动距离小于 初始.header高度，让其显示.header高度
    $('.header').removeAttr('id')
  }
  //   更新sTop1 以获取最新比较值
  sTop1 = sTop2
})
