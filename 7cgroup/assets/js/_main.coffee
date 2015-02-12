config = 
	canvas_activated : false

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


			class_names = document.body.className.replace(/-/g, '_').split(/\s+/)
			$.each(class_names, (i,classnm) ->
				UTIL.fire(classnm))
			# LOAD EVENTS WHEN PAGE FINISHED LOADING PICTURES N' STUFF
			$(window).load ->
				# center_vertically();
				prepare_menu()
				$(document).foundation()
				toggle_canvas_menu()
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

			$('.slider').slick
				nextArrow: "<i class='slick-next fa fa-angle-right' />"
				prevArrow: "<i class='slick-prev fa fa-angle-left' />"

	$(document).ready(UTIL.loadEvents)


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
			$('html').css 'overflow', 'hidden'
			$off_canvas_menu.css({'margin-top' : $(window).scrollTop() + 'px'})
			$off_canvas_section.addClass('closed');
			return
		).on 'close.fndtn.offcanvas', '[data-offcanvas]', ->
			config.canvas_activated = false
			$('html').css 'overflow', 'auto'
			$off_canvas_menu.css({'margin-top' : ''})
			$off_canvas_section.removeClass('closed')
			return
				
			

	window.prepare_full_size = ->
		width = $(window).width()
		height = $(window).height()
		for i in $('.full-size-background')
			$(i).height(height).width(width)

	window.prepare_menu = ->
		menu_width = $('#menu-primary-navigation').width()
		off_canvas_menu_width = $('#off_canvas').width()
		logo_width = $('#logo').width()
		$("<style>#off_canvas.closed { transform: translateX("+off_canvas_menu_width+"px); }</style>").appendTo( "head" )
		$("<style>#top-menu.closed { transform: translateX("+menu_width+"px); }</style>").appendTo( "head" )
		$("<style>#logo.closed { transform: translateX(-"+logo_width+"px); }</style>").appendTo( "head" )


	window.track_scroll = ->
		$menu = $('#top-menu')
		$off_canvas = $('#off_canvas');
		$logo = $('#logo');
		$el = $logo.add($menu);
		$(window).on 'scroll', (e) ->
			y = $(window).scrollTop()
			if y > 10 && !config.canvas_activated
				$el.addClass('closed');
				$off_canvas.removeClass('closed');
			else if y < 10 && !config.canvas_activated
				$el.removeClass('closed');
				$off_canvas.addClass('closed');
			
			



	window.detect_window_change = ->
		$(window).on 'resizeEnd orientationchange', ->
			console.log 'hej=?'
			prepare_full_size()

		window.onresize = ->
			if this.resizeTo
				clearTimeout(this.resizeTo)
			this.resizeTo = setTimeout ->
				$(this).trigger('resizeEnd')
			,500
			return true
		return true