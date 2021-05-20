'use strict';

module.exports = {

	// Functions
    rippleButton: function() {
        $('.btn').on('click', function(item) {
            $(this).append('<span class="btn__ripple"></span>');

            let top = $(window).scrollTop() - $(this).offset().top + item.clientY;
            let left = $(window).scrollLeft() - $(this).offset().left + item.clientX;

            $(this).children('span').css({
                top: top,
                left: left
            });
        });
    },

    stickyHeader: function() {
        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 0) {
                $('.header').addClass('header--sticky');
            } else {
                $('.header').removeClass('header--sticky');
            }
        });
    },

    filterProjects: function() {
        $('.projects__filters-filter').on('click', function() {

            const value = $(this).attr('data-filter');

            if (value == 'all' && $('.projects__images-image').hasClass('filtered')) {
                $('.projects__images-image').removeClass('filtered').show(300);
            } else {
                $('.projects__images-image').not('[data-filter=' + value + ']').hide(300);
                $('.projects__images-image').filter('[data-filter=' + value + ']').addClass('filtered').show(300);
            }
        });

        $('.projects__filters-filter').on('click', function() {
            $(this).addClass('active').siblings().removeClass('active');
        });
    },

    heartClick: function() {
        $('.font-icon-heart').on('click', function() {
            $(this).toggleClass('active');
        });
    },

    testimonialsSlider: function() {
        new Swiper('.swiper-container', {
            loop: false,
            speed: 500,
            pagination: {
                el: '.testimonials__slider-pagination',
                type: 'bullets',
                clickable: true
            },
            navigation: {
                nextEl: '.testimonials__slider-next',
                prevEl: '.testimonials__slider-prev',
            },
            simulateTouch: false
        });
    },

    loadMore: function() {
        $('.blog__cards-card').slice(0, 4).show();

        $('.blog__btn-more').on('click', function() {
            $('.blog__cards-card:hidden').slice(0, 4).slideDown(300);

            if ($('.blog__cards-card:visible').length > 4 && $('.blog__cards-card:hidden').length !== 0) {
                $('.blog__btn-less').addClass('active');
            } else if ($('.blog__cards-card:hidden').length == 0) {
                $('.blog__btn-more').hide(300);
            }
        });

        $('.blog__btn-less').on('click', function() {
            $('.blog__cards-card:visible').slice(-4).slideUp(300);
            $('.blog__btn-more').show(300);
            
            if ($('.blog__cards-card:visible').length == 8) {
                $('.blog__btn-less').removeClass('active');
            }
        });
    },

    loadForm: function() {
        $('.helper__icon').on('click', function() {
            $('.sender').show(300)
        });

        $('.sender__rectangle').on('click', function() {
            $('.sender').hide(300);
        });
    },

    toggleMenu: function() {
        $('.menu').on('click', function() {
            $('.nav').toggleClass('active');
            $('.menu__line').toggleClass('active');
            $('body').toggleClass('body--overflow');
        });

        $('.nav a').on('click', function() {
            $('.nav').removeClass('active');
            $('.header__wrapper').removeClass('active');
            $('.menu__line').removeClass('active');
            $('body').removeClass('body--overflow');
        });
    }

};
