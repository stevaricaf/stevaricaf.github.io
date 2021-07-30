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
			$('.change-mode__icon--dark').toggleClass('active');
			$('.change-mode__icon--light').toggleClass('active');
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
	},

	sliderTheme: function() {
		new Swiper('.slider-theme-container', {
			autoplay: {
				delay: 5000,
			},
			speed: 1000,
			loop: true,
			pagination: {
				el: '.slider-theme-pagination',
				type: 'bullets',
				bulletElement: 'button',
				clickable: true
			},
			simulateTouch: false
		});
	},

	blogSlice: function() {

		if (window.matchMedia('screen and (min-width: 1025px)').matches) {
			$('.blog__item').slice(0, 8).css('display', 'flex');

			$('.blog__btn--show-more').on('click', function() {
				$('.blog__item:hidden').slice(0, 4).slideDown(300).css('display', 'flex');
	
				if ($('.blog__item').length > 8) {
					$('.blog__btn--show-less').show();
				}
				
				if ($('.blog__item:hidden').length == 0) {
					$('.blog__btn--show-more').hide();
				}
	
			});
			
			$('.blog__btn--show-less').on('click', function() {
				$('.blog__item').slice(8).slideUp(300);
				$('.blog__btn--show-less').hide();
				$('.blog__btn--show-more').show();
			});
		}
		
		if (window.matchMedia('screen and (max-width: 1024px)').matches) {
			$('.blog__item').slice(0, 4).css('display', 'flex');

			$('.blog__btn--show-more').on('click', function() {
				$('.blog__item:hidden').slice(0, 4).slideDown(300).css('display', 'flex');
	
				if ($('.blog__item').length > 4) {
					$('.blog__btn--show-less').show();
				}
				
				if ($('.blog__item:hidden').length == 0) {
					$('.blog__btn--show-more').hide();
				}
	
			});

			$('.blog__btn--show-less').on('click', function() {
				$('.blog__item').slice(4).slideUp(300);
				$('.blog__btn--show-less').hide();
				$('.blog__btn--show-more').show();
			});
		}

	},

	testimonialsSlider: function() {
		new Swiper('.testimonials__container', {
			speed: 1000,
			slidesPerView: 1,
			spaceBetween: 40,
			pagination: {
				el: '.testimonials__pagination',
				type: 'bullets',
				bulletElement: 'button',
				clickable: true
			},
			simulateTouch: false,
			breakpoints: {
				768: {
					slidesPerView: 2,
					spaceBetween: 0,
				},
				1025: {
					slidesPerView: 3,
					spaceBetween: 0,
					navigation: {
						nextEl: '.testimonials__btn-next',
						prevEl: '.testimonials__btn-prev'
					},
				}
			}
		});
	},

	labelAnimate: function() {
		$('.form__input, .form__textarea').bind('focus blur', function() {
			$(this).siblings('.form__label').toggleClass('active');

			if ($(this).val().length !== 0) {
				$(this).siblings('.form__label').addClass('active');
			}

		});
	},

	smoothScroll: function() {
        $('a[href^="#"]').on('click', function(e) {
			e.preventDefault();

			$('html, body').animate({
				scrollTop: $($.attr(this, 'href')).offset().top - 80
			}, 1500);
        });
    },

	loader: function() {
		$('.loader').hide();
	}

};
