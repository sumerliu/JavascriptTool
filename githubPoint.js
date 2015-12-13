(function(){
  var list = ['#eeeeee','#d6e685', '#8cc665', '#44a340', '#1e6823']
  // 定义格子的颜色列表
  var rect = jQuery('.js-calendar-graph-svg>g>g>rect')
  rect.css('opacity','1')
  rect.attr('fill', list[0])
  rect.removeAttr('data-date')
  rect.click(function(){
    var value = list.indexOf($(this).attr('fill')) + 1
    value %= list.length
    $(this).attr('fill', list[value])
  })
})()
