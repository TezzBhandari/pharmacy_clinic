(function($) {
    "use strict";
    /*=================================
              JS Index Here
          ==================================*/
    /*
          01. On Load Function
          02. Preloader
          03. Mobile Menu
          04. Sticky fix
          05. Scroll To Top
          06. Set Background Image Color & Mask
          07. Global Slider
          08. Slider Tab
          09. Custom Service Slider
          10. Ajax Contact Form
          11. Search Box Popup
          12. Popup Sidemenu
          13. Magnific Popup
          14. Section Position
          15. Hover Item
          16. Filter
          17. Counter Up
          18. Date Time Picker
          19. Shape Mockup
          20. Progress Bar Animation
          21. Countdown
          22. Indicator
          00. Woocommerce Toggle
          00. Right Click Disable
          */
    /*=================================
              JS Index End
          ==================================*/
    /*
      
        
      
          /*---------- 03. Mobile Menu ----------*/
    $.fn.thmobilemenu = function(options) {
        var opt = $.extend(
            {
                menuToggleBtn: ".th-menu-toggle",
                bodyToggleClass: "th-body-visible",
                subMenuClass: "th-submenu",
                subMenuParent: "th-item-has-children",
                subMenuParentToggle: "th-active",
                meanExpandClass: "th-mean-expand",
                appendElement: '<span class="th-mean-expand"></span>',
                subMenuToggleClass: "th-open",
                toggleSpeed: 400,
            },
            options,
        );

        return this.each(function() {
            var menu = $(this);

            function menuToggle() {
                menu.toggleClass(opt.bodyToggleClass);

                var subMenu = "." + opt.subMenuClass;
                $(subMenu).each(function() {
                    if ($(this).hasClass(opt.subMenuToggleClass)) {
                        $(this).removeClass(opt.subMenuToggleClass);
                        $(this).css("display", "none");
                        $(this).parent().removeClass(opt.subMenuParentToggle);
                    }
                });
            }

            menu.find("li").each(function() {
                var submenu = $(this).find("ul");
                submenu.addClass(opt.subMenuClass);
                submenu.css("display", "none");
                submenu.parent().addClass(opt.subMenuParent);
                submenu.prev("a").append(opt.appendElement);
                submenu.next("a").append(opt.appendElement);
            });

            function toggleDropDown($element) {
                var $parent = $($element).parent();
                var $siblings = $parent.siblings();

                $siblings.removeClass(opt.subMenuParentToggle);
                $siblings
                    .find("ul")
                    .slideUp(opt.toggleSpeed)
                    .removeClass(opt.subMenuToggleClass);

                $parent.toggleClass(opt.subMenuParentToggle);
                $($element)
                    .next("ul")
                    .slideToggle(opt.toggleSpeed)
                    .toggleClass(opt.subMenuToggleClass);
            }

            var expandToggler = "." + opt.meanExpandClass;
            $(expandToggler).each(function() {
                $(this).on("click", function(e) {
                    e.preventDefault();
                    toggleDropDown($(this).parent());
                });
            });

            $(opt.menuToggleBtn).each(function() {
                $(this).on("click", function() {
                    menuToggle();
                });
            });

            menu.on("click", function(e) {
                e.stopPropagation();
                menuToggle();
            });

            menu.find("div").on("click", function(e) {
                e.stopPropagation();
            });
        });
    };

    $(".th-menu-wrapper").thmobilemenu();

    /*---------- 04. Sticky fix ----------*/
    $(window).scroll(function() {
        var topPos = $(this).scrollTop();
        if (topPos > 500) {
            $(".sticky-wrapper").addClass("sticky");
            $(".category-menu").addClass("close-category");
        } else {
            $(".sticky-wrapper").removeClass("sticky");
            $(".category-menu").removeClass("close-category");
        }
    });

    /*---------- 05. Scroll To Top ----------*/
    if ($(".scroll-top").length > 0) {
        var scrollTopbtn = document.querySelector(".scroll-top");
        var progressPath = document.querySelector(".scroll-top path");
        var pathLength = progressPath.getTotalLength();
        progressPath.style.transition = progressPath.style.WebkitTransition =
            "none";
        progressPath.style.strokeDasharray = pathLength + " " + pathLength;
        progressPath.style.strokeDashoffset = pathLength;
        progressPath.getBoundingClientRect();
        progressPath.style.transition = progressPath.style.WebkitTransition =
            "stroke-dashoffset 10ms linear";
        var updateProgress = function() {
            var scroll = $(window).scrollTop();
            var height = $(document).height() - $(window).height();
            var progress = pathLength - (scroll * pathLength) / height;
            progressPath.style.strokeDashoffset = progress;
        };
        updateProgress();
        $(window).scroll(updateProgress);
        var offset = 50;
        var duration = 750;
        jQuery(window).on("scroll", function() {
            if (jQuery(this).scrollTop() > offset) {
                jQuery(scrollTopbtn).addClass("show");
            } else {
                jQuery(scrollTopbtn).removeClass("show");
            }
        });
        jQuery(scrollTopbtn).on("click", function(event) {
            event.preventDefault();
            jQuery("html, body").animate({ scrollTop: 0 }, duration);
            return false;
        });
    }

    /*---------- 06. Set Background Image Color & Mask ----------*/
    if ($("[data-bg-src]").length > 0) {
        $("[data-bg-src]").each(function() {
            var src = $(this).attr("data-bg-src");
            $(this).css("background-image", "url(" + src + ")");
            $(this).removeAttr("data-bg-src").addClass("background-image");
        });
    }

    if ($("[data-bg-color]").length > 0) {
        $("[data-bg-color]").each(function() {
            var color = $(this).attr("data-bg-color");
            $(this).css("background-color", color);
            $(this).removeAttr("data-bg-color");
        });
    }

    if ($("[data-mask-src]").length > 0) {
        $("[data-mask-src]").each(function() {
            var mask = $(this).attr("data-mask-src");
            $(this).css({
                "mask-image": "url(" + mask + ")",
                "-webkit-mask-image": "url(" + mask + ")",
            });
            $(this).addClass("bg-mask");
            $(this).removeAttr("data-mask-src");
        });
    }

    /*----------- 07. Global Slider ----------*/

    $(".th-slider").each(function() {
        var thSlider = $(this);
        var settings = $(this).data("slider-options");

        // Store references to the navigation Slider
        var prevArrow = thSlider.find(".slider-prev");
        var nextArrow = thSlider.find(".slider-next");
        var paginationEl = thSlider.find(".slider-pagination");

        var autoplayconditon = settings["autoplay"];

        var sliderDefault = {
            slidesPerView: 1,
            spaceBetween: settings["spaceBetween"] ? settings["spaceBetween"] : 24,
            loop: settings["loop"] == false ? false : true,
            speed: settings["speed"] ? settings["speed"] : 1000,
            autoplay: autoplayconditon
                ? autoplayconditon
                : { delay: 6000, disableOnInteraction: false },
            navigation: {
                nextEl: nextArrow.get(0),
                prevEl: prevArrow.get(0),
            },
            pagination: {
                el: paginationEl.get(0),
                clickable: true,
                renderBullet: function(index, className) {
                    return (
                        '<span class="' +
                        className +
                        '" aria-label="Go to Slide ' +
                        (index + 1) +
                        '"></span>'
                    );
                },
            },
        };

        var options = JSON.parse(thSlider.attr("data-slider-options"));
        options = $.extend({}, sliderDefault, options);
        var swiper = new Swiper(thSlider.get(0), options); // Assign the swiper variable

        if ($(".slider-area").length > 0) {
            $(".slider-area").closest(".container").parent().addClass("arrow-wrap");
        }
    });

    // Function to add animation classes
    function animationProperties() {
        $("[data-ani]").each(function() {
            var animationName = $(this).data("ani");
            $(this).addClass(animationName);
        });

        $("[data-ani-delay]").each(function() {
            var delayTime = $(this).data("ani-delay");
            $(this).css("animation-delay", delayTime);
        });
    }
    animationProperties();

    // Add click event handlers for external slider arrows based on data attributes
    $("[data-slider-prev], [data-slider-next]").on("click", function() {
        var sliderSelector =
            $(this).data("slider-prev") || $(this).data("slider-next");
        var targetSlider = $(sliderSelector);

        if (targetSlider.length) {
            var swiper = targetSlider[0].swiper;

            if (swiper) {
                if ($(this).data("slider-prev")) {
                    swiper.slidePrev();
                } else {
                    swiper.slideNext();
                }
            }
        }
    });

    /*-------------- 08. Slider Tab -------------*/
    $.fn.activateSliderThumbs = function(options) {
        var opt = $.extend(
            {
                sliderTab: false,
                tabButton: ".tab-btn",
            },
            options,
        );

        return this.each(function() {
            var $container = $(this);
            var $thumbs = $container.find(opt.tabButton);
            var $line = $('<span class="indicator"></span>').appendTo($container);

            var sliderSelector = $container.data("slider-tab");
            var $slider = $(sliderSelector);

            var swiper = $slider[0].swiper;

            $thumbs.on("click", function(e) {
                e.preventDefault();
                var clickedThumb = $(this);

                clickedThumb.addClass("active").siblings().removeClass("active");
                linePos(clickedThumb, $container);

                if (opt.sliderTab) {
                    var slideIndex = clickedThumb.index();
                    swiper.slideTo(slideIndex);
                }
            });

            if (opt.sliderTab) {
                swiper.on("slideChange", function() {
                    var activeIndex = swiper.realIndex;
                    var $activeThumb = $thumbs.eq(activeIndex);

                    $activeThumb.addClass("active").siblings().removeClass("active");
                    linePos($activeThumb, $container);
                });

                var initialSlideIndex = swiper.activeIndex;
                var $initialThumb = $thumbs.eq(initialSlideIndex);
                $initialThumb.addClass("active").siblings().removeClass("active");
                linePos($initialThumb, $container);
            }

            function linePos($activeThumb) {
                var thumbOffset = $activeThumb.position();

                var marginTop = parseInt($activeThumb.css("margin-top")) || 0;
                var marginLeft = parseInt($activeThumb.css("margin-left")) || 0;

                $line.css("--height-set", $activeThumb.outerHeight() + "px");
                $line.css("--width-set", $activeThumb.outerWidth() + "px");
                $line.css("--pos-y", thumbOffset.top + marginTop + "px");
                $line.css("--pos-x", thumbOffset.left + marginLeft + "px");
            }
        });
    };

    if ($(".hero-thumb").length) {
        $(".hero-thumb").activateSliderThumbs({
            sliderTab: true,
            tabButton: ".tab-btn",
        });
    }

    /*-------------- 09. Custom Service Slider -------------*/
    $(".service-list-wrap").on("click", function() {
        $(this).addClass("active").siblings().removeClass("active");
    });
    function showNextService() {
        var $activeService = $(".service-list-area .service-list-wrap.active");
        if ($activeService.next().length > 0) {
            $activeService.removeClass("active");
            $activeService.next().addClass("active");
        } else {
            $activeService.removeClass("active");
            $(".service-list-area .service-list-wrap:first").addClass("active");
        }
    }

    function showPreviousService() {
        var $activeService = $(".service-list-area .service-list-wrap.active");
        if ($activeService.prev().length > 0) {
            $activeService.removeClass("active");
            $activeService.prev().addClass("active");
        } else {
            $activeService.removeClass("active");
            $(".service-list-area .service-list-wrap:last").addClass("active");
        }
    }
    $(".service-prev").on("click", function() {
        showPreviousService();
    });
    $(".service-next").on("click", function() {
        showNextService();
    });

    /*----------- 13. Magnific Popup ----------*/
    /* magnificPopup img view */
    $(".popup-image").magnificPopup({
        type: "image",
        mainClass: "mfp-zoom-in",
        removalDelay: 260,
        gallery: {
            enabled: true,
        },
    });

    /* magnificPopup video view */
    $(".popup-video").magnificPopup({
        type: "iframe",
    });

    /* magnificPopup video view */
    $(".popup-content").magnificPopup({
        type: "inline",
        midClick: true,
    });

    /*---------- 14. Section Position ----------*/
    // Interger Converter
    function convertInteger(str) {
        return parseInt(str, 10);
    }

    $.fn.sectionPosition = function(mainAttr, posAttr) {
        $(this).each(function() {
            var section = $(this);

            function setPosition() {
                var sectionHeight = Math.floor(section.height() / 2), // Main Height of section
                    posData = section.attr(mainAttr), // where to position
                    posFor = section.attr(posAttr), // On Which section is for positioning
                    topMark = "top-half", // Pos top
                    bottomMark = "bottom-half", // Pos Bottom
                    parentPT = convertInteger($(posFor).css("padding-top")), // Default Padding of  parent
                    parentPB = convertInteger($(posFor).css("padding-bottom")); // Default Padding of  parent

                if (posData === topMark) {
                    $(posFor).css("padding-bottom", parentPB + sectionHeight + "px");
                    section.css("margin-top", "-" + sectionHeight + "px");
                } else if (posData === bottomMark) {
                    $(posFor).css("padding-top", parentPT + sectionHeight + "px");
                    section.css("margin-bottom", "-" + sectionHeight + "px");
                }
            }
            setPosition(); // Set Padding On Load
        });
    };

    var postionHandler = "[data-sec-pos]";
    if ($(postionHandler).length) {
        $(postionHandler).imagesLoaded(function() {
            $(postionHandler).sectionPosition("data-sec-pos", "data-pos-for");
        });
    }

    /*----------- 15. Hover Item ----------*/
    $(".hover-item").hover(function() {
        $(this).addClass("item-active");
        $(this).siblings().removeClass("item-active");
    });

    /*----------- 16. Filter ----------*/
    $(".filter-active").imagesLoaded(function() {
        var $filter = ".filter-active",
            $filterItem = ".filter-item",
            $filterMenu = ".filter-menu-active";

        if ($($filter).length > 0) {
            var $grid = $($filter).isotope({
                itemSelector: $filterItem,
                filter: "*",
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    // columnWidth: 1,
                },
            });

            // filter items on button click
            $($filterMenu).on("click", "button", function() {
                var filterValue = $(this).attr("data-filter");
                $grid.isotope({
                    filter: filterValue,
                });
            });

            // Menu Active Class
            $($filterMenu).on("click", "button", function(event) {
                event.preventDefault();
                $(this).addClass("active");
                $(this).siblings(".active").removeClass("active");
            });
        }
    });

    $(".masonary-active, .woocommerce-Reviews .comment-list").imagesLoaded(
        function() {
            var $filter = ".masonary-active, .woocommerce-Reviews .comment-list",
                $filterItem = ".filter-item, .woocommerce-Reviews .comment-list li";

            if ($($filter).length > 0) {
                $($filter).isotope({
                    itemSelector: $filterItem,
                    filter: "*",
                    masonry: {
                        // use outer width of grid-sizer for columnWidth
                        columnWidth: 1,
                    },
                });
            }
            $('[data-bs-toggle="tab"]').on("shown.bs.tab", function(e) {
                $($filter).isotope({
                    filter: "*",
                });
            });
        },
    );

    /*----------- 17. Counter Up ----------*/
    $(".counter-number").counterUp({
        delay: 10,
        time: 1000,
    });

    /*----------- 18. Date Time Picker ----------*/
    // Only Date Picker
    $(".date-pick").datetimepicker({
        timepicker: false,
        datepicker: true,
        format: "d-m-y",
        step: 10,
    });

    // Only Time Picker
    $(".time-pick").datetimepicker({
        datepicker: false,
        format: "H:i",
        step: 30,
    });

    /*----------- 19. Shape Mockup ----------*/
    $.fn.shapeMockup = function() {
        var $shape = $(this);
        $shape.each(function() {
            var $currentShape = $(this),
                shapeTop = $currentShape.data("top"),
                shapeRight = $currentShape.data("right"),
                shapeBottom = $currentShape.data("bottom"),
                shapeLeft = $currentShape.data("left");
            $currentShape
                .css({
                    top: shapeTop,
                    right: shapeRight,
                    bottom: shapeBottom,
                    left: shapeLeft,
                })
                .removeAttr("data-top")
                .removeAttr("data-right")
                .removeAttr("data-bottom")
                .removeAttr("data-left")
                .parent()
                .addClass("shape-mockup-wrap");
        });
    };

    if ($(".shape-mockup")) {
        $(".shape-mockup").shapeMockup();
    }

    /*----------- 20. Progress Bar Animation ----------*/
    $(".progress-bar").waypoint(
        function() {
            $(".progress-bar").css({
                animation: "animate-positive 1.8s",
                opacity: "1",
            });
        },
        { offset: "75%" },
    );

    /*----------- 21. Countdown ----------*/

    $.fn.countdown = function() {
        $(this).each(function() {
            var $counter = $(this),
                countDownDate = new Date($counter.data("offer-date")).getTime(), // Set the date we're counting down toz
                exprireCls = "expired";

            // Finding Function
            function s$(element) {
                return $counter.find(element);
            }

            // Update the count down every 1 second
            var counter = setInterval(function() {
                // Get today's date and time
                var now = new Date().getTime();

                // Find the distance between now and the count down date
                var distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                );
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Check If value is lower than ten, so add zero before number
                days < 10 ? (days = "0" + days) : null;
                hours < 10 ? (hours = "0" + hours) : null;
                minutes < 10 ? (minutes = "0" + minutes) : null;
                seconds < 10 ? (seconds = "0" + seconds) : null;

                // If the count down is over, write some text
                if (distance < 0) {
                    clearInterval(counter);
                    $counter.addClass(exprireCls);
                    $counter.find(".message").css("display", "block");
                } else {
                    // Output the result in elements
                    s$(".day").html(days);
                    s$(".hour").html(hours);
                    s$(".minute").html(minutes);
                    s$(".seconds").html(seconds);
                }
            }, 1000);
        });
    };

    if ($(".counter-list").length) {
        $(".counter-list").countdown();
    }

    /*----------- 22. Indicator ----------*/
    // Indicator
    $.fn.indicator = function() {
        // Loop through each .indicator-active element
        $(this).each(function() {
            var $menu = $(this),
                $linkBtn = $menu.find("a"),
                $btn = $menu.find("button");

            // Append indicator
            $menu.append('<span class="indicator"></span>');
            var $line = $menu.find(".indicator");

            // Check which type button is Available
            var $currentBtn;
            if ($linkBtn.length) {
                $currentBtn = $linkBtn;
            } else if ($btn.length) {
                $currentBtn = $btn;
            }

            // On Click Button Class Remove
            $currentBtn.on("click", function(e) {
                e.preventDefault();
                $(this).addClass("active");
                $(this).siblings(".active").removeClass("active");
                linePos();
            });

            // Indicator Position
            function linePos() {
                var $btnActive = $menu.find(".active"),
                    $height = $btnActive.css("height"),
                    $width = $btnActive.css("width"),
                    $top = $btnActive.position().top + "px",
                    $left = $btnActive.position().left + "px";

                $(window).on("resize", function() {
                    ($top = $btnActive.position().top + "px"),
                        ($left = $btnActive.position().left + "px");
                });

                $line.get(0).style.setProperty("--height-set", $height);
                $line.get(0).style.setProperty("--width-set", $width);
                $line.get(0).style.setProperty("--pos-y", $top);
                $line.get(0).style.setProperty("--pos-x", $left);
            }

            linePos();
            $(window).on("resize", function() {
                linePos();
            });
        });
    };

    if ($(".indicator-active").length) {
        $(".indicator-active").indicator();
    }
})(jQuery);
