//  获取滚动距离 sTop1
var sTop1 = $(window).scrollTop()
$(window).scroll(() => {
  let sTop2 = $(this).scrollTop()
  let $backToTop = $('.back-to-top') // 如果放在事件外，好像获取不到了，不知道是不是，插入dom--‘恍如隔世，物是人非’
  if (sTop2 > 70) {
    $Header.css({ padding: 0, opacity: 0.7 })
    $backToTop.css('display', 'block').click(e => {
      $(this).scrollTop(0)
      e.currentTarget.style.cssText = ''
      $Header.css({ top: 0, padding: '10px 0px', opacity: 1 })
    })
    //  向下滑动 隐藏header
    if (sTop2 > sTop1) {
      $Header.css('top', '-11vh')
    } else {
      $Header.css({ top: 0 })
    }
  } else {
    $Header.css({ padding: '10px 0px', opacity: 1 })
    if (sTop2 == 0) {
      $backToTop[0].style.cssText = ''
    }
  }
  //  更新sTop1
  sTop1 = sTop2
})

// bt_menu
$('.bt_menu').click(function() {
  $(this)
    .parent()
    .toggleClass('close')
})
