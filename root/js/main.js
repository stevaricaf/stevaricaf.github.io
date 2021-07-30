'use strict';

let functions = require('./functions');

let app = {
	init: function() {

		// Checking if device is touchable, to prevent double tap and hover effects
		if(('ontouchstart' in window || navigator.msMaxTouchPoints > 0) && window.matchMedia('screen and (max-width: 1024px)').matches) {
			$('html').addClass('touch');
		} else {
			$('html').addClass('no-touch');
		}

		AOS.init({
			offset: 0,
			duration: 500,
			easing: 'ease-in-out'
		});

		// Call your functions here
		functions.ripple();
		functions.stickyHeader();
		functions.toggleMenu();
		functions.changeMode();
		functions.filter();
		functions.like();
		functions.sliderTheme();
		functions.blogSlice();
		functions.testimonialsSlider();
		functions.labelAnimate();
		functions.smoothScroll();

	},
	winLoad: function() {

		// Call your functions here
		// functions.loader();
		
	}
};

$(function() {

	app.init();

	$(window).on('load', function() {
		app.winLoad();
		$('.loader').hide();
	});

});
