// 手机


function tap($el, fn) {
    var haveMove = false;
    $el.on({
        'touchstart': function () {

        },
        'touchmove': function () {
            haveMove = true;
        },
        'touchend': function () {
            // alert(1);
            if (haveMove == false) {
                fn && fn($(this));
            }
        }
    })
}

function videomplay(area, item) {
    var $videoArea = area,
        $videoItem = item,
        videoLinks = [],
        videoInfor = [];


    function getSingle(fn) {
        var result;

        return function () {
            return result ? result : (result = fn.apply(this, arguments));
        };
    }

    var singleVBg = getSingle(createVideoBg);

    function createVideoBg(fn, obj) {

        var videoBg = $('<div class="videoBg" ></div>').appendTo($('body'));
        initObj = {
            showDo: function () {},
            hideDo: function () {}
        };
        $.extend(true, initObj, obj)

        function hide() {
            videoBg.trigger('hideDo');
            videoBg.animate({
                'opacity': 0
            }, 200, function () {
                $(this).hide();
            });
        }

        function show() {
            videoBg.show().animate({
                'opacity': 1
            }, 200, function () {

                videoBg.trigger('showDo');
            });

        }
        videoBg.on('click', function (ev) {
            if ($(ev.target).hasClass('vPlayArea')) {
                hide()
            }
        });
        fn && fn();
        return {
            bgJDOM: videoBg,
            hide: hide,
            show: show
        };
    }


    var Videom = function (config, cd) {
        var cb = cb || {};
        this.initDo = false;
        this.initConfig = {
            link: []
        };
        this.cb = {};
        $.extend(true, this.initConfig, config);
        $.extend(true, this.cb, cb);
    };

    Videom.prototype = {
        construct: Videom,
        init: function (box, infor) {
            var videoInfor, v = this,
                videoArea;

            if (typeof infor == 'number') {
                videoInfor = this.initConfig.list[infor];
            } else {
                videoInfor = {
                    videoLink: infor
                };
            }

            if (this.initDo == true) {
                this.tabTo(videoInfor);
                return;
            };

            this.initDo = true;
            var str = '<div class="vPlayArea">';

            str += '<div class="vPlayItem"> <video src="' + videoInfor.videoLink + '" controls="controls"> 您的浏览器不支持 video 标签。 </video> <div class="videoInfor"> <div class="videoHeader"> <p class="title"></p> <p class="subtitle"></p> </div> <div class="videoDes"> <p class="description"> </p> </div> </div> </div>';
            str += '</div>';


            $(str).on('click', function (ev) {
                ev.stopPropagation();
            });
            videoArea = $(str).appendTo(box);

            v.box = box;
            v.video = videoArea.find('video');
            v.inforBox = videoArea.find('.videoInfor');
            v.desBox = videoArea.find('.videoDes');
            v.videoDom = v.video[0];

            v._tabText(v.inforBox.find('.title'), videoInfor.title);
            v._tabText(v.inforBox.find('.subtitle'), videoInfor.subtitle);
            v._tabText(v.desBox.find('.description'), videoInfor.description);
            v._addControl(infor);
        },
        stop: function () {
            this.videoDom.pause();
        },
        play: function () {
            this.videoDom.play();
        },
        _addControl: function (num) {
            if (typeof num != 'number') return;
            var hasControl = false,
                v = this,
                prev, next, prevBtn, nextBtn;

            v.currentIndex = num;
            prev = {
                index: num - 1,
                className: (function () {
                    if (typeof v.initConfig.list[(num - 1)] == 'undefined') {
                        return 'disable';
                    } else {
                        return 'able';
                    }
                })()
            };
            next = {
                index: num + 1,
                className: (function () {
                    if (typeof v.initConfig.list[(num + 1)] == 'undefined') {
                        return 'disable';
                    } else {
                        return 'able';
                    }
                })()
            };

            if (hasControl) {

                prevBtn.data('index', prev.index).addClass(prev.className);
                nextBtn.data('index', next.index).addClass(next.className);
                return;
            }
            hasControl = true;

            var tabControlStr, tabControl;
            tabControlStr = '<div class="videoTabBtns"> <div class="videoTabBtn prev '+ prev.className +'" data-index="' + prev.index + '"> <p></p> <i class="icon"></i> </div> <div class="videoTabBtn next '+ next.className +'" data-index="'+ next.index +'"> <p></p> <i class="icon"></i> </div> </div>';


            tabControl = $(tabControlStr).appendTo(v.box);
            prevBtn = tabControl.find('.prev');
            nextBtn = tabControl.find('.next');

            tabControl.on('click', '.videoTabBtn', function (ev) {
                console.log(this);
                ev.stopPropagation();
                var btn = this;
                if ($(btn).hasClass('disable') == false) {

                    v.tabTo(v.initConfig.list[$(btn).data('index')]);
                }
                return false;
            });

            v.tabControl = tabControl;
        },
        tabTo: function (infor) {
            var initInfor = {
                index: 0,
                description: "",
                subtitle: "",
                title: "",
                videoLink: ""
            };
            $.extend(initInfor, infor);

            this._tabBtn(infor.index);
            this.video.attr('src', initInfor.videoLink);

            this._tabText(this.inforBox.find('.title'), initInfor.title);
            this._tabText(this.inforBox.find('.subtitle'), initInfor.subtitle);
            this._tabText(this.desBox.find('.description'), initInfor.description);
        },
        _tabBtn: function (index) {
            this._addControl(index);
        },
        _tabText: function (el, text) {
            if (typeof text == "undefined") {
                $(el).css({
                    display: "none"
                });
            } else {
                $(el).text(text);
            }
        },
        _bindEv: function (name, fn) {
            var _this = this;
            this.cb[name] = fn;
            $.each(_this.cb, function (indexInArray, valueOfElement) {

                $(_this).off(name).on(name, fn);
            });
        },
        _trigerEv: function (name, option) {

            if (typeof (this.cb[name]) != 'function') {
                this._bindEv(name, function () {});
            }
            $(this).trigger(name, option);
        },
    };

    $videoItem.each(function (i, e) {
        var infor = {};
        infor.index = i;
        infor.title = $(e).find('.item_info .title').text();
        infor.subtitle = $(e).find('.item_info .subtitle').text();
        infor.description = $(e).find('.description').text();
        infor.videoLink = $(e).data('href');
        videoInfor.push(infor);
        videoLinks.push($(e).data('href'));
    });

    console.log(videoInfor);
    var vPlayer = new Videom({
        list: videoInfor
    });


    $videoItem.on({
        'click.video': function () {
            var vBg = singleVBg(),
                mask = vBg.bgJDOM,
                link = $(this).data('href');

            index = $(this).data('index');

            if (typeof link == 'undefined') return;
            console.log(vBg.show());
            vBg.show();

            vPlayer.init(mask, index);
            mask.off('hideDo').on('hideDo', function () {
                vPlayer.stop();
            });
            mask.off('showDo').on('showDo', function () {
                vPlayer.play();
            });
        }
    });


};
$(function () {

    if ($('html').hasClass('agent-mobile')) {

        modo()
    } else {

        pcdo()
    }

    function modo() {
        function toFullVideo(videoDom) {

            if (videoDom.requestFullscreen) {

                return videoDom.requestFullScreen();

            } else if (videoDom.webkitRequestFullScreen) {

                return videoDom.webkitRequestFullScreen();

            } else if (videoDom.mozRequestFullScreen) {

                return videoDom.mozRequestFullScreen();
            } else {
                return videoDom.msRequestFullscreen();

            }

        }

        var $videoArea = $('.videom'),
            $videoItem = $('.videom .content_list .item_block .item_box'),
            videoLinks = [],
            videoPlay = $('.videom video');

    }

    function pcdo() {
        var str = '';
        videomplay($('.videom'), $('.videom .content_list .item_block'));
    }
});
