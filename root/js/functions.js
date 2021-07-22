'use strict';

module.exports = {

	// Functions
	ripple: function() {

		$('.btn').on('click', function(item) {
			$('.btn').append('<span class="btn__ripple"></span>');
	
			let top = $(window).scrollTop() - $(this).offset().top + item.clientY;
			let left = $(window).scrollLeft() - $(this).offset().left + item.clientX;
	
			$(this).children('.btn__ripple').css({
				top: top,
				left: left
			});

			$(this).children('.btn__ripple').addClass('active');
		});
	},

	stickyHeader: function() {
		$(window).on('scroll', function() {

			if ($(window).scrollTop() > 0) {
				$('.header').addClass('active');
			} else {
				$('.header').removeClass('active');
			}
	
		});
	},

	toggleMenu: function() {
		$('.menu').on('click', function() {
			$('.nav').toggleClass('active');
			$('.menu__line').toggleClass('active');

			if ($('.nav').hasClass('active')) {
				$('body').css('overflow', 'hidden');
			} else {
				$('body').css('overflow', 'auto');
			}

		});

		$('.nav__link').on('click', function() {
			$('.nav').removeClass('active');
			$('.menu__line').removeClass('active');
			$('body').css('overflow', 'auto');
		});
	},

	changeMode: function() {
		$('.change-mode').on('click', function() {
			$('.change-mode__icon--night').toggleClass('active');
			$('.change-mode__icon--sun').toggleClass('active');
			$('html').toggleClass('dark-mode');
		});
	}

};
