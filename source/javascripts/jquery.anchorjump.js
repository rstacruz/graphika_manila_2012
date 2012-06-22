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

    var $area = $(href);
    // Find the parent
    if (options.parent) {
      var $parent = $area.closest(options.parent);
      if ($parent.length) { $area = $parent; }
    }

    if (!$area.length) { return; }

    $('body').animate({ scrollTop: $area.offset().top + options.offset }, options.speed);
    $('body').trigger('anchor', href);

    // Add the location hash via pushState.
    if (window.history.pushState) {
      window.history.pushState({ href: href }, "", href);
    }
  };
})(jQuery);
