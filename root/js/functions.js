'use strict';

module.exports = {

	// Functions
	ripple: function() {
		$('.btn').on('click', function(item) {

			let top = $(window).scrollTop() - $(this).offset().top + item.clientY;
			let left = $(window).scrollLeft() - $(this).offset().left + item.clientX;

			let ripple = $('<span></span>');

			ripple.css({
				top: top,
				left: left
			}).addClass('btn__ripple');

			$(this).append(ripple);
			$(this).children(ripple).addClass('active');

			setTimeout(function() {
				ripple.remove();
			}, 300);

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
			$('body').toggleClass('dark-mode');
		});
	},

	filter: function() {
		$('.filter__btn').on('click', function() {

			const value = $(this).attr('data-filter');

			if (value == 'all') {
				$('.filter-cards__item').show('300');
			} else {
				$('.filter-cards__item').not('.' + value).hide(300);
				$('.filter-cards__item[data-filter=' + value + ']').filter('[data-filter=' + value + ']').show(300);
			}

		});

		$('.filter__btn').on('click', function() {
			$(this).addClass('active').siblings().removeClass('active');
		});
	},

	like: function() {
		$('.filter-cards-meta__btn').on('click', function() {
			$(this).children('.filter-cards-meta__icon--empty').toggleClass('active');
			$(this).children('.filter-cards-meta__icon--filled').toggleClass('active');
		});
	}

};
