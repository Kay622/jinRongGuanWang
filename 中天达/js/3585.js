(function (win, $) {

    $.fn.extend({
        simpleSlider: function simpleSlider(option) {

            var _width = 0,
                widths = [],
                fullWidths = [],
                heights = [],
                fullHeights = [],
                itemWidths = [],
                pos = [],
                initOption = {
                style: 'top',
                items: 3,
                dir: true,
                // margin: 50,
                speed: 800
            },
                currentItem,
                $slider = $(this),
                $sliderWrap = $slider.parent(),
                sliderWrapPad = {
                left: [parseInt($sliderWrap.css('padding-left')).toFixed(2), parseInt($sliderWrap.css('padding-right')).toFixed(2)],
                top: [parseInt($sliderWrap.css('padding-top')).toFixed(2), parseInt($sliderWrap.css('padding-bottom')).toFixed(2)]
            },
                items = $slider.children(),
                current = 0,
                sliderNav;

            var dirBtn = '\n                <div class="owl-nav">\n                    <div class="owl-prev">\n                        <i class="icon iconfont icon-back"></i>\n                    </div>\n                    <div class="owl-next">\n                        <i class="iconfont icon-more"></i>\n                    </div>\n                </div>';

            items.eq(0).addClass('active');
            items.wrapAll('<div class="simple-slider-outer"><div class="simple-slider-stage"></div></div>');

            $slider = $(this).find('.simple-slider-stage');
            $sliderWrap = $slider.parent();

            $.extend(initOption, option, true);

            if (initOption.dir) {

                $(dirBtn).insertAfter($sliderWrap);
            }

            function gotoPos(index, page) {
                var dataArr, dir;
                if (initOption.style == 'left') {
                    dir = 'lr';
                    if (page) {
                        dataArr = fullWidths;
                    } else {
                        dataArr = widths;
                    }
                } else if (initOption.style == 'top') {
                    dir = 'bt';
                    if (page) {
                        dataArr = fullHeights;
                    } else {
                        dataArr = heights;
                    }
                }
                if (page) {
                    if (index < current) {
                        index = initOption.items * Math.floor(index / initOption.items) - 1;
                    } else if (index > current) {
                        console.log(index, 'downc');
                        index = initOption.items * Math.ceil(index / initOption.items);
                        index = Math.min(index, items.length - initOption.items);
                        console.log(index, 'downc');
                    }
                }

                index = Math.max(index, 0);
                index = Math.min(index, items.length - 1);

                var $currentItem = items.eq(index),
                    disBox = tools.getRelPos($currentItem, $sliderWrap),
                    disPar = tools.getRelPos($currentItem, $slider),
                    disInfor;

                // if ($currentItem.hasClass('active')) return;

                tools.tabActive(items.eq(index));
                console.log(page);
                if (page) {
                    console.log(3, 's');
                    $slider.css({
                        'transform': function transform() {
                            console.log(index);
                            var dis = -dataArr[index],
                                str;
                            console.log(dis);
                            if (dir == 'lr') {
                                str = 'translate3D(' + dis + 'px, 0px, 0px)';
                            } else if (dir == 'bt') {
                                str = 'translate3D(0px, ' + dis + 'px, 0px)';
                            }
                            return str;
                        }
                    });
                } else if (items[index - 1] && tools.getRelPos($sliderWrap, items.eq(index - 1))[initOption.style] < 0) {
                    // console.log(index, dataArr)
                    // console.log(1);
                    // $slider.css({
                    //     'transform': function (){
                    //         var dis, str;
                    //         dis = Math.min(-dataArr[index - 1], 0);
                    //         str = 'translate('+ dis +'px, 0px)';
                    //         return str;
                    //     }
                    // });
                    disInfor = tools.getRelPos(items.eq(index - 1), $slider);
                    console.log(disInfor, index, 'up');
                    $slider.css({
                        'transform': function transform() {
                            var disX = disInfor.left,
                                disY = disInfor.top,
                                str = 'translate3D(' + disX + 'px, ' + disY + 'px, 0px)';
                            return str;
                        }
                    });
                } else if (items.eq(index + 1)[0] && tools.getRelPos($sliderWrap, items.eq(index + 1))[initOption.style] >= $sliderWrap.outerWidth()) {
                    console.log(2);
                    $slider.css({
                        'transform': function transform() {
                            var dis = -dataArr[index + 1],
                                str;
                            if (dir == 'lr') {
                                str = 'translate3D(' + dis + 'px, 0px, 0px)';
                            } else if (dir == 'tb') {
                                str = 'translate3D(0px, ' + dis + 'px, 0px)';
                            }
                            return str;
                        }
                    });
                }

                // if (index != 0 && tools.getRelPos(items.eq(index), $sliderWrap)[initOption.style] >= 0) {
                //     disInfor = tools.getRelPos(items.eq(index), $slider);
                //     console.log(disInfor, index, 'up');
                //     $slider.css({
                //         'transform': function transform() {
                //             return 'translate(' + disInfor.left + 'px, ' + disInfor.top + 'px)';
                //         }
                //     });
                // } else {
                //     disInfor = tools.getRelPos($slider, $sliderWrap);
                //     console.log("down")
                //     // console.log("down", disBox[initOption.style], Math.floor($curItemInfor[curStyle]), ($sliderWrap[curStyle]() - sliderWrapPad[initOption.style][1]))
                //     if (index != items.length - 1) {
                //         $slider.css({
                //             'transform': function transform() {
                //                 // var long = -(disInfor[initOption.style] + items.eq(index+1)[curStyle]() + initOption.margin + sliderWrapPad[initOption.style][0]);
                //                 var long = curStyle == 'outerWidth' ? -widths[index] + initOption.margin : -fullHeights[index];
                //                 console.log(long, curStyle, widths[index], index);
                //                 // return  curStyle == 'outerWidth' ? 'translate(' + long + 'px, ' + 0 + 'px)' : 'translate(' + 0 + 'px, ' + long + 'px)';

                //                 return curStyle == 'outerWidth' ? 'translate(' + long + 'px, ' + 0 + 'px)' : 'translate(' + 0 + 'px, ' + long + 'px)';
                //             }
                //         });
                //     }
                //     // disInfor = tools.getRelPos($slider, $sliderWrap);
                //     // console.log("down")
                //     // // console.log("down", disBox[initOption.style], Math.floor($curItemInfor[curStyle]), ($sliderWrap[curStyle]() - sliderWrapPad[initOption.style][1]))
                //     // if (index != items.length - 1) {
                //     //     $slider.css({
                //     //         'transform': function transform() {
                //     //             // var long = -(disInfor[initOption.style] + items.eq(index+1)[curStyle]() + initOption.margin + sliderWrapPad[initOption.style][0]);
                //     //             var long = curStyle == 'outerWidth' ? -widths[index] + initOption.margin : -fullHeights[index];
                //     //             console.log(long, curStyle, widths[index], index);
                //     //             // return  curStyle == 'outerWidth' ? 'translate(' + long + 'px, ' + 0 + 'px)' : 'translate(' + 0 + 'px, ' + long + 'px)';

                //     //             return curStyle == 'outerWidth' ? 'translate(' + long + 'px, ' + 0 + 'px)' : 'translate(' + 0 + 'px, ' + long + 'px)';
                //     //         }
                //     //     });
                //     // }
                // }
                current = index;

                $sliderWrap.trigger('change-simpleSlider', [{
                    item: current
                }]);
            }

            // 确认 一行显示几个
            initOption.items = initOption.items ? initOption.items : Math.round($sliderWrap.width() / items.eq(0).width());
            $sliderWrap.css({
                overflow: 'hidden'
            });
            $slider.css({
                'transition': initOption.speed / 1000 + 's'
            });

            if (initOption.style == 'left') {
                initOption.margin = initOption.margin ? initOption.margin : -parseInt($(this).css('margin-right'));
                items.each(function (i, n) {
                    $(n).css({
                        width: function width() {
                            _width += (($sliderWrap.width() + initOption.margin) / initOption.items).toFixed(3) - initOption.margin + initOption.margin;
                            return (($sliderWrap.width() + initOption.margin) / initOption.items).toFixed(3) - initOption.margin;
                        }
                    });

                    widths.push(Math.max(_width - $sliderWrap.width()));
                    fullWidths.push(_width);
                });
                fullWidths.unshift(0);

                console.log(widths, 'widths');
                console.log('fullWidth', fullWidths);
                $slider.css({
                    width: _width
                });
                items.css({
                    float: 'left',
                    'margin-right': initOption.margin
                });
            } else {
                console.log($(this).css('margin-bottom'));
                initOption.margin = initOption.margin ? initOption.margin : parseInt($(this).find('.item_block ').css('margin-bottom'));
                console.log(initOption.margin, $(this), $(this).css('margin-bottom'));

                items.each(function (i, n) {
                    $(n).css({
                        width: function width() {
                            return $(this).outerWidth();
                        },
                        height: function height() {
                            return $(this).outerHeight();
                        }
                    });
                });

                var h = items.eq(0).height();

                items.css({
                    float: 'none',
                    'margin-bottom': initOption.margin
                });
                $slider.css({
                    height: 'auto'
                });
                $sliderWrap.css({
                    height: function height() {
                        return (items.eq(0).outerHeight() + initOption.margin) * initOption.items - initOption.margin;
                    }
                });

                items.each(function (i, n) {
                    console.log(items.length, initOption.items);
                    fullHeights.push((items.eq(0).outerHeight() + initOption.margin) * Math.min(items.length - initOption.items, i));
                });

                console.log(fullHeights);
            }

            items.on('click', function () {
                gotoPos($(this).index());
            });
            $(this).find('.owl-prev').click(function (ev) {
                console.log(current);

                gotoPos(current - 1, true);
            });
            $(this).find('.owl-next').click(function (ev) {
                console.log(current);
                gotoPos(current + 1, true);
            });

            return {
                el: $sliderWrap,
                now: function now() {
                    return current;
                },
                to: function to(index) {
                    gotoPos(index);
                },
                next: function next() {
                    this.to(current + 1);
                },
                prev: function prev() {
                    this.to(current - 1);
                }
            };
        }
    });
})(window, jQuery);

//interfaceFun接口函数，初始化入口
//indexMain  对应页面

// import ff_owl from './owl.carousel';
var newStyleContent = {

    sliderDirThemb: '\n        #topSlider .content_list .owl-prev:hover #sliderDotThemb,\n        #topSlider .content_list .owl-prev:hover #sliderDirThemb {\n            visibility: visible;\n            opacity: 1\n        }\n        #sliderDirThemb,\n        #sliderDotThemb {\n            width: 100px;\n            height: 50px;\n            position: absolute;\n            border: 3px solid #fff;\n            visibility: hidden;\n            opacity: 0;\n            box-sizing: border-box;\n            transition: visibility 0.36s ease, opacity 0.36s ease;\n        } \n        \n        #sliderDirThemb.dot,\n        #sliderDotThemb.dot {\n            top: auto !important;\n            bottom: 40px;\n            transition: all 0.36s ease;\n            transform: translateX(-50%);\n        }\n        #sliderDirThemb.dir,\n        #sliderDotThemb.dir {\n            bottom: auto !important;\n        }\n        #sliderDirThemb .owl-item .thumb-item,\n        #sliderDotThemb .owl-item .thumb-item {\n            width: 100px;\n            height: 44px;\n            background-position: center center;\n            background-size: cover;\n        }\n        #sliderDirThemb .owl-dots,\n        #sliderDotThemb .owl-dots {\n        }\n        #sliderDirThemb .owl-stage-outer,\n        #sliderDotThemb .owl-stage-outer {\n        }\n        #sliderDirThemb.showStage,\n        #sliderDotThemb.showStage {\n            visibility: visible;\n            opacity: 1\n        }\n    ',
    sliderDotThemb: '\n        #topSlider .content_list .owl-prev:hover #sliderDotThemb,\n        #topSlider .content_list .owl-prev:hover #sliderDirThemb {\n            visibility: visible;\n            opacity: 1\n        }\n        #sliderDirThemb,\n        #sliderDotThemb {\n            width: 100px;\n            height: 50px;\n            position: absolute;\n            border: 3px solid #fff;\n            visibility: hidden;\n            opacity: 0;\n            box-sizing: border-box;\n            transition: visibility 0.36s ease, opacity 0.36s ease;\n        } \n        \n        #sliderDirThemb.dot,\n        #sliderDotThemb.dot {\n            top: auto !important;\n            bottom: 40px;\n            transition: all 0.36s ease;\n            transform: translateX(-50%);\n        }\n        #sliderDirThemb.dir,\n        #sliderDotThemb.dir {\n            bottom: auto !important;\n        }\n        #sliderDirThemb .owl-item .thumb-item,\n        #sliderDotThemb .owl-item .thumb-item {\n            width: 100px;\n            height: 44px;\n            background-position: center center;\n            background-size: cover;\n        }\n        #sliderDirThemb .owl-dots,\n        #sliderDotThemb .owl-dots {\n        }\n        #sliderDirThemb .owl-stage-outer,\n        #sliderDotThemb .owl-stage-outer {\n        }\n        #sliderDirThemb.showStage,\n        #sliderDotThemb.showStage {\n            visibility: visible;\n            opacity: 1\n        }\n    ',
    npostSlider: '\n        #postSlider .tab_button .content_list {\n            width: 240px;\n        }\n    ',
    timeTurnEn: '\n        .date_wrap {\n            opacity: 0 !important;\n        }\n        .date_wrap.showTime {\n\n            opacity: 1 !important;\n        }\n    ',
    parallax: '\n        .module {\n            position: relative;\n            z-index: 1\n        }\n    '
};

var tools = {
    getRelPos: function getRelPos(el1, el2) {
        var el1Pos = $(el1).offset(),
            el2Pos = $(el2).offset();
        return {
            left: Math.round(el2Pos.left - el1Pos.left),
            top: Math.round(el2Pos.top - el1Pos.top)
        };
    },
    hideEl: function hideEl(el, pos) {
        $(window).scroll(function (ev) {
            var scrollPos = $(window).scrollTop();
            if (pos < scrollPos) {
                $(el).removeClass('outPos').addClass('inPos');
            } else {
                $(el).removeClass('inPos').addClass('outPos');
            }
        });
    },
    tabActive: function tabActive($el, className) {
        className = className || 'active';
        $el.siblings().removeClass(className);
        $el.addClass(className);
    }
};
var job = {
    initThings: function initThings() {

        $('.item_block').off();
        $('#topSlider .progress').remove();
    },
    headerHover: function headerHover() {

        var _this = this,
            $listPar = $('#navWrapper .nav'),
            $moveEl,
            $moveShow,
            $headerNavList = $('#navWrapper .nav>.navitem', '#header'),
            $choiseItem = $('#navWrapper .nav>.navitem>.active', '#header').closest('.navitem');

        function getWidth(el) {

            return $(el).width();
        }

        function getPos(el) {

            return $(el).position();
        }

        (function createMoveEl($el) {

            $moveEl = $('<li class="jsMoveEl"><span></span></li>').appendTo('#navWrapper .nav');
            $moveShow = $moveEl.find('span');

            $listPar.css('position', 'relative');
            $moveEl.css({
                position: 'absolute',
                left: getPos($choiseItem).left,
                bottom: '0',
                width: getWidth($choiseItem),
                height: '2px',
                'z-index': -1
            });
            $moveShow.css({

                position: 'absolute',
                left: '0',
                right: 0,
                top: '0',
                margin: 'auto',
                width: '100%',
                height: '2px',
                'z-index': -1
            });
        })();

        $headerNavList.on('mouseenter', function () {

            var _this = this,
                $subNav = $(this).find('.subnav:not(:animated)');

            if ($subNav[0]) {

                $subNav.slideDown(200);
                $moveEl.stop().animate({

                    width: getWidth(_this),
                    left: getPos(_this).left,
                    opacity: 0
                });
            } else {

                $moveEl.stop().animate({

                    width: getWidth(_this),
                    left: getPos(_this).left,
                    opacity: 1
                });
            }
            $moveShow.stop().animate({

                width: '100%',
                opacity: '1'
            });
        });

        $headerNavList.on('mouseleave', function () {
            var $subNav = $(this).find('.subnav');
            if ($subNav.length) {

                $subNav.slideUp();
            }
        });

        $listPar.on('mouseleave', function () {
            $moveEl.stop().animate({

                width: getWidth($choiseItem),
                left: getPos($choiseItem).left
            });
        });
    },
    parallax: function parallax(el) {
        var top = $(el).offset().top;
        var $contentList = $(el);
        var sliderHeight = $contentList.data("slider-height");
        if (sliderHeight == "0") {
            $('#indexPage #topSlider').height($(window).height());
        } else {
            $('#indexPage #topSlider').height(sliderHeight);
        }
        $(window).on("scroll", function () {
            $(el).css({
                'position': 'fixed',
                'z-index': -1
            });
            $(el).css("top", function () {
                return top - 1 * $(document).scrollTop() / ($(el).height() / 140).toFixed(2);
            });
        });
    },
    parallaxPage: function parallax(el) {
        if ($el.length === 0) {
            return;
        }
        var top = $(el).offset().top;
        $(el).parent().height(function () {
            return $(el).height();
        });
        $(el).css({
            width: '100%',
            height: function height() {
                return $(el).height();
            }
        });
        $(window).scroll(function () {
            $(el).css({
                'position': 'fixed',
                'z-index': -1
            });
            $(el).css('top', function () {
                return top - 1 * $(document).scrollTop() / 2;
            });
        });
    },
    sliderDotThemb: function sliderDotThemb() {
        var thembImages = [],
            topSliderThumbApp;
        var $itemBg = $('#topSlider .content_list .owl-item:not(.cloned) .item_block .item_bg');
        var html = '<div id="sliderDotThemb" class="topSliderThumb owl-carousel owl-theme">';
        var topSliderApp = this.topSliderApp;

        $itemBg.each(function (i, el) {
            // html += '<img src=' + $(el).data('thumb') + '>';
            html += '<div class="thumb-item" style="background-image:url(' + $(el).data('thumb').replace('_80x80.jpg', '.jpg') + ')"></div>';
            thembImages.push($(el).data('thumb'));
        });
        html += '</div>';

        topSliderThumbApp = $(html).appendTo($('#topSlider')).owlCarousel({
            center: false,
            items: 1,
            loop: true,
            margin: 10,
            autoWidth: false,
            nav: false,
            responsive: false,
            dots: false
        });

        $('#topSlider .content_list').find('.owl-dot').on({
            mouseenter: function mouseenter() {
                var _this = this;
                var pos = tools.getRelPos("#topSlider", _this);

                $('#sliderDotThemb').css({
                    left: function left() {
                        return pos.left + $(_this).width() / 2;
                    }
                });

                $('#sliderDotThemb').removeClass('dir prev-dir next-dir');
                setTimeout(function () {

                    $('#sliderDotThemb').addClass('showStage dot');
                });
                topSliderThumbApp.trigger('to.owl.carousel', $(this).index());
            }
        });
        $('#topSlider .owl-dots').on({
            mouseleave: function mouseleave() {

                $('#sliderDotThemb').removeClass('showStage');
            },
            mouseenter: function mouseenter() {

                // topSliderApp.off('changed.owl.carousel')
            }
        });
    },
    sliderDirThemb: function sliderDirThemb(dir) {
        console.log(dir);
        var thembImages = [],
            topSliderDirThumbApp;
        var $itemBg = $('#topSlider .content_list .owl-item:not(.cloned) .item_block .item_bg');
        var html = '<div id="sliderDirThemb" class="topSliderThumb owl-carousel owl-theme">';
        var topSliderApp = this.topSliderApp;

        $itemBg.each(function (i, el) {
            html += '<div class="thumb-item" style="background-image:url(' + $(el).data('thumb').replace('_80x80.jpg', '.jpg') + ')"></div>';
            thembImages.push($(el).data('thumb'));
        });
        html += '</div>';

        topSliderDirThumbApp = $(html).appendTo($('#topSlider')).owlCarousel({
            center: false,
            items: 1,
            loop: true,
            margin: 10,
            autoWidth: false,
            nav: false,
            responsive: false,
            dots: false
        });

        $('#topSlider .content_list ').find('.owl-prev').add($('#topSlider .content_list ').find('.owl-next')).on({
            mouseenter: function mouseenter() {
                var _this = this,
                    nowIndex = $('#topSlider .content_list .owl-dots .owl-dot.active').index();

                if ($(_this).hasClass('owl-prev')) {
                    nowIndex -= 1;
                } else if ($(_this).hasClass('owl-next')) {
                    nowIndex += 1;
                }
                topSliderDirThumbApp.trigger('to.owl.carousel', [nowIndex]);
                topSliderApp.on('changed.owl.carousel', function (event) {
                    var item = event.item.index;
                    if ($(_this).hasClass('owl-prev')) {} else if ($(_this).hasClass('owl-next')) {
                        item -= 1;
                    }
                    topSliderDirThumbApp.trigger('to.owl.carousel', [item]);
                });

                $('#sliderDirThemb').removeClass('dot').addClass(function () {
                    if ($(_this).hasClass('.owl-prev')) {
                        return 'prev-dir dir showStage';
                    } else {
                        return 'next-dir dir showStage';
                    }
                }).css({
                    left: function left() {
                        if (dir == 'top') {

                            return tools.getRelPos("#topSlider", _this).left + ($(_this).outerWidth() - $(this).outerWidth()) / 2;
                        } else if (dir == 'LR') {
                            if ($(_this).offset().left + $('#sliderDirThemb').outerWidth() + $(_this).outerWidth() >= $(window).width()) {

                                return tools.getRelPos("#topSlider", _this).left - $('#sliderDirThemb').outerWidth();
                            } else {

                                return tools.getRelPos("#topSlider", _this).left + $(_this).outerWidth();
                            }
                        }
                    },
                    top: function top() {
                        if (dir == 'LR') {

                            return tools.getRelPos("#topSlider", _this).top + ($(_this).outerHeight() - $(this).outerHeight()) / 2;
                        } else if (dir == 'top') {

                            return tools.getRelPos("#topSlider", _this).top - $(this).outerHeight();
                        }
                    }
                });
                if (dir === 'top') {
                    $('#sliderDirThemb').css({
                        'transition': 'left 0.36s ease'
                    });
                }
            },
            mouseleave: function mouseleave() {

                $('#sliderDirThemb').removeClass('showStage');
            }
        });
    },
    sliderTitle: function sliderTitle() {
        var thembImages = [],
            topSliderTitleApp;
        var $itemTitle = $('#topSlider .content_list .owl-item:not(.cloned) .item_block .title');
        var html = '<div id="sliderTitle" class="sliderTitle owl-carousel owl-theme">';
        var topSliderApp = this.topSliderApp;
        $itemTitle.each(function (i, el) {
            // html += '<img src=' + $(el).data('thumb') + '>';
            html += '<p>' + $(el).text() + '</p>';
        });
        html += '</div>';

        topSliderTitleApp = $(html).appendTo($('#topSlider')).owlCarousel({
            center: false,
            loop: true,
            autoWidth: false,
            nav: false,
            responsive: false,
            animateOut: 'slideOutDown',
            animateIn: 'flipInX',
            items: 1,
            margin: 30,
            stagePadding: 30,
            dots: false,
            smartSpeed: 450
        });
        topSliderApp.on('changed.owl.carousel', function (event) {
            var item = event.item.index;
            topSliderTitleApp.trigger('to.owl.carousel', [item]);
        });
    },
    npostSlider: function npostSlider() {
        var npostSliderApp = $('#postSlider .tab_content').addClass('owl-carousel owl-theme').owlCarousel({
            center: false,
            items: 1,
            loop: false,
            autoWidth: false,
            responsive: false,
            nav: true,
            dots: false,
            smartSpeed: 800,
            navText: ['<i class="icon iconfont icon-back"></i>', '<i class="iconfont icon-more"></i>']
        });
        var npostSliderThumbApp = $('#postSlider .tab_button').addClass('owl-carousel owl-theme').owlCarousel({
            center: false,
            items: 3,
            loop: false,
            autoWidth: false,
            responsive: false,
            nav: false,
            dots: false,
            margin: 10
        });
        $('#postSlider .tab_button').find('.item_block[data-tab-index="0"]').addClass('current');
        npostSliderApp.on('changed.owl.carousel', function (event) {
            var item = event.item.index;
            var $buttons = $('#postSlider .tab_button').find('.item_block');
            npostSliderThumbApp.trigger('to.owl.carousel', [item]);
            $('#postSlider .tab_button').find('.item_block').removeClass('current');
            $buttons.eq(item).addClass('current');
        });
        $('#postSlider .tab_button').find('.owl-item').click(function () {
            var index = $(this).index();
            npostSliderApp.trigger('to.owl.carousel', [index]);
        });
    },
    postTabHiden: function postTabHiden() {
        var pos;
        if ($('#postSlider')[0]) {
            pos = $('#postSlider').offset().top + $('#postSlider').height();
        } else {
            $('.ff_postPage .conTabBtn').addClass('inPos');
            return;
        }
        tools.hideEl($('.ff_postPage .conTabBtn'), pos);
    },
    specialModule: function specialModule() {
        var $spaceModuleEl = $('.team_tabs');
        var specialModuleApp = $spaceModuleEl.find('.tab_content .content_list').addClass('owl-carousel owl-theme').owlCarouselPor({
            center: false,
            items: 2,
            loop: false,
            // autoWidth: false,
            // responsive: false,
            nav: true,
            dots: false,
            margin: 10,
            navText: ['<i class="icon iconfont icon-back"></i>', '<i class="iconfont icon-more"></i>']
        });
    },
    teamTabs: function teamTabs() {
        var teamTabsSliderApp = $('.ff_indexPage .team_tabs .tab_content .content_list').addClass('owl-carousel owl-theme').owlCarousel({
            center: false,
            items: 1,
            loop: false,
            autoWidth: false,
            responsive: false,
            nav: true,
            dots: false,
            smartSpeed: 800,
            navText: ['<i class="icon iconfont icon-back"></i>', '<i class="iconfont icon-more"></i>']
        });
        var tabButtons = $('.ff_indexPage .team_tabs .tab_button .item_block');

        var tabBtnApp = $('.ff_indexPage .team_tabs .tab_button .content_list').simpleSlider({
            dir: true
        });
        tabButtons.click(function () {
            var _this = this;
            var index = $(this).index();
            teamTabsSliderApp.trigger('to.owl.carousel', [index]);
        });

        teamTabsSliderApp.on('changed.owl.carousel', function (event) {
            var item = event.item.index;
            tabBtnApp.to(item);
        });
        tabBtnApp.el.on('change-simpleSlider', function (ev, infor) {});
    },
    teamTabsTwo: function teamTabsTwo() {
        var tabConApp = $('.ff_indexPage .team_tabs .tab_content .content_list').simpleSlider({
            style: "top"
            // items: 3
        });
        setTimeout(function () {

            $('.ff_indexPage .team_tabs .tab_content .content_list .item_block:gt(3)').removeClass('wow').css({
                'visibility': 'visible'
            });
        });
    },
    searchForm: function searchForm(option) {
        var onOffBtn = $('#search-nav .searchOnOff');

        var searchEv = {
            searchShow: function searchShow() {
                var search_e = this,
                    timer,
                    logoW = $('#headTop').outerWidth(true);

                onOffBtn.click(function () {

                    $('#navWrapper .nav').addClass('navShow');
                    $('#search-nav').addClass('navShow');
                    $('.bodyMask').addClass('open');
                    $('.searchGroup input').off().click(function (ev) {

                        ev.cancelBubble = true;
                        return false;
                    });
                    $('body').off().on({
                        'mousewheel.stopScroll': function mousewheelStopScroll() {
                            return false;
                        }
                    });
                    timer = setInterval(function () {
                        console.log($('#navWrapper .nav').find('.navitem').eq(0).css('opacity'));
                        if ($('#navWrapper .nav').find('.navitem').eq(0).css('opacity') <= 0.02) {
                            $('#navWrapper .nav').addClass('navStop');
                            if (option.type == 'LR') {
                                $('#search-nav').css({
                                    left: logoW
                                });
                            }
                            $('#search-nav').addClass('navStop').find('input').focus();
                            $('body').off().on({
                                'click.hideSearch': function clickHideSearch() {
                                    search_e.searchHide();
                                }
                            });

                            clearInterval(timer);
                        }
                    }, 100);
                });
            },
            searchHide: function searchHide() {
                var search_e = this,
                    time;
                $('#navWrapper .nav').addClass('navHide');
                $('#search-nav').addClass('navHide');
                $('.bodyMask').removeClass('open');
                $('body').off('mousewheel.stopScroll');
                $('body').off('click.hideSearch');
                if (option.type == 'LR') {
                    $('#search-nav').css({
                        left: 'auto'
                    });
                }
                timer = setInterval(function () {
                    if ($('#search-nav.navHide').css('opacity') >= 0.98) {
                        $('#navWrapper .nav').removeClass('navShow navStop navHide');
                        $('#search-nav').removeClass('navShow navStop navHide');
                        clearInterval(timer);
                    }
                }, 100);
            },
            searchNormal: function searchNormal() {
                onOffBtn.click(function () {
                    $('#search-nav').toggleClass('search-open');
                });
            }
        };

        switch (option.style) {
            case 'one':

                searchEv.searchShow();
                break;
            case 'two':

                searchEv.searchNormal();
                break;
            default:
                break;
        }
    },
    timeTurnEn: function timeTurnEn(el) {
        var monEnArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        $(el).addClass('showTime').find('.m').text(function () {
            return monEnArr[parseInt($(this).text())];
        });
    }
};

var selfTools = {
    bindPage: function bindPage(fn, pageList, parameter) {

        var fnName = fn.name;

        for (var i = 0; i < pageList.length; i++) {
            var doSome = fn;
            var item = pageList[i];

            YY.Page[item].prototype.things.push([doSome, parameter]);
        }
    },
    addStyle: function addStyle() {
        var newStyle = '<style id="ff_add">';
        for (var key in newStyleContent) {
            if (newStyleContent.hasOwnProperty(key)) {
                console.log(config, key);
                if (config[key].open) {
                    var style = newStyleContent[key];
                    newStyle += style;
                }
            }
        }
        newStyle += '</style>';
        $(newStyle).insertBefore($('link')[0]);
    }
};

var pageConfig = {
    list: ['indexMain', 'baseMain', 'postMain']
};

var config = {
    initThings: {
        open: true,
        page: ['indexMain'],
        fn: job.initThings
    },
    headerHover: {
        open: false,
        page: pageConfig.list,
        fn: job.headerHover
    },
    parallax: {
        open: false,
        page: ['indexMain'],
        fn: job.parallax,
        parameter: ['#topSlider .content_list']
    },
    parallaxPage: {
        open: false,
        page: ['baseMain'],
        fn: job.parallaxPage,
        parameter: ['.npagePage #banner div']
    },
    sliderDotThemb: {
        open: false,
        page: ['indexMain'],
        fn: job.sliderDotThemb
    },
    sliderDirThemb: {
        open: true,
        page: ['indexMain'],
        fn: job.sliderDirThemb,
        parameter: ['top']
    },
    sliderTitle: {
        open: true,
        page: ['indexMain'],
        fn: job.sliderTitle
    },
    npostSlider: {
        open: true,
        page: ['postMain'],
        fn: job.npostSlider
    },
    postTabHiden: {
        open: false,
        page: ['postMain'],
        fn: job.postTabHiden
    },
    specialModule: {
        open: false,
        page: ['indexMain'],
        fn: job.specialModule
    },
    teamTabs: {
        open: false,
        page: ['indexMain'],
        fn: job.teamTabs
    },
    teamTabsTwo: {
        open: true,
        page: ['indexMain'],
        fn: job.teamTabsTwo
    },
    searchForm: {
        open: true,
        page: pageConfig.list,
        fn: job.searchForm,
        parameter: [{
            style: 'two',
            type: 'LR'
        }]
    },
    timeTurnEn: {
        open: false,
        page: pageConfig.list,
        fn: job.timeTurnEn,
        parameter: ['.service .item_block .date_wrap']
    }
};

selfTools.addStyle();

(function () {

    for (var i = 0; i < pageConfig.list.length; i++) {
        var item = pageConfig.list[i];
        YY.Page[item].prototype.things = [];
        YY.Page[item].prototype.interfaceFun = function () {
            var _this = this;
            for (var i = 0; i < this.things.length; i++) {
                var fn = this.things[i][0];
                var arg = this.things[i][1];
                fn.apply(_this, arg);
            }
        };
    }

    for (var key in this.config) {
        if (this.config.hasOwnProperty(key)) {
            var val = this.config[key];
            if (val.open) {
                selfTools.bindPage(val.fn, val.page, val.parameter);
            }
        }
    }
})();