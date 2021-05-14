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
            if ($(window).scrollTop() >0) {
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
    }

};
