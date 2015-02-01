(function (root, factory) {
	
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} 
	else if (typeof module !== "undefined" && module.exports) {
		module.exports = factory();
	} 
	else {
		root.Wheel = factory();
	}
}(this, function () {

	// Circular Control Layer

	var PI2 = Math.PI * 2

	function Wheel (options) {

		var $el = $(options.el)
		var half = $el.width()/2

		var offset = $el.offset()
		var min = options.min
		var max = options.max

		var currentValue = options.start
		var tick = options.callback
		var clicked = false

		var adjust = function () {

			half = $el.width()/2
			offset = $el.offset()		
		}

		var xy2val = function (x, y) {

			var a = Math.atan2(x - (offset.left + half), - (y - offset.top - half))

			if (a < 0) {
				a += PI2
			}

			return (a * (max - min) / PI2) + min
		}

		var updateVal = function (v) {

			if (v !== currentValue) {

				if (v > max) {
					v = min
				}
				else if (v < min) {
					v = max
				}

				currentValue = Math.round(v)

				tick(v, currentValue)
			}
		}

		this.updateVal = updateVal

		this.getVal = function () {

			return currentValue
		}

		this.rotation = function (v) {
			return (v - min) * (360 * Math.PI / 180) / (max - min);
		}
		
		var scroll = function (e) {

			e.preventDefault()

			var deltaX = e.originalEvent.detail || e.originalEvent.wheelDeltaX
			var deltaY = e.originalEvent.detail || e.originalEvent.wheelDeltaY
			
			deltaX > 0 || deltaY > 0 ? increment() : decrement()
		}

		var arrows = function (e) {

			var key = e.keyCode

			if (keys[key]) {

				e.preventDefault();
				keys[key]()
			}
		}

		var touch = function (e) {

			e.preventDefault()
			
			if (clicked) {
				updateVal(xy2val(e.originalEvent.touches[0].pageX, e.originalEvent.touches[0].pageY))
			}
		}

		var drag = function (e) {

			e.preventDefault()

			if (clicked) {
				updateVal(xy2val(e.pageX, e.pageY))			
			}
		}

		var enableDrag = function (e) {

			e.preventDefault()
			clicked = true
			drag(e)
		}

		var disableDrag = function (e) {

			e.preventDefault()
			clicked = false
		}

		var enableTouch = function (e) {

			// e.preventDefault()
			clicked = true
			touch(e)
		}

		var disableTouch = function (e) {

			// e.preventDefault()
			clicked = false
		}

		var increment = function () {

			updateVal(currentValue+1)
		}

		var decrement = function () {

			updateVal(currentValue-1)
		}

		var keys = {
			37: decrement,
			38: increment,
			39: increment,
			40: decrement
		}

		$(window).on('resize', adjust)

		if (options.drag) {
			$el.on('touchstart', enableTouch)
			$el.on('mousedown', enableDrag)

			$(document).on('mousemove', drag)
			$(document).on('touchmove', touch)

			$(document).on('mouseup', disableDrag)
			$(document).on('touchend', disableTouch)
		}

		if (options.scroll) {
			$(window).on('mousewheel DOMMouseScroll', scroll)
		}

		if (options.keyboard) {
			$(window).on('keydown', arrows)
		}
	}

	return Wheel;

}))