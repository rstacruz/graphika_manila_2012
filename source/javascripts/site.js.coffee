# Dynamically resize the header.
$(window).on 'resize', ->
  $('header.intro').height $(window).height()

$ ->
  $(window).trigger 'resize'

# Logo magic
$ ->
  $logo  = $('#logo a')
  $white = $logo.find('.white').show()
  $black = $logo.find('.black').show()

  $(window).on 'scroll', ->
    threshold_max  = $('header.intro').height() - 30 - 5
    logo_height    = $logo.height()
    threshold_min  = threshold_max - logo_height

    # Determine clipping boundary.
    sy = $(window).scrollTop()
    y  = sy - threshold_min
    y  = 0  if y < 0
    y  = logo_height  if y > logo_height

    # Update clipping regions.
    $white.css height: (logo_height - y)
