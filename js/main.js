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

		// Components functions
		functions.rippleButton();
		functions.stickyHeader();
		functions.filterProjects();
		functions.heartClick();
		functions.testimonialsSlider();
		functions.loadMore();
		functions.loadForm();
		functions.toggleMenu();

	}
};

$(function() {
	
	app.init();

	AOS.init({
		duration: 300,
		easing: 'ease-in-out'
	});

});
