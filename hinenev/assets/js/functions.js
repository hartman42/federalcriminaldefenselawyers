( function( $ ) {
  "use strict";



  // ------------------------------------

  // HELPER FUNCTIONS TO TEST FOR SPECIFIC DISPLAY SIZE (RESPONSIVE HELPERS)

  // ------------------------------------

  function is_display_type(display_type){
    return ( ($('.display-type').css('content') == display_type) || ($('.display-type').css('content') == '"'+display_type+'"'));
  }
  function not_display_type(display_type){
    return ( ($('.display-type').css('content') != display_type) && ($('.display-type').css('content') != '"'+display_type+'"'));
  }







  // DOCUMENT READY
  $( function() {



    if($('.peeking-form-w').length){
      
      $('.pf-trigger, .pf-close-trigger').click(function(){
        $('.peeking-form-w').toggleClass('active');
        return false;
      });
    }


    if($('body.os-loading').length){
      var custom_timeout = $('body').data('custom-timeout');
      custom_timeout = (custom_timeout) ? custom_timeout : 0;
      if($('.os-slider-w').length) {
        setTimeout(function(){
          $('.os-slider-w').waitForImages(function() {
            // All descendant images have loaded, now slide up.
            $('body').removeClass('os-loading');
            $('body').addClass('os-loaded');
          });
        }, custom_timeout);
      }else{
        setTimeout(function(){
          $('.all-wrapper').waitForImages(function() {
            // All descendant images have loaded, now slide up.
            $('body').removeClass('os-loading');
            $('body').addClass('os-loaded');
          });
        }, custom_timeout);
      }
    }

    $('.control-slide').click(function(){
      $(this).closest('.slider-controls').find('.control-slide.active').removeClass('active');
      $(this).addClass('active');
      $(this).closest('.os-slider-w').find('.os-slide-w').removeClass('active');
      var slide_id = $(this).data('slide-id');
      $(this).closest('.os-slider-w').find('.os-slide-w[data-slide-id="' + slide_id + '"]').addClass('active');
      return false;
    });

    if($('.os-slider-w').length){
      var slide_delay = parseInt($('.os-slider-w').data('autoslide'));
      if(slide_delay > 0){
        setInterval(function(){
          $('.os-slider-w .slide-navi-next, .os-slider-w .slide-navi-next-v2').click();
        }, slide_delay);
      }
    }

    $('.slide-navi-next, .slide-navi-next-v2').click(function(){
      var $active_slide = $('.os-slide-w.active');
      var $next_slide = $active_slide.next('.os-slide-w');
      if(!$next_slide.length){
        $next_slide = $('.os-slide-w:first');
      }
      var next_slide_id = $next_slide.data('slide-id');
      $(this).closest('.os-slider-w').find('.control-slide').removeClass('active');
      $(this).closest('.os-slider-w').find('.control-slide[data-slide-id="' + next_slide_id + '"]').addClass('active');
      $('.os-slide-w').removeClass('active');
      $next_slide.addClass('active');
      return false;
    });
    $('.slide-navi-prev, .slide-navi-prev-v2').click(function(){
      var $active_slide = $('.os-slide-w.active');
      var $next_slide = $active_slide.prev('.os-slide-w');
      if(!$next_slide.length){
        $next_slide = $('.os-slide-w:last');
      }
      var next_slide_id = $next_slide.data('slide-id');
      $(this).closest('.os-slider-w').find('.control-slide').removeClass('active');
      $(this).closest('.os-slider-w').find('.control-slide[data-slide-id="' + next_slide_id + '"]').addClass('active');
      $('.os-slide-w').removeClass('active');
      $next_slide.addClass('active');
      return false;
    });

    var $testimonials = $(".testimonials-slider");
    if ($testimonials.length && $testimonials.find('.testimonial').length > 1) {
      $testimonials.owlCarousel({
        items: 1,
        loop: true,
        nav: true,
        dots: false,
        navText : ['<i class="os-icon os-icon-chevron-thin-left"></i>', '<i class="os-icon os-icon-chevron-thin-right"></i>']
      });
    }


    var $recent_posts = $(".recent-posts-slider");
    if ($recent_posts.length) {
      $recent_posts.owlCarousel({
        items: 3,
        loop: true,
        nav: true,
        dots: false,
        navText : ['<i class="os-icon os-icon-chevron-thin-left"></i>', '<i class="os-icon os-icon-chevron-thin-right"></i>'],
        responsive : {
          0 : { items : 1 },
          480 : { items : 2 },
          768 : { items : 2 },
          992 : { items : 3 }
        }
      });
    }


    // index gallery navigation
    $('.gallery-image-next').on('click', function(){
      var $item_media = $(this).closest('.archive-item-media');
      var $item_thumbnail = $item_media.find('.archive-item-media-thumbnail');
      var $next_source = $item_media.find('.gallery-image-source.active').next('.gallery-image-source');
      if(!$next_source.length) $next_source = $item_media.find('.gallery-image-source').first();
      $item_media.find('.gallery-image-source').removeClass('active');
      $next_source.addClass('active');
      $item_thumbnail.css('background-image', 'url(' + $next_source.data('gallery-image-url') + ')');
    });

    $('.print-post-btn').on('click', function(){
      window.print();
      return false;
    });

    $('.share-post-btn, .trigger-share-post-lightbox').on('click', function(){
      if($('.full-screen-share-box').length){
        $('.full-screen-share-box').remove();
      }else{
        $('body').append('<div class="full-screen-share-box"><div class="post-share-box">' + $('.post-share-box').html() + '</div></div>');
      }
      return false;
    });

    $('body').on('click', '.full-screen-share-box .psb-close', function(){
      $('.full-screen-share-box').remove();
      return false;
    });

    $('body').on('click', '.full-screen-share-box', function(e){
      if (e.target !== this)
        return;
      $('.full-screen-share-box').remove();
      return false;
    });



    // timed scroll event
    var uniqueCntr = 0;
    $.fn.scrolled = function (waitTime, fn) {
        if (typeof waitTime === "function") {
            fn = waitTime;
            waitTime = 50;
        }
        var tag = "scrollTimer" + uniqueCntr++;
        this.scroll(function () {
            var self = $(this);
            var timer = self.data(tag);
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(function () {
                self.removeData(tag);
                fn.call(self[0]);
            }, waitTime);
            self.data(tag, timer);
        });
    }

    if($('.top-menu').length && $('.fixed-header-w').length){
      var offset = $('.top-menu').offset();
      var trigger_point = offset.top + $('.top-menu').outerHeight();
      $(window).scrolled(function(){
        if($(window).scrollTop() >= trigger_point){
          $('body').addClass('fix-top-menu');
        }else{
          $('body').removeClass('fix-top-menu');
        }
      });
    }

    if($('.with-parallax .os-slide-w.active').length){
      var slider_offet = $('.os-slide-w.active').offset().top;
      var slider_height = $('.os-slide-w.active').outerHeight();
      $(window).scroll(function(){
        var scroll_position = $(window).scrollTop();
        if((scroll_position > slider_offet) && (scroll_position < (slider_height + slider_offet))){

          var percent = (scroll_position - slider_offet) / slider_height;
          var to_move = (slider_height * percent) / 2;
          var to_move_img = (slider_height * percent) / 2;
          var to_blur = Math.round(6 * percent);
          var to_gray = percent * 100;
          var scale = 1 + (percent / 4);

          $('.os-slide-w.active .os-slide').css('transform', 'translateY(' + to_move + 'px)').css('filter', 'grayscale(' + to_gray + '%) blur('+ to_blur + 'px)');
          $('.os-slide-w.active .os-slide .os-slide-content').css('opacity', 1 - percent);
        }else{
          if(scroll_position <= slider_offet){
            $('.os-slide-w.active .os-slide').css('transform', 'translateY(0px)').css('transform', 'translateY(0px) scale(1)').css('filter', 'grayscale(0%) blur(0px)');
          }
        }
      });
    }


    if($('.page-intro-header.with-background').length){
      var slider_offet = $('.page-intro-header.with-background').offset().top;
      var slider_height = $('.page-intro-header.with-background').outerHeight();
      $(window).scroll(function(){
        var scroll_position = $(window).scrollTop();
        if((scroll_position > slider_offet) && (scroll_position < (slider_height + slider_offet))){

          var percent = (scroll_position - slider_offet) / slider_height;
          var to_move = (slider_height * percent) / 5;
          var to_move_img = (slider_height * percent) / 2;
          var to_blur = Math.round(5 * percent);
          var to_gray = percent * 100;
          var scale = 1 + (percent / 4);

          $('.page-intro-header.with-background').css('filter', 'grayscale(' + to_gray + '%) blur('+ to_blur + 'px)').css('transform', 'translateY(' + to_move + 'px)');
          $('.page-intro-header h1').css('opacity', 1 - percent).css('transform', 'translateY(' + to_move + 'px)');
        }else{
          if(scroll_position <= slider_offet){
            $('.page-intro-header.with-background').css('transform', 'translateY(0px)').css('transform', 'translateY(0px) scale(1)').css('filter', 'grayscale(0%) blur(0px)');
          }
        }
      });
    }





    $('.read-comments-link').on('click', function(){
      $('.comment-list').toggle();
      return false;
    });

    $('.search-trigger, .mobile-menu-search-toggler').on('click', function(){
      $('body').addClass('active-search-form');
      $('.main-search-form-overlay').fadeIn(300);
      $('.main-search-form .search-field').focus();
    });

    $('.main-search-form-overlay').on('click', function(){
      $('body').removeClass('active-search-form');
      $('.main-search-form-overlay').fadeOut(300);
    });



    /// ------------------
    /// mobile menu activator
    /// ------------------
    $('.mobile-menu-toggler').on('click', function(){
      $('.mobile-header-menu-w').slideToggle(400);
    });


    $(document).keyup(function(e) {
      if (e.keyCode == 27) { 
        $('body').removeClass('active-search-form');
        $('.main-search-form-overlay').fadeOut(300);
      }
    });



    // REGULAR POST GALLERY
    var $post_gallery = $(".single-post-gallery-images-i");
    if ($post_gallery.length) {
      $post_gallery.owlCarousel({
        items: 4,
        loop: false,
        nav: $post_gallery.find('.gallery-image-source').length > 4 ? true : false,
        dots: false,
        navText : ['<i class="os-icon os-icon-arrow-1-left"></i>', '<i class="os-icon os-icon-arrow-1-right"></i>']
      });
    }


    $('.single-post-gallery-images .gallery-image-source').on('click', function(){
      var image_id = $(this).data('image-id');
      $('.single-main-media-image-w.active').removeClass('active');
      $('#'+image_id).addClass('active');
      return false;
    });


    // STICKY POSTS
    var $sticky_owl = $(".sticky-posts-owl-slider");
    if ($sticky_owl.length && $sticky_owl.find('.sticky-post').length > 1) {
      $sticky_owl.owlCarousel({
        items: 1,
        loop: false,
        nav: true,
        dots: true,
        navText : ['<i class="os-icon os-icon-arrow-1-left"></i>', '<i class="os-icon os-icon-arrow-1-right"></i>']
      });
    }

    // Tooltip

    $('.tooltip-trigger').on({
      mouseenter: function(){
        var tooltip_header = $(this).data('tooltip-header');
        $(this).append('<div class="tooltip-box"><div class="tooltip-box-header">'+ tooltip_header +'</div></div>');
      },
      mouseleave: function(){
        $(this).find('.tooltip-box').remove();
      }
    });



    // --------------------------------------------

    // ACTIVATE TOP MENU

    // --------------------------------------------

    // MAIN TOP MENU HOVER DELAY LOGIC
    var menu_timer;
    $('.menu-activated-on-hover > ul > li.menu-item-has-children').mouseenter(function(){
      var $elem = $(this);
      clearTimeout(menu_timer);
      $elem.closest('ul').addClass('has-active').find('> li').removeClass('active');
      $elem.addClass('active');
    });
    $('.menu-activated-on-hover > ul > li.menu-item-has-children').mouseleave(function(){
      var $elem = $(this);
      menu_timer = setTimeout(function(){
        $elem.removeClass('active').closest('ul').removeClass('has-active');

      }, 200);
    });

    // SUB MENU HOVER DELAY LOGIC
    var sub_menu_timer;
    $('.menu-activated-on-hover > ul > li.menu-item-has-children > ul > li.menu-item-has-children').mouseenter(function(){
      var $elem = $(this);
      clearTimeout(sub_menu_timer);
      $elem.closest('ul').addClass('has-active').find('> li').removeClass('active');
      $elem.addClass('active');
      if($elem.length){
        var sub_menu_right_offset = $elem.offset().left + ($elem.outerWidth() * 2);
        if(sub_menu_right_offset >= $('body').width()){
          $elem.addClass('active-left');
        }
      }
    });
    $('.menu-activated-on-hover > ul > li.menu-item-has-children > ul > li.menu-item-has-children').mouseleave(function(){
      var $elem = $(this);
      sub_menu_timer = setTimeout(function(){
        $elem.removeClass('active').removeClass('active-left').closest('ul').removeClass('has-active');

      }, 200);
    });


    $('.menu-activated-on-click li.menu-item-has-children > a').on('click', function(event){
      var $elem = $(this).closest('li');
      $elem.toggleClass('active');
      return false;
    });

    // $('.top-menu .sub-menu li.menu-item-has-children, .fixed-top-menu-w .sub-menu li.menu-item-has-children').on('mouseenter', function(event){
    //   var $elem = $(this).closest('li');
    //   $elem.addClass('active');
    //   return false;
    // });
    // $('.top-menu .sub-menu li.menu-item-has-children, .fixed-top-menu-w .sub-menu li.menu-item-has-children').on('mouseleave', function(event){
    //   var $elem = $(this).closest('li');
    //   $elem.removeClass('active');
    //   return false;
    // });


    // SHARE POST LINK
    $('.post-control-share, .single-panel .psb-close').on('click', function(){
      $('.post-share-box').slideToggle(500);
      return false;
    });

    // select all text on click when trying to share a url
    $('.psb-url-input').on('click', function(){
      $(this).select();
    });


  } );


} )( jQuery );
