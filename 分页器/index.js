;(function($) {
  var page = {
    init: function(dom, obj) {
      this.fillHtml(dom, obj)
      this.bindEvent(dom, obj)
    },
    //    生成dom结构
    fillHtml: function(dom, obj) {
      dom.empty()
      //    console.log(dom, obj)
      //    容错
      if (
        obj.pageCurrent < 1 ||
        obj.pageCount < 1 ||
        obj.pageCurrent > obj.pageCount
      )
        return
      //    生成上一页标签
      if (obj.pageCurrent == 1) {
        dom.append(
          '<a href="javascript:;" class=" pg-prev disabled" id="pg-prev"><上一页</a>'
        )
      } else {
        dom.append(
          '<a href="javascript:;" class=" pg-prev" id="pg-prev"><上一页</a>'
        )
      }

      if (obj.pageCount <= 7) {
        for (var i = 1; i <= 7; i++) {
          if (i == obj.pageCurrent) {
            dom.append(
              '<a href="javascript:;" class="pg-item current">' + i + '</a>'
            )
          } else {
            dom.append('<a href="javascript:;" class="pg-item">' + i + '</a>')
          }
        }
      } else {
        var start = obj.pageCurrent - 2,
          end = obj.pageCurrent + 2

        if (obj.pageCurrent <= 4) {
          //   1 2 3 4 5 6 ... 90
          start = 1
          end = 6
        } else if (obj.pageCurrent >= obj.pageCount - 3) {
          //   1 ... 85 86 87 88 89 90
          start = obj.pageCount - 5
          end = obj.pageCount
        }
        if (obj.pageCurrent > 4) {
          dom.append(
            '<a href="javascript:;" class="pg-item">' +
              1 +
              '</a><span class="pg-item pg-pots">...</span>'
          )
        }
        for (; start <= end; start++) {
          if (start == obj.pageCurrent) {
            dom.append(
              ' <a href="javascript:;" class="pg-item current">' +
                start +
                '</a>'
            )
          } else {
            dom.append(
              ' <a href="javascript:;" class="pg-item">' + start + '</a>'
            )
          }
        }
        if (obj.pageCurrent < obj.pageCount - 3) {
          dom.append(
            '<span class="pg-item pg-pots">...</span><a href="javascript:;" class="pg-item">' +
              obj.pageCount +
              '</a>'
          )
        }
      }
      //   生成下一页
      if (obj.pageCurrent == obj.pageCount) {
        dom.append(
          '<a href="javascript:;" class="pg-next disabled" id="pg-next">下一页></a>'
        )
      } else {
        dom.append(
          '<a href="javascript:;" class="pg-next" id="pg-next">下一页></a>'
        )
      }
    },

    // 事件绑定
    bindEvent: function(dom, obj) {
      var that = this
      // console.log(dom)

      dom.on('click', '.pg-item', function() {
        //   console.log(parseInt($(this).text()))
        obj.pageCurrent = parseInt($(this).text())
        that.fillHtml(dom, obj)
        //执行回调
        obj.callBack()
      })
      dom.on('click', '#pg-prev', function(e) {
        obj.pageCurrent--

        that.fillHtml(dom, obj)
        //执行回调
        obj.callBack()
      })
      dom.on('click', '#pg-next', function(e) {
        obj.pageCurrent++

        that.fillHtml(dom, obj)
        //执行回调
        obj.callBack()
      })
    }
  }
  $.fn.paging = function(options) {
    //   console.log(this)
    var obj = {
      pageCount: 10,
      pageCurrent: 1,
      callBack: function() {}
    }
    var args = $.extend(obj, options)
    page.init(this, args)
  }
})($)
