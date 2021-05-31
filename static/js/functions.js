(function ($) {
    "use strict";
    function lynessa_form() {
        $('.showbtn').on('click', function (e) {
            $(this).parents('.lynessa-form-toggle').siblings('.lynessa-form-show').slideToggle();
            e.preventDefault();
        });
    }
    //���ྫƷģ�壺http://www.bootstrapmb.com/
    function lynessa_view_mode_sidebar() {
        $('.has-sidebar .grid-view-mode .modes-mode').on('click', function (e) {
            var $this = $(this);
            if ($this.hasClass('active')) {
                return false;
            }
            if ($this.hasClass('mode-grid')) {
                $('.product-item').addClass('col-bg-4 col-xl-4 col-lg-6 col-md-6 col-sm-6 col-ts-6 style-01').removeClass('col-md-12 list');
            }
            else {
                $('.product-item').removeClass('col-bg-4 col-xl-4 col-lg-6 col-md-6 col-sm-6 col-ts-6 style-01').addClass('col-md-12 list');
            }
            $('.has-sidebar .grid-view-mode .modes-mode').removeClass('active');
            $this.addClass('active');
            e.preventDefault();
        });
    }

    function lynessa_view_mode_nosidebar() {
        $('.no-sidebar .grid-view-mode .modes-mode').on('click', function (e) {
            var $this = $(this);
            if ($this.hasClass('active')) {
                return false;
            }
            if ($this.hasClass('mode-grid')) {
                $('.product-item').addClass('col-bg-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-ts-6 style-01').removeClass('list');
            }
            else {
                $('.product-item').removeClass('col-bg-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-ts-6 style-01').addClass('col-md-12 list');
            }

            $('.no-sidebar .grid-view-mode .modes-mode').removeClass('active');
            $this.addClass('active');

            e.preventDefault();
        });
    }

    function lynessa_video() {
        $('.buttonvideo').simpleLightboxVideo();
    }

    function lynessa_title_tooltip() {
        $(".lynessa-tooltip").mousemove(function (event) {
            var relX = event.pageX - $(this).offset().left - $(this).children('.lynessa-tooltip-inner').outerWidth() / 2;
            var relY = event.pageY - $(this).offset().top - $(this).children('.lynessa-tooltip-inner').outerHeight() - 5;
            $(this).children('.lynessa-tooltip-inner').css({"top": relY, "left": relX});
        });
    }

    function lynessa_header_sticky($elem) {
        var $this = $elem;
        $this.on('lynessa_header_sticky', function () {
            $this.each(function () {
                var previousScroll = 0,
                    header = $(this).closest('.header'),
                    header_wrap_stick = $(this),
                    header_position = $(this).find('.header-position'),
                    headerOrgOffset = header_position.offset().top;
                header_wrap_stick.css('height', header_wrap_stick.outerHeight());
                $(document).on('scroll', function (ev) {
                    var currentScroll = $(this).scrollTop();
                    if (currentScroll > headerOrgOffset) {
                        header_position.addClass('fixed');
                    } else {
                        header_position.removeClass('fixed');
                    }
                    previousScroll = currentScroll;
                });

            })
        }).trigger('lynessa_header_sticky');
        $(window).on('resize', function () {
            $this.trigger('lynessa_header_sticky');
        });
    }

    function lynessa_vertical_menu($elem) {
        /* SHOW ALL ITEM */
        var _countLi = 0,
            _verticalMenu = $elem.find('.vertical-menu'),
            _blockNav = $elem.closest('.block-nav-category'),
            _blockTitle = $elem.find('.block-title');

        $elem.each(function () {
            var _dataItem = $(this).data('items') - 1;
            _countLi = $(this).find('.vertical-menu>li').length;

            if (_countLi > (_dataItem + 1)) {
                $(this).addClass('show-button-all');
            }
            $(this).find('.vertical-menu>li').each(function (i) {
                _countLi = _countLi + 1;
                if (i > _dataItem) {
                    $(this).addClass('link-other');
                }
            })
        });

        $elem.find('.vertical-menu').each(function () {
            var _main = $(this);
            _main.children('.menu-item.parent').each(function () {
                var curent = $(this).find('.submenu');
                $(this).children('.toggle-submenu').on('click', function () {
                    $(this).parent().children('.submenu').stop().slideToggle(300);
                    _main.find('.submenu').not(curent).stop().slideUp(300);
                    $(this).parent().toggleClass('show-submenu');
                    _main.find('.menu-item.parent').not($(this).parent()).removeClass('show-submenu');
                });
                var next_curent = $(this).find('.submenu');
                next_curent.children('.menu-item.parent').each(function () {
                    var child_curent = $(this).find('.submenu');
                    $(this).children('.toggle-submenu').on('click', function () {
                        $(this).parent().parent().find('.submenu').not(child_curent).stop().slideUp(300);
                        $(this).parent().children('.submenu').stop().slideToggle(300);
                        $(this).parent().parent().find('.menu-item.parent').not($(this).parent()).removeClass('show-submenu');
                        $(this).parent().toggleClass('show-submenu');
                    })
                });
            });
        });

        if (_verticalMenu.length > 0) {
            $(document).on('click', '.open-cate', function (e) {
                _blockNav.find('li.link-other').each(function () {
                    $(this).slideDown();
                });
                $(this).addClass('close-cate').removeClass('open-cate').html($(this).data('closetext'));
                e.preventDefault();
            });
            $(document).on('click', '.close-cate', function (e) {
                _blockNav.find('li.link-other').each(function () {
                    $(this).slideUp();
                });
                $(this).addClass('open-cate').removeClass('close-cate').html($(this).data('alltext'));
                e.preventDefault();
            });

            _blockTitle.on('click', function () {
                $(this).toggleClass('active');
                $(this).parent().toggleClass('has-open');
                $body.toggleClass('category-open');
            });
        }
    }

    function lynessa_auto_width_vertical_menu() {
        var full_width = parseInt($('.container').outerWidth()) - 50;
        var menu_width = parseInt($('.vertical-menu').outerWidth());
        var w = (full_width - menu_width);
        $('.vertical-menu').find('.megamenu').each(function () {
            $(this).css('max-width', w + 'px');
        });
    }

    function lynessa_animation_tabs($elem, _tab_animated) {
        _tab_animated = (_tab_animated == undefined || _tab_animated == "") ? '' : _tab_animated;
        if (_tab_animated == "") {
            return;
        }
        $elem.find('.owl-slick .slick-active, .product-list-grid .product-item').each(function (i) {
            var _this = $(this),
                _style = _this.attr('style'),
                _delay = i * 200;

            _style = (_style == undefined) ? '' : _style;
            _this.attr('style', _style +
                ';-webkit-animation-delay:' + _delay + 'ms;'
                + '-moz-animation-delay:' + _delay + 'ms;'
                + '-o-animation-delay:' + _delay + 'ms;'
                + 'animation-delay:' + _delay + 'ms;'
            ).addClass(_tab_animated + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                _this.removeClass(_tab_animated + ' animated');
                _this.attr('style', _style);
            });
        });
    }

    function lynessa_init_carousel($elem) {
        $elem.not('.slick-initialized').each(function () {
            var _this = $(this),
                _responsive = _this.data('responsive'),
                _config = [];
            if (_this.hasClass('slick-vertical')) {
                _config.prevArrow = '<span class="fa fa-angle-up prev"></span>';
                _config.nextArrow = '<span class="fa fa-angle-down next"></span>';
            } else {
                _config.prevArrow = '<span class="fa fa-angle-left prev"></span>';
                _config.nextArrow = '<span class="fa fa-angle-right next"></span>';
            }
            _config.responsive = _responsive;

            _this.on('init', function (event, slick, direction) {
                lynessa_popover_button();
            });
            _this.slick(_config);
        });
    }

    function lynessa_countdown($elem) {
        $elem.on('lynessa_countdown', function () {
            $elem.each(function () {
                var _this = $(this),
                    _text_countdown = '';

                _this.countdown(_this.data('datetime'), function (event) {
                    _text_countdown = event.strftime(
                        '<span class="days"><span class="number">%D</span><span class="text">Days</span></span>' +
                        '<span class="hour"><span class="number">%H</span><span class="text">Hours</span></span>' +
                        '<span class="mins"><span class="number">%M</span><span class="text">Mins</span></span>' +
                        '<span class="secs"><span class="number">%S</span><span class="text">Secs</span></span>'
                    );
                    _this.html(_text_countdown);
                });
            });
        }).trigger('lynessa_countdown');
    }

    // category product
    function lynessa_category_product($elem) {
        $elem.each(function () {
            var _main = $(this);
            _main.find('.cat-parent').each(function () {
                if ($(this).hasClass('current-cat-parent')) {
                    $(this).addClass('show-sub');
                    $(this).children('.children').stop().slideDown(300);
                }
                $(this).children('.children').before('<span class="carets"></span>');
            });
            _main.children('.cat-parent').each(function () {
                var curent = $(this).find('.children');
                $(this).children('.carets').on('click', function () {
                    $(this).parent().toggleClass('show-sub');
                    $(this).parent().children('.children').stop().slideToggle(300);
                    _main.find('.children').not(curent).stop().slideUp(300);
                    _main.find('.cat-parent').not($(this).parent()).removeClass('show-sub');
                });
                var next_curent = $(this).find('.children');
                next_curent.children('.cat-parent').each(function () {
                    var child_curent = $(this).find('.children');
                    $(this).children('.carets').on('click', function () {
                        $(this).parent().toggleClass('show-sub');
                        $(this).parent().parent().find('.cat-parent').not($(this).parent()).removeClass('show-sub');
                        $(this).parent().parent().find('.children').not(child_curent).stop().slideUp(300);
                        $(this).parent().children('.children').stop().slideToggle(300);
                    })
                });
            });
        });
    }

    function lynessa_magnific_popup() {
        $('.product-360-button a').magnificPopup({
            type: 'inline',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            disableOn: false,
            preloader: false,
            fixedContentPos: false
        });
    }

    function lynessa_better_equal_elems($elem) {
        $elem.each(function () {
            if ($(this).find('.equal-elem').length) {
                $(this).find('.equal-elem').css({
                    'height': 'auto'
                });
                var _height = 0;
                $(this).find('.equal-elem').each(function () {
                    if (_height < $(this).height()) {
                        _height = $(this).height();
                    }
                });
                $(this).find('.equal-elem').height(_height);
            }
        });
    }

    function lynessa_product_gallery($elem) {
        $elem.each(function () {
            var _items = $(this).closest('.product-inner').data('items'),
                _main_slide = $(this).find('.product-gallery-slick'),
                _dot_slide = $(this).find('.gallery-dots');

            _main_slide.not('.slick-initialized').each(function () {
                var _this = $(this),
                    _config = [];

                if ($('body').hasClass('rtl')) {
                    _config.rtl = true;
                }
                _config.prevArrow = '<span class="fa fa-angle-left prev"></span>';
                _config.nextArrow = '<span class="fa fa-angle-right next"></span>';
                _config.cssEase = 'linear';
                _config.infinite = false;
                _config.fade = true;
                _config.slidesMargin = 0;
                _config.arrows = false;
                _config.asNavFor = _dot_slide;
                _this.slick(_config);
            });
            _dot_slide.not('.slick-initialized').each(function () {
                var _config = [];
                if ($('body').hasClass('rtl')) {
                    _config.rtl = true;
                }
                _config.slidesToShow = _items;
                _config.infinite = false;
                _config.focusOnSelect = true;
                _config.vertical = true;
                _config.slidesMargin = 10;
                _config.prevArrow = '<span class="fa fa-angle-up prev"></span>';
                _config.nextArrow = '<span class="fa fa-angle-down next"></span>';
                _config.asNavFor = _main_slide;
                _config.responsive = [
                    {
                        breakpoint: 1199,
                        settings: {
                            vertical: false,
                            slidesMargin: 10,
                            prevArrow: '<span class="fa fa-angle-left prev"></span>',
                            nextArrow: '<span class="fa fa-angle-right next"></span>'
                        }
                    }
                ];
                $(this).slick(_config);
            })
        })
    }

    function lynessa_popover_button() {
        $('[data-toggle="tooltip"]').each(function () {
            $(this).tooltip({
                title: $(this).text()
            });
        });
        // .product-item .add-to-cart a
        $('.product-inner.tooltip-all-top .yith-wcqv-button,.product-inner.tooltip-top .add-to-cart a, .product-inner.tooltip-top .compare,.product-inner.tooltip-top .yith-wcwl-add-to-wishlist a').each(function () {
            $(this).tooltip({
                title: $(this).text(),
                trigger: 'hover',
                placement: 'top'
            });
        });
        $('.product-inner.tooltip-left .add-to-cart a, .product-inner.tooltip-left .yith-wcqv-button,.product-inner.tooltip-left .compare,.product-inner.tooltip-left .yith-wcwl-add-to-wishlist a').each(function () {
            $(this).tooltip({
                title: $(this).text(),
                trigger: 'hover',
                placement: 'left'
            });
        });
        $('.product-inner.tooltip-right .add-to-cart a, .product-inner.tooltip-right .yith-wcqv-button,.product-inner.tooltip-right .compare,.product-inner.tooltip-right .yith-wcwl-add-to-wishlist a').each(function () {
            $(this).tooltip({
                title: $(this).text(),
                trigger: 'hover',
                placement: 'right'
            });
        });
    }

    function lynessa_threesixty(ev) {
        var imageLink = (location.pathname.replace('single-product-360deg.html', 'assets/images'));
        $('.lynessa-threed-view').ThreeSixty({
            totalFrames: 12,
            endFrame: 12,
            currentFrame: 1,
            imgList: '.threed-view-images',
            progress: '.spinner',
            imgArray: [imageLink + '/is_main.jpg', imageLink + '/is_main1.jpg', imageLink + '/is_main2.jpg', imageLink + '/is_main4.jpg', imageLink + '/is_main5.jpg', imageLink + '/is_main6.jpg', imageLink + '/is_main7.jpg', imageLink + '/is_main8.jpg', imageLink + '/is_main9.jpg', imageLink + '/is_main10.jpg', imageLink + '/is_main11.jpg', imageLink + '/is_main12.jpg'],
            height: 600,
            width: 600,
            responsive: true,
            navigation: true
        });
    }

    // Window load
    $(window).on("load", function () {
        lynessa_video();
        lynessa_form();
        lynessa_view_mode_sidebar();
        lynessa_view_mode_nosidebar();
        if ($('.owl-slick').length) {
            $('.owl-slick').each(function () {
                lynessa_init_carousel($(this));
            });
        }
        if ($('.lynessa-threed-view').length > 0) {
            lynessa_threesixty();
        }
        if ($('.vertical-menu').length > 0) {
            lynessa_auto_width_vertical_menu();
        }
        if ($('.lynessa-countdown').length) {
            lynessa_countdown($('.lynessa-countdown'));
        }
        if ($('.product-gallery').length) {
            lynessa_product_gallery($('.product-gallery'));
        }
        if ($('.block-nav-category').length) {
            lynessa_vertical_menu($('.block-nav-category'));
        }
        if ($('.widget_lynessa_nav_menu').length) {
            lynessa_vertical_menu($('.widget_lynessa_nav_menu'));
        }
        if ($('.category-search-option').length) {
            $('.category-search-option').chosen();
        }
        if ($('.category .chosen-results').length && $.fn.scrollbar) {
            $('.category .chosen-results').scrollbar();
        }
        if ($('.block-minicart .cart_list').length && $.fn.scrollbar) {
            $('.block-minicart .cart_list').scrollbar();
        }
        if ($('.widget_product_categories .product-categories').length) {
            lynessa_category_product($('.widget_product_categories .product-categories'));
        }
        if ($('.header-sticky .header-wrap-stick').length) {
            lynessa_header_sticky($('.header-sticky .header-wrap-stick'));
        }
        if ($('.equal-container.better-height').length) {
            lynessa_better_equal_elems($('.equal-container.better-height'));
        }
        lynessa_popover_button();
        lynessa_magnific_popup();
        lynessa_title_tooltip();
    });
    // Window resize
    $(window).on("resize", function () {
        if ($('.vertical-menu').length > 0) {
            lynessa_auto_width_vertical_menu();
        }
        if ($('.equal-container.better-height').length) {
            lynessa_better_equal_elems($('.equal-container.better-height'));
        }
    });
})(jQuery); // End of use strict
