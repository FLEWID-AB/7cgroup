var config;

config = {
  canvas_activated: false
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
      class_names = document.body.className.replace(/-/g, '_').split(/\s+/);
      $.each(class_names, function(i, classnm) {
        return UTIL.fire(classnm);
      });
      $(window).load(function() {
        prepare_menu();
        $(document).foundation();
        return toggle_canvas_menu();
      });
      UTIL.tools();
      return true;
    },
    tools: function() {
      var paragraph, str, _i, _len, _ref;
      _ref = $('p');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        paragraph = _ref[_i];
        str = $(paragraph).text().replace(/\s+/, '');
        if ($(paragraph).children().length === 0) {
          if (str.length < 1) {
            $(paragraph).remove();
          }
        }
      }
      return $('.slider').slick({
        nextArrow: "<i class='slick-next fa fa-angle-right' />",
        prevArrow: "<i class='slick-prev fa fa-angle-left' />"
      });
    }
  };
  $(document).ready(UTIL.loadEvents);
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
      $('html').css('overflow', 'hidden');
      $off_canvas_menu.css({
        'margin-top': $(window).scrollTop() + 'px'
      });
      $off_canvas_section.addClass('closed');
    }).on('close.fndtn.offcanvas', '[data-offcanvas]', function() {
      config.canvas_activated = false;
      $('html').css('overflow', 'auto');
      $off_canvas_menu.css({
        'margin-top': ''
      });
      $off_canvas_section.removeClass('closed');
    });
  };
  window.prepare_full_size = function() {
    var height, i, width, _i, _len, _ref, _results;
    width = $(window).width();
    height = $(window).height();
    _ref = $('.full-size-background');
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      _results.push($(i).height(height).width(width));
    }
    return _results;
  };
  window.prepare_menu = function() {
    var logo_width, menu_width, off_canvas_menu_width;
    menu_width = $('#menu-primary-navigation').width();
    off_canvas_menu_width = $('#off_canvas').width();
    logo_width = $('#logo').width();
    $("<style>#off_canvas.closed { transform: translateX(" + off_canvas_menu_width + "px); }</style>").appendTo("head");
    $("<style>#top-menu.closed { transform: translateX(" + menu_width + "px); }</style>").appendTo("head");
    return $("<style>#logo.closed { transform: translateX(-" + logo_width + "px); }</style>").appendTo("head");
  };
  window.track_scroll = function() {
    var $el, $logo, $menu, $off_canvas;
    $menu = $('#top-menu');
    $off_canvas = $('#off_canvas');
    $logo = $('#logo');
    $el = $logo.add($menu);
    return $(window).on('scroll', function(e) {
      var y;
      y = $(window).scrollTop();
      if (y > 10 && !config.canvas_activated) {
        $el.addClass('closed');
        return $off_canvas.removeClass('closed');
      } else if (y < 10 && !config.canvas_activated) {
        $el.removeClass('closed');
        return $off_canvas.addClass('closed');
      }
    });
  };
  return window.detect_window_change = function() {
    $(window).on('resizeEnd orientationchange', function() {
      console.log('hej=?');
      return prepare_full_size();
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
