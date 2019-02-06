var config;

config = {
  canvas_activated: false,
  next_stop: false,
  menu_offset: 0
};

$(function() {
  var Roots, UTIL;
  $(document).ready(function() {});
  Roots = {
    common: {
      init: function() {}
    },
    home: {
      init: function() {}
    },
    about_us: {
      init: function() {}
    }
  };
  UTIL = {
    fire: function(func, funcname, args) {
      var namespace;
      namespace = Roots;
      if (!funcname) {
        funcname = 'init';
      }
      if (func !== '' && namespace[func] && typeof namespace[func][funcname] === 'function') {
        return namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      var class_names;
      UTIL.fire('common');
      prepare_full_size();
      detect_window_change();
      track_scroll();
      set_menu_offset();
      activate_menu();
      contacts();
      class_names = document.body.className.replace(/-/g, '_').split(/\s+/);
      $.each(class_names, function(i, classnm) {
        return UTIL.fire(classnm);
      });
      $(window).load(function() {
        off_scroll_to();
        prepare_menu();
        $(document).foundation('topbar', {
          scrolltop: false
        });
        toggle_canvas_menu();
        center_vertically();
        return check_if_hash_exists();
      });
      UTIL.tools();
      return true;
    },
    tools: function() {
      var j, len, paragraph, ref, str;
      ref = $('p');
      for (j = 0, len = ref.length; j < len; j++) {
        paragraph = ref[j];
        str = $(paragraph).text().replace(/\s+/, '');
        if ($(paragraph).children().length === 0) {
          if (str.length < 1) {
            $(paragraph).remove();
          }
        }
      }
      replace_svg();
      return $('.slider').slick({
        nextArrow: "<i class='slick-next fa fa-angle-right' />",
        prevArrow: "<i class='slick-prev fa fa-angle-left' />",
        autoplay: true,
        autoplaySpeed: 5000
      });
    }
  };
  $(document).ready(UTIL.loadEvents);
  window.contacts = function() {
    return $('#contacts').children('li').on('click', function() {
      return $(this).toggleClass('active');
    });
  };
  window.activate_menu = function() {
    $('#menu-primary-navigation').localScroll({
      offset: config.menu_offset * -1
    });
    return $('.toggle-topbar').on('click', function(e) {
      return e.preventDefault();
    });
  };
  window.off_scroll_to = function() {
    return $('#off-canvas-menu-container').find('a').on('click', function(e) {
      var pos;
      if (!$(this).hasClass('ext')) {
        e.preventDefault();
        config.next_stop = $(this).attr('href');
        $('.off-canvas-wrap').foundation('offcanvas', 'hide', 'move-left');
        pos = $(config.next_stop).offset().top;
        return setTimeout(function() {
          return $(window).scrollTo(pos, 500, {
            offset: config.menu_offset * -1
          });
        }, 500);
      }
    });
  };
  window.toggle_canvas_menu = function() {
    var $button, $off_canvas_menu, $off_canvas_section;
    $off_canvas_menu = $('#off-canvas-menu-container');
    $off_canvas_section = $('#off_canvas');
    $button = $('#toggle-canvas-menu');
    $button.off('click');
    $button.on('click', function(e) {
      e.preventDefault();
      return $('.off-canvas-wrap').foundation('offcanvas', 'toggle', 'move-left');
    });
    return $(document).on('open.fndtn.offcanvas', '[data-offcanvas]', function() {
      config.canvas_activated = true;
      $off_canvas_section.addClass('closed');
    }).on('close.fndtn.offcanvas', '[data-offcanvas]', function() {
      config.canvas_activated = false;
      $off_canvas_section.removeClass('closed');
    });
  };
  window.prepare_full_size = function() {
    var height, i, j, len, ref, results, width;
    width = $(window).width();
    height = $(window).height();
    ref = $('.full-size-background');
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      i = ref[j];
      results.push($(i).height(height).width(width));
    }
    return results;
  };
  window.prepare_menu = function() {
    var logo_width, menu_width, off_canvas_menu_width;
    $('#off-canvas-menu-container').find('.menu-item').last().addClass('last');
    menu_width = $('#menu-primary-navigation').width();
    off_canvas_menu_width = $('#off_canvas').width();
    logo_width = $('#logo').width();
    $("<style>#top-menu.closed { transform: translateX(" + menu_width + "px); }</style>").appendTo("head");
    return $("<style>#logo.closed { transform: translateX(-" + logo_width + "px); }</style>").appendTo("head");
  };
  window.track_scroll = function() {
    var $el, $logo, $menu, $off_canvas;
    $menu = $('#top-menu');
    $off_canvas = $('#off_canvas');
    $logo = $('#logo');
    $el = $logo.add($menu);
    $(window).off('scroll');
    if ($(window).width() > convertRem(40)) {
      decide_what_to_show($el, $off_canvas);
      return $(window).on('scroll', function(e) {
        return decide_what_to_show($el, $off_canvas);
      });
    } else {
      $el.removeClass('closed');
      return $off_canvas.addClass('closed');
    }
  };
  window.decide_what_to_show = function(el, off_canvas) {
    var y;
    y = $(window).scrollTop();
    if (y > 10 && !config.canvas_activated) {
      el.addClass('closed');
      return off_canvas.removeClass('closed');
    } else if (y < 10 && !config.canvas_activated) {
      el.removeClass('closed');
      return off_canvas.addClass('closed');
    }
  };
  window.center_vertically = function() {
    $('.center-vertically').each(function() {
      var margin_top;
      margin_top = ($(this).closest('.god').height() - $(this).height()) / 2;
      $(this).css({
        'margin-top': margin_top + 'px',
        'visibility': 'visible'
      });
      return true;
    });
    return true;
  };
  return window.detect_window_change = function() {
    $(window).on('resizeEnd orientationchange', function() {
      set_menu_offset();
      prepare_full_size();
      return track_scroll();
    });
    window.onresize = function() {
      if (this.resizeTo) {
        clearTimeout(this.resizeTo);
      }
      this.resizeTo = setTimeout(function() {
        return $(this).trigger('resizeEnd');
      }, 500);
      return true;
    };
    return true;
  };
});

window.getRootElementFontSize = function() {
  return parseFloat(getComputedStyle(document.documentElement).fontSize);
};

window.convertRem = function(value) {
  return value * getRootElementFontSize();
};

window.replace_svg = function() {
  if (!Modernizr.svg) {
    return $('img[src*="svg"]').attr('src', function() {
      return $(this).attr('src').replace('.svg', '.png');
    });
  }
};

window.check_if_hash_exists = function(offs_) {
  var $targ, loc;
  loc = window.location.hash.replace('#', '');
  if (loc) {
    $targ = $("*[data-target='" + loc + "']").first();
    if ($targ.length !== 0) {
      return $(window).scrollTo($targ.offset().top - config.menu_offset, 500);
    }
  }
};

window.set_menu_offset = function() {
  var hr_height;
  if ($('.section-divider').length !== 0) {
    hr_height = $('.section-divider').first().outerHeight(true);
    if ($(window).width() > convertRem(40)) {
      return config.menu_offset = hr_height - 1;
    } else {
      return config.menu_offset = hr_height + ($('.top-bar').first().outerHeight(true));
    }
  }
};
