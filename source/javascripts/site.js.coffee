#= require jquery.scrollstick
#= require jquery.anchorjump

delay = (n, fn) -> setTimeout fn, n

# Dynamically resize the header.
$(window).on 'resize', -> $('header.intro').height $(window).height()
$ -> $(window).trigger 'resize'

# Scrollstick
$ -> $("nav.main").scrollstick zIndex: 11

# Anchorjump
$ -> $('body').anchorjump for: "[href^='#']", offset: -64, parent: '.anchor'

# Logo magic
$ ->
  $logo  = $('#logo a')
  $white = $logo.find('.white').show()
  $black = $logo.find('.black').show()

  $(window).on 'scroll', ->
    threshold_max  = $('header.intro').height() - 20 - 5
    logo_height    = $logo.height()
    threshold_min  = threshold_max - logo_height

    # Determine clipping boundary.
    sy = $(window).scrollTop()
    y  = sy - threshold_min
    y  = 0  if y < 0
    y  = logo_height  if y > logo_height

    # Update clipping regions.
    $white.css height: (logo_height - y)
    null

# Tab switcheroo
$ ->
  $('body').on 'anchor', (e, href) ->
    $next = $(href)
    $parent = $next.closest '.display'
    $current = $parent.find('.tab:visible')

    $current.find('.card').addClass('fly out')

    delay 400, ->
      $current.hide()
      $next.show()
      $next.find('.card').removeClass('fly out').addClass('fly in')
      delay 0, -> $next.find('.card').removeClass('in')

    $(".active[href^='#']").removeClass 'active'
    $("a[href='#{href}']").addClass 'active'
    null

# Autojump
$ ->
  if location.hash
    $.anchorjump location.hash, offset: -64, parent: '.anchor'

