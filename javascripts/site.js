/*! ---------------------------------------
 *  Scrollstick
 *  http://github.com/rstacruz/jquery-stuff
 * ---------------------------------------- */

// Makes something stick to the top when it gets scrolled away from.
//
//    $("#nav").scrollstick({
//      zIndex: 20,
//      reclone: true|false   /* Reclone everytime. Default true */
//    });
//
(function($) {
  $.fn.scrollstick = function(options) {
    var reposition, $this = this;
    if (!this.length) return;

    this.data('stuck', false);

    var defaults = {
      min: this.offset().top,
      max: null,
      zIndex: 10,
      reclone: true
    };

    options = $.extend({}, defaults, options);
    var $clone = null;

    // On resizing, reposition the top/left/right of the cloned element.
    $(window).on('resize', reposition = function() {
      if ((!$clone) || (!$this.data('stuck'))) return;

      $clone.css({
        position: 'fixed',
        zIndex: options.zIndex,
        top: 0,
        left: $this.offset().left,
        right: $(window).width() - ($this.offset().left + $this.outerWidth())
      });
    });

    $(window).on('scroll', function() {
      var pos = $(window).scrollTop();
      var inside = pos > options.min && (!options.max || pos < options.max);
      var stuck = $this.data('stuck');

      // Stick it.
      if (!stuck && inside) {
        $this.data('stuck', true);

        if (!$clone) {
          $clone = $this.clone();
          $clone.find('script').remove();
          $clone.addClass('clone').appendTo($('body'));
        }

        reposition();

        $this.css({ visibility: 'hidden' });
      }

      // Unstick it.
      else if (stuck && !inside) {
        $this.data('stuck', false);
        $this.css({ visibility: 'visible' });

        // Either kill the clone, or just hide it
        if (options.reclone) {
          $clone.remove();
          $clone = null;
        } else {
          $clone.css({ top: '-9999px' });
        }
      }
    });
  };
})(jQuery);
/*! ---------------------------------------
 *  Anchorjump
 *  http://github.com/rstacruz/jquery-stuff
 * ---------------------------------------- */

// Makes anchor jumps happen with smooth scrolling.
//
//    $("#menu a").anchorjump();
//    $("#menu a").anchorjump({ offset: -30 });
//
//    // Via delegate:
//    $("#menu").anchorjump({ for: 'a', offset: -30 });
//
// You may specify a parent. This makes it scroll down to the parent.
// Great for tabbed views.
//
//     $('#menu a').anchorjump({ parent: '.anchor' });
//
// You can jump to a given area.
//
//     $.anchorjump('#bank-deposit', options);

(function($) {
  var defaults = {
    speed: 500,
    offset: 0,
    for: null,
    parent: null
  };

  $.fn.anchorjump = function(options) {
    options = $.extend({}, defaults, options);

    if (options['for']) {
      this.on('click', options['for'], onClick);
    } else {
      this.on('click', onClick);
    }

    function onClick(e) {
      var $a = $(e.target).closest('a');
      if (e.ctrlKey || e.metaKey || e.altKey || $a.attr('target')) return;

      e.preventDefault();
      var href = $a.attr('href');

      $.anchorjump(href, options);
    };
  };

  // Jump to a given area.
  $.anchorjump = function(href, options) {
    options = $.extend({}, defaults, options);

    var top = 0;

    if (href != '#') {
      var $area = $(href);
      // Find the parent
      if (options.parent) {
        var $parent = $area.closest(options.parent);
        if ($parent.length) { $area = $parent; }
      }
      if (!$area.length) { return; }
      top = $area.offset().top + options.offset;
    }

    $('body, html').animate({ scrollTop: top }, options.speed);
    $('body').trigger('anchor', href);

    // Add the location hash via pushState.
    if (window.history.pushState) {
      window.history.pushState({ href: href }, "", href);
    }
  };
})(jQuery);
/**
 * @name      jQuery Countdown
 * @author    mikong
 * @version   0.1
 * @license   MIT License
 *
 * Acknowledgement:
 *   Started from Martin Angelov's jQuery-Countdown code,
 *   but greatly modified.
 *
 * Example:
 *
 *   $('.expiry').countdown({ until: myDate });
 *
 * Options:
 *
 * All options except `until` are optional.
 *
 *   - until: (Date) The date to countdown to. Required.
 *   - selectors: (Dictionary object) Selectors to query.
 *   - update: (Function) Custom function to update text.
 *
 *   until: (Date)
 *   selectors: {
 *     seconds: '.seconds',
 *     minutes: '.minutes',
 *     hours: '.hours',
 *     days: '.days'
 *   }
 *   update: function()
 */

(function($) {
  var MINUTES = 60,
      HOURS = 60 * MINUTES,
      DAYS = 24 * HOURS;

  $.fn.countdown = function(options) {
    var opts = $.extend({}, {
      until: new Date(),
      selectors: {
        seconds: '.seconds',
        minutes: '.minutes',
        hours: '.hours',
        days: '.days'
      },
      update: update
    }, options);

    var $this = $(this);
    var sel = opts.selectors;
    var left;
    var last;

    // Store for later.
    $this.data('countdown_options', opts);

    (function tick() {
      left = Math.floor((opts.until - new Date) / 1000);

      if (left < 0) {
        left = 0;
      }

      var duration = breakDuration(left);
      updateDate(last, duration);

      setTimeout(tick, 1000);
      last = duration;
    })();

    // Calls the updater function on all segments.
    function updateDate(previous, now) {
      callUpdate('days');
      callUpdate('hours');
      callUpdate('minutes');
      callUpdate('seconds');

      function callUpdate(segment) {
        if (!previous || previous[segment] != now[segment]) {
          opts.update(segment, pad2(now[segment]));
        }
      }
    }

    // Default updater function.
    function update(segment, text) {
      $this.find(sel[segment]).text(text);
    }

    return this;
  };

  // Returns duration as a days/hours/minutes/seconds dictionary.
  function breakDuration(seconds) {
    var days = Math.floor(seconds / DAYS);
    seconds -= days * DAYS;

    var hours = Math.floor(seconds / HOURS);
    seconds -= hours * HOURS;

    var minutes = Math.floor(seconds / MINUTES);
    seconds -= minutes * MINUTES;

    return { days: days, hours: hours, minutes: minutes, seconds: seconds };
  }

  function pad2(num) {
    var s = num + '';
    while (s.length < 2) s = "0" + s;
    return s;
  }

})(jQuery);
(function() {
  var delay;

  delay = function(n, fn) {
    return setTimeout(fn, n);
  };

  /*
  # Vertical responsiveness
  */


  $(window).on('resize', function() {
    var klass;
    klass = '';
    if ($(window).height() < 650) {
      klass = 'short';
    }
    return $('body').removeClass('short').addClass(klass);
  });

  /*
  # Dynamically resize the header
  */


  $(window).on('resize', function() {
    return $('header.intro').css({
      minHeight: $(window).height()
    });
  });

  $(function() {
    return $(window).trigger('resize');
  });

  /*
  # Scrollstick
  */


  $(function() {
    return $("nav.main").scrollstick({
      zIndex: 11,
      reclone: false
    });
  });

  /*
  # Anchorjump
  */


  $(function() {
    return $('body').anchorjump({
      "for": "[href^='#']",
      offset: -64,
      parent: '.anchor'
    });
  });

  /*
  # Logo magic
  # (kittens died in making this effect)
  */


  $(function() {
    var $black, $logo, $white;
    $logo = $('#logo a');
    $white = $logo.find('.white').show();
    $black = $logo.find('.black').show();
    return $(window).on('scroll', function() {
      var logo_height, sy, threshold_max, threshold_min, y;
      threshold_max = $('header.intro').height() - 20 - 5;
      logo_height = $logo.height();
      threshold_min = threshold_max - logo_height;
      sy = $(window).scrollTop();
      y = sy - threshold_min;
      if (y < 0) {
        y = 0;
      }
      if (y > logo_height) {
        y = logo_height;
      }
      $white.css({
        height: logo_height - y
      });
      return null;
    });
  });

  $(function() {
    return $('body').on('anchor', function(e, href) {
      var $current, $next, $parent;
      $next = $(href);
      if (href === '#call-for-entries') {
        $('body').addClass('entries-active');
      } else {
        $('body').removeClass('entries-active');
        $parent = $next.closest('.display');
        $current = $parent.find('.tab:visible');
        $current.find('.area > *').addClass('fly out');
        delay(400, function() {
          $current.hide();
          $next.show();
          $next.find('.area > *').removeClass('fly out').addClass('fly in');
          return delay(0, function() {
            return $next.find('.area > *').removeClass('in');
          });
        });
      }
      $(".active[href^='#']").removeClass('active');
      $("a[href='" + href + "']").addClass('active');
      return null;
    });
  });

  /*
  # Autojump
  */


  $(window).on('load', function() {
    if (location.hash) {
      return delay(0, function() {
        return $.anchorjump(location.hash, {
          offset: -64,
          parent: '.anchor'
        });
      });
    }
  });

  /*
  # Countdown
  */


  $(function() {
    return $('[data-countdown_until]').each(function() {
      var $this, sUntil;
      $this = $(this);
      sUntil = $this.attr('data-countdown_until');
      if (sUntil) {
        return $this.countdown({
          until: new Date(sUntil),
          update: function(segment, text) {
            var $el, $strong;
            $el = $this.find("." + segment + ".box");
            $strong = $el.find('strong');
            return $el.queue(function(next) {
              var $new;
              $strong.removeClass('enter').addClass('exit');
              setTimeout((function() {
                return $strong.remove();
              }), 500);
              $new = $('<strong>').addClass('enter').insertBefore($strong).text(text);
              setTimeout((function() {
                return $new.removeClass('enter');
              }), 0);
              setTimeout(next, 600);
              return null;
            });
          }
        });
      }
    });
  });

  /*
  # Days text rotator
  */


  $(function() {
    var days, isDay, sample, strings, work;
    days = ['days'];
    strings = ['nights', 'mornings', 'dreams', 'midnights', 'sunsets', 'evenings'];
    isDay = true;
    sample = function(arr) {
      return arr[parseInt(Math.random() * arr.length)];
    };
    work = function() {
      var $new, $old, $parent, str;
      str = isDay ? sample(strings) : days;
      isDay = !isDay;
      $parent = $('.days-text');
      $old = $parent.find('span');
      $old.removeClass('enter').addClass('exit');
      setTimeout((function() {
        return $old.remove();
      }), 500);
      $new = $("<span>").text(str).addClass('enter').appendTo($parent);
      setTimeout((function() {
        return $new.removeClass('enter');
      }), 0);
      return setTimeout(work, 3000);
    };
    return work();
  });

  /*
  # Call for entries toggle
  */


}).call(this);
