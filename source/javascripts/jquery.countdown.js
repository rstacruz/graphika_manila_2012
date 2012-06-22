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
