'use strict';

module.exports = {

	// Functions
    rippleButton: function() {
        $('.btn').on('click', function(item) {
            $(this).append('<span class="btn__ripple"></span>');

            let top = $(window).scrollTop() - $(this).offset().top + item.clientY;
            let left = $(window).scrollTop() - $(this).offset().left + item.clientX;

            $(this).children('span').css({
                top: top,
                left: left
            });
        });
    },

    stickyHeader: function() {
        $(window).on('scroll', function() {
            if($(window).scrollTop() >0) {
                $('.header').addClass('header--sticky');
            } else {
                $('.header').removeClass('header--sticky');
            }
        });
    }

};
