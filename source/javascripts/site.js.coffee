#= require jquery.scrollstick
#= require jquery.anchorjump
#= require jquery.countdown

delay = (n, fn) -> setTimeout fn, n

# Dynamically resize the header.
$(window).on 'resize', -> $('header.intro').css minHeight: $(window).height()
$ -> $(window).trigger 'resize'

# Scrollstick
$ -> $("nav.main").scrollstick zIndex: 11, reclone: false

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

    $current.find('.area > *').addClass('fly out')

    delay 400, ->
      $current.hide()
      $next.show()
      $next.find('.area > *').removeClass('fly out').addClass('fly in')
      delay 0, -> $next.find('.area > *').removeClass('in')

    $(".active[href^='#']").removeClass 'active'
    $("a[href='#{href}']").addClass 'active'
    null

# Autojump
$(window).on 'load', ->
  if location.hash
    delay 0, -> $.anchorjump location.hash, offset: -64, parent: '.anchor'

# Countdown
$ ->
  $('[data-countdown_until]').each ->
    $this = $(this)
    sUntil = $this.attr('data-countdown_until')

    if sUntil
      $this.countdown
        until: new Date(sUntil)
        update: (segment, text) ->
          $el = $this.find(".#{segment}.box")
          $strong = $el.find('strong')

          $el.queue (next) ->
            # Move the old one out...
            $strong.removeClass('enter').addClass('exit')
            setTimeout (-> $strong.remove()), 500

            # And slide a new one in.
            $new = $('<strong>')
              .addClass('enter')
              .insertBefore($strong)
              .text(text)
            setTimeout (-> $new.removeClass('enter')), 0

            setTimeout next, 600
            null


# Days text rotator
$ ->
  days = ['days']
  strings = ['nights', 'mornings', 'dreams']
  isDay = true

  # Gets a sample from the given array
  sample = (arr) ->
    arr[parseInt(Math.random() * arr.length)]

  work = ->
    str = if isDay then sample(strings) else days
    isDay = not isDay

    $parent = $('.days-text')

    # Out with the old
    $old = $parent.find('span')
    $old.removeClass('enter').addClass('exit')
    setTimeout (-> $old.remove()), 500

    # In with the new
    $new = $("<span>").text(str).addClass('enter').appendTo($parent)
    setTimeout (-> $new.removeClass('enter')), 0

    setTimeout work, 3000

  work()
