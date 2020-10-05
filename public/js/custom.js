/***************************************************************************************************************
 ||||||||||||||||||||||||||||        CUSTOM SCRIPT FOR INTERRIO            ||||||||||||||||||||||||||||||||||||||
 ****************************************************************************************************************
 ||||||||||||||||||||||||||||              TABLE OF CONTENT                  ||||||||||||||||||||||||||||||||||||
 ****************************************************************************************************************
 ****************************************************************************************************************
 01. Revolution slider
 02. Sticky header
 03. Fact counter
 04. accrodion
 05. BrandCarousel
 06. SelectDropdown
 07. ScrollToTop
 08. Vertical slider
 09. Contact info Carousel
 10. Project Layout
 11. Cart Touch Spin
 12. PriceFilter
 13. Cart touch spin
 14. Single product carousel
 15. Related project carousel
 16. Fancybox activator
 17. ContactFormValidation
 18. Scoll to target
 19. PrettyPhoto
 20. FeedBackcarousel

 ****************************************************************************************************************
 ||||||||||||||||||||||||||||            End TABLE OF CONTENT                ||||||||||||||||||||||||||||||||||||
 ****************************************************************************************************************/


"use strict";


//  Main menu
function mainmenu() {
    //Submenu Dropdown Toggle
    if($('.main-menu li.dropdown ul').length){
        $('.main-menu li.dropdown').append('<div class="dropdown-btn"></div>');

        //Dropdown Button
        $('.main-menu li.dropdown .dropdown-btn').on('click', function() {
            $(this).prev('ul').slideToggle(500);
        });
    }

}


// Search Toggle Btn
function search () {
    if($('.toggle-search').length){
        $('.toggle-search').on('click', function() {
            $('.header-search').slideToggle(300);
        });

    }
}


//  Header Sticky
function stickyHeader() {
    if ($('.stricky').length) {
        var strickyScrollPos = 100;
        if ($(window).scrollTop() > strickyScrollPos) {
            $('.stricky').addClass('stricky-fixed');
            $('.scroll-to-top').fadeIn(500);
        } else if ($(this).scrollTop() <= strickyScrollPos) {
            $('.stricky').removeClass('stricky-fixed');
            $('.scroll-to-top').fadeOut(500);
        }
    };
}



//  scoll to Top
function scrollToTop() {
    if ($('.scroll-to-target').length) {
        $(".scroll-to-target").on('click', function() {
            var target = $(this).attr('data-target');
            // animate
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1000);

        });
    }
}


// Language switcher
function languageSwitcher() {
    if ($("#polyglot-language-options").length) {
        $('#polyglotLanguageSwitcher').polyglotLanguageSwitcher({
            effect: 'fade',
            testMode: true,
            onChange: function(evt) {
                alert("The selected language is: " + evt.selectedItem);
            }
            //                ,afterLoad: function(evt){
            //                    alert("The selected language has been loaded");
            //                },
            //                beforeOpen: function(evt){
            //                    alert("before open");
            //                },
            //                afterOpen: function(evt){
            //                    alert("after open");
            //                },
            //                beforeClose: function(evt){
            //                    alert("before close");
            //                },
            //                afterClose: function(evt){
            //                    alert("after close");
            //                }
        });
    };
}



// RevolutionSliderActiver
function revolutionSliderActiver () {
    if ($('.rev_slider_wrapper #slider1').length) {
        $("#slider1").revolution({
            sliderType:"standard",
            sliderLayout:"auto",
            delay:5000,

            navigationType:"bullet",
            navigationArrows:"0",
            navigationStyle:"preview3",

            dottedOverlay:'yes',

            hideTimerBar:"off",
            onHoverStop:"off",
            navigation: {
                arrows:{enable:true}
            },
            gridwidth:1170,
            gridheight:800
        });
    };
}



// Project
function projectMasonaryLayout() {
    if ($('.masonary-layout').length) {
        $('.masonary-layout').isotope({
            layoutMode: 'masonry'
        });
    }

    if ($('.post-filter').length) {
        $('.post-filter li').children('span').on('click', function() {
            var Self = $(this);
            var selector = Self.parent().attr('data-filter');
            $('.post-filter li').children('span').parent().removeClass('active');
            Self.parent().addClass('active');


            $('.filter-layout').isotope({
                filter: selector,
                animationOptions: {
                    duration: 500,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });
    }

    if ($('.post-filter.has-dynamic-filter-counter').length) {
        // var allItem = $('.single-filter-item').length;

        var activeFilterItem = $('.post-filter.has-dynamic-filter-counter').find('li');

        activeFilterItem.each(function() {
            var filterElement = $(this).data('filter');
            console.log(filterElement);
            var count = $('.gallery-content').find(filterElement).length;

            $(this).children('span').append('<span class="count"><b>' + count + '</b></span>');
        });
    };
}


//Jquery Prettyphoto Lightbox
function prettyPhoto() {
    $("a[data-rel^='prettyPhoto']").prettyPhoto({
        animation_speed:'normal',
        slideshow:3000,
        autoplay_slideshow: false,
        fullscreen: true,
        social_tools: false
    });
}


// Brand Carousel
function brandCarousel () {
    if ($('.brand').length) {
        $('.brand').owlCarousel({
            dots: false,
            loop:true,
            margin:30,
            nav:true,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
            autoplayHoverPause: false,
            autoplay: 6000,
            smartSpeed: 1000,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                800:{
                    items:3
                },
                1024:{
                    items:4
                },
                1100:{
                    items:4
                },
                1200:{
                    items:5
                }
            }
        });
    }
}


// Testimonial Slider
function testimonialSlider() {
    if ($('.testimonials-carousel').length) {
        $('.testimonials-carousel').owlCarousel({
            loop:true,
            margin:30,
            nav:true,
            dots: true,
            autoplayHoverPause:false,
            autoplay: 6000,
            smartSpeed: 700,
            navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                800:{
                    items:1
                },
                1024:{
                    items:1
                },
                1100:{
                    items:1
                },
                1200:{
                    items:1
                }
            }
        })
    }
}


// Team Member
function teammember () {
    if ($('.team-members').length) {
        $('.team-members').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            dots: false,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            responsive: {
                0:{
                    items:1
                },
                480:{
                    items:1
                },
                600:{
                    items:2
                },
                1000:{
                    items:3
                },
                1200:{
                    items:3
                }
            }
        });
    }
}


// Fact Counter carousel
function factCountercarousel () {
    if ($('.fact-counter-carousel').length) {
        $('.fact-counter-carousel').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            dots: false,
            navText: [
                '<i class="fa fa-angle-left"></i>',
                '<i class="fa fa-angle-right"></i>'
            ],
            autoplay: true,
            autoplayTimeout: 5000,
            autoplayHoverPause: true,
            responsive: {
                0:{
                    items:1
                },
                480:{
                    items:1
                },
                600:{
                    items:1
                },
                1000:{
                    items:1
                },
                1200:{
                    items:1
                }
            }
        });
    }
}


//  Fact counter
function CounterNumberChanger () {
    var timer = $('.timer');
    if(timer.length) {
        timer.appear(function () {
            timer.countTo();
        })
    }

}




//Accordion Box
function accordion() {
    if($('.accordion-box').length){
        $(".accordion-box").on('click', '.accord-btn', function() {

            if($(this).hasClass('active')!==true){
                $('.accordion .accord-btn').removeClass('active');

            }

            if ($(this).next('.accord-content').is(':visible')){
                $(this).removeClass('active');
                $(this).next('.accord-content').slideUp(500);
            }else{
                $(this).addClass('active');
                $('.accordion .accord-content').slideUp(500);
                $(this).next('.accord-content').slideDown(500);
            }
        });
    }
}


// Cart Touch Spin
function cartTouchSpin() {
    if ($('.quantity-spinner').length) {
        $("input.quantity-spinner").TouchSpin({
            verticalbuttons: true
        });
    }
}


// Select menu
function selectDropdown () {
    if($(".selectmenu").length) {
        $( ".selectmenu" ).selectmenu();
    };
}


//  Price Filter
function priceFilter () {
    if($('.range-slider-price').length){

        var priceRange = document.getElementById('range-slider-price');

        noUiSlider.create(priceRange, {
            start: [ 60, 100 ],
            limit: 200,
            behaviour: 'drag',
            connect: true,
            range: {
                'min': 30,
                'max': 200
            }
        });

        var limitFieldMin = document.getElementById('min-value-rangeslider');
        var limitFieldMax = document.getElementById('max-value-rangeslider');

        priceRange.noUiSlider.on('update', function( values, handle ){
            (handle ? limitFieldMax : limitFieldMin).value = values[handle];
        });
    };
}



// Single product carousel
function singleProduct () {

    $('.flexslider').flexslider({
        animation: "slide",
        controlNav: "thumbnails"
    });


}

// Date picker
function datepicker () {
    if ($('#datepicker').length) {
        //      $('#datepicker').datepicker();
    };
}


// Time picker
function timepicker () {
    //  $('input[name="time"]').ptTimeSelect();
}









// 7. contact form validation
function contactFormValidation () {

    if($('#contact-form').length){
        $('#contact-form').validate({
            rules: {
                name: {
                    required: true
                },
                mail: {
                    required: true
                },
                phnumber: {
                    required: true,
                    email: true
                },
                message: {
                    required: true
                }
            }
        });
    }
}


// videoFancybox
function videoFancybox () {
    if ($('.video-fancybox').length) {
        $('.video-fancybox').on('click', function () {
            $(this).fancybox({
                'padding'	: 0,
                'autoScale'	: false,
                'transitionIn'	: 'none',
                'transitionOut'	: 'none',
                'title'	: this.title,
                'width'	: 640,
                'height'	: 385,
                'href'	: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
                'type'	: 'swf',
                'swf'	: { 'wmode'	: 'transparent', 'allowfullscreen'	: 'true' }
            });
            return false;
        })
    };
}


// Feedback Carousel
function feedBackcarousel() {
    if ($('.feedback-carousel').length) {
        $('.feedback-carousel').owlCarousel({
            loop:true,
            margin:30,
            nav:true,
            dots: true,
            autoplayHoverPause:false,
            autoplay: 6000,
            smartSpeed: 700,
            navText: [ '<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>' ],
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:1
                },
                800:{
                    items:1
                },
                1024:{
                    items:2
                },
                1100:{
                    items:2
                },
                1200:{
                    items:2
                }
            }
        })
    }
}



// Dom Ready Function
jQuery(document).on('ready', function () {
    (function ($) {
        // add your functions
        revolutionSliderActiver ();
        mainmenu ();
        search ();
        languageSwitcher ();
        brandCarousel ();
        testimonialSlider ();
        scrollToTop ();
        prettyPhoto ();
        teammember ();
        factCountercarousel ();
        CounterNumberChanger ();
        accordion ();
        videoFancybox ();
        cartTouchSpin ();
        selectDropdown ();
        priceFilter ();
        datepicker ();
        timepicker ();
        videoFancybox ();
        feedBackcarousel ();
        contactFormValidation ()

    })(jQuery);
});



jQuery(window).on('scroll', function(){
    (function ($) {

        stickyHeader();

    })(jQuery);
});



// instance of fuction while Window Load event
jQuery(window).on('load', function() {
    (function($) {
        projectMasonaryLayout();
        singleProduct()

    })(jQuery);
});