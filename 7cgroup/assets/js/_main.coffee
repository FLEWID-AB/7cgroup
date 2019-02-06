config =
	canvas_activated : false
	next_stop : false
	menu_offset : 0
$ ->

	$(document).ready ->


	Roots =
		common:

			init: ->

		home:
			init: ->

		about_us:
			init: ->

	UTIL =
		fire: (func, funcname, args) ->
			namespace = Roots;
			if !funcname then funcname = 'init'
			if func != '' && namespace[func] && typeof namespace[func][funcname] == 'function'
				namespace[func][funcname](args);
		loadEvents: ->
			UTIL.fire('common')
			# FIRE OFF READY EVENTS
			prepare_full_size()
			detect_window_change()
			track_scroll()
			set_menu_offset()
			activate_menu()
			contacts()
			class_names = document.body.className.replace(/-/g, '_').split(/\s+/)
			$.each(class_names, (i,classnm) ->
				UTIL.fire(classnm))

			# LOAD EVENTS WHEN PAGE FINISHED LOADING PICTURES N' STUFF
			$(window).load ->
				# center_vertically();
				off_scroll_to()
				prepare_menu()
				$(document).foundation('topbar', {scrolltop: false})
				toggle_canvas_menu()
				center_vertically()
				check_if_hash_exists()
			# ACTIVATE MAIN TOOLS
			UTIL.tools()

			return true

		tools: ->
			# REMOVE EMPTY P TAGS!
			for paragraph in $('p')
				str = $(paragraph).text().replace(/\s+/,'')
				if $(paragraph).children().length == 0
					if str.length < 1
						$(paragraph).remove();
			replace_svg()

			$('.slider').slick
				nextArrow: "<i class='slick-next fa fa-angle-right' />"
				prevArrow: "<i class='slick-prev fa fa-angle-left' />"
				autoplay: true,
				autoplaySpeed: 5000,

	$(document).ready(UTIL.loadEvents)



	window.contacts = ->
		$('#contacts').children('li').on 'click', ->
			$(this).toggleClass('active');

	window.activate_menu = ->
		$('#menu-primary-navigation').localScroll
			offset: config.menu_offset * -1
		$('.toggle-topbar').on 'click', (e) ->
			e.preventDefault();

	window.off_scroll_to = ->
		# console.log $('#off-canvas-menu-container').find('a');
		$('#off-canvas-menu-container').find('a').on 'click', (e) ->
			if !$(this).hasClass('ext')
				e.preventDefault()
				config.next_stop = $(this).attr('href')
				$('.off-canvas-wrap').foundation('offcanvas', 'hide', 'move-left');
				pos = $(config.next_stop).offset().top
				setTimeout ->
					$(window).scrollTo(pos, 500, {offset: config.menu_offset * -1})
				,500

	window.toggle_canvas_menu = ->
		$off_canvas_menu = $('#off-canvas-menu-container')
		$off_canvas_section = $('#off_canvas')
		$button = $('#toggle-canvas-menu')
		$button.off 'click'
		$button.on 'click', (e) ->

			e.preventDefault()
			$('.off-canvas-wrap').foundation('offcanvas', 'toggle', 'move-left');

		$(document).on('open.fndtn.offcanvas', '[data-offcanvas]', ->
			config.canvas_activated = true
			# $('html').css 'overflow', 'hidden'
			# $off_canvas_menu.css({'margin-top' : $(window).scrollTop() + 'px'})
			$off_canvas_section.addClass('closed');
			return
		).on 'close.fndtn.offcanvas', '[data-offcanvas]', ->
			config.canvas_activated = false
			# $('html').css 'overflow', 'auto'
			# $off_canvas_menu.css({'margin-top' : ''})
			$off_canvas_section.removeClass('closed')
			return



	window.prepare_full_size = ->
		width = $(window).width()
		height = $(window).height()
		for i in $('.full-size-background')
			$(i).height(height).width(width)

	window.prepare_menu = ->
		$('#off-canvas-menu-container').find('.menu-item').last().addClass('last')
		menu_width = $('#menu-primary-navigation').width()
		off_canvas_menu_width = $('#off_canvas').width()
		logo_width = $('#logo').width()
		# $("<style>#off_canvas.closed { transform: translateX("+off_canvas_menu_width+"px); }</style>").appendTo( "head" )
		$("<style>#top-menu.closed { transform: translateX("+menu_width+"px); }</style>").appendTo( "head" )
		$("<style>#logo.closed { transform: translateX(-"+logo_width+"px); }</style>").appendTo( "head" )


	window.track_scroll = ->
		$menu = $('#top-menu')
		$off_canvas = $('#off_canvas');
		$logo = $('#logo');
		$el = $logo.add($menu);
		$(window).off 'scroll'
		if $(window).width() > convertRem(40)
			decide_what_to_show($el, $off_canvas)
			$(window).on 'scroll', (e) ->
				decide_what_to_show($el, $off_canvas)
		else
			$el.removeClass('closed');
			$off_canvas.addClass('closed');

	window.decide_what_to_show = (el, off_canvas) ->
		y = $(window).scrollTop()
		if y > 10 && !config.canvas_activated
			el.addClass('closed');
			off_canvas.removeClass('closed');
		else if y < 10 && !config.canvas_activated
			el.removeClass('closed');
			off_canvas.addClass('closed');


	window.center_vertically = ->
		$('.center-vertically').each ->
			# console.log $(this).closest('.god').height();
			margin_top = ($(this).closest('.god').height() - $(this).height()) / 2
			$(this).css
				'margin-top' : margin_top + 'px'
				'visibility' : 'visible'
			return true
		return true


	window.detect_window_change = ->
		$(window).on 'resizeEnd orientationchange', ->
			set_menu_offset()
			prepare_full_size()
			track_scroll()


		window.onresize = ->
			if this.resizeTo
				clearTimeout(this.resizeTo)
			this.resizeTo = setTimeout ->
				$(this).trigger('resizeEnd')
			,500
			return true
		return true


window.getRootElementFontSize = ->
	parseFloat(
		getComputedStyle(
			document.documentElement
		).fontSize
	)

window.convertRem = (value) ->
	value * getRootElementFontSize();

window.replace_svg = ->
	if !Modernizr.svg
		$('img[src*="svg"]').attr 'src', ->
			$(this).attr('src').replace '.svg', '.png'

window.check_if_hash_exists = (offs_) ->
	loc = (window.location.hash).replace('#', '')
	if loc
		$targ = $("*[data-target='" + loc + "']").first()
		if $targ.length != 0
			$(window).scrollTo(($targ.offset().top - config.menu_offset), 500);

window.set_menu_offset = ->
	if $('.section-divider').length != 0
		hr_height = $('.section-divider').first().outerHeight(true);
		if $(window).width() > convertRem(40)
			config.menu_offset = (hr_height-1)
		else
			config.menu_offset = hr_height + ($('.top-bar').first().outerHeight(true))