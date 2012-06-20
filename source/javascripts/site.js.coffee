# Events
$(window).on 'resize', ->
  $('header.intro').height $(window).height()

$ ->
  $(window).trigger 'resize'
