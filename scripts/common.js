var SearchInitEvent = function (search) {
    search.addEventListener("click", function (e) {
        var parent = e.currentTarget;
        if (parent.hasAttribute("data-search-target")) {
            var id = parent.getAttribute("data-search-target") + "";
            if (id != "null") {
                parent = document.querySelector("#" + id);
                if (!parent) {
                    return;
                }
            }
            else {
                return;
            }
        }
        else {
            while (!parent.hasAttribute("search-area")) {
                parent = parent.parentNode;
            }
        }
        parent.querySelectorAll("input[name=search]").forEach(function (input) {
            input.focus();
        });
    });
};
var GOUpButton;
var ArrowUpInit = function () {
    var windowInnerOffset = window.outerHeight - document.documentElement.offsetHeight;
    if (Math.abs(windowInnerOffset) > 300) {
        GOUpButton = document.createElement("button");
        GOUpButton.classList.add("goup", "btn");
        var span = document.createElement("span");
        span.innerText = "Вверх";
        GOUpButton.appendChild(span);
        GOUpButton.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
        document.body.appendChild(GOUpButton);
    }
};
var AddrInitEvent = function (addr) {
    var turns = addr.querySelectorAll(".addr__l_bgr > *");
    turns.forEach(function (turn) {
        turn.addEventListener("click", function () {
            addr.classList.toggle("pos-1");
            addr.classList.toggle("pos-2");
        });
    });
};
var MobileMenuInitEvent = function (menu) {
    menu.addEventListener("click", function (e) {
        var menu = e.currentTarget;
        if (menu) {
            menu.classList.toggle("active");
        }
    });
    document.body.addEventListener("click", function (e) {
        var target = e.target;
        if (target) {
            var isBody = (target == document.body);
            var isChild = target.parentElement.contains(menu);
            if (!isChild || isBody) {
                menu.classList.remove("active");
            }
        }
    });
};
var WindowResizeEvent = function () {
    document.querySelectorAll(".addr").forEach(function (addr) {
        var style = document.body.querySelector("style");
        if (style) {
            var rect = addr.getBoundingClientRect();
            style.innerHTML = ":root{--width-addr:" + rect.width + "px}";
        }
    });
};
var MosaicTabInitEvent = function (tab) {
    tab.addEventListener("click", function (e) {
        var close = e.target.classList.contains("pnl__cls");
        if (e.currentTarget == e.target || e.currentTarget == e.target.parentElement || close) {
            var target = e.currentTarget;
            if (close) {
                isOpenedMosaic = false;
                target.classList.remove("active");
            }
            else {
                if (isOpenedMosaic) {
                    var mosaic = target.parentElement;
                    var actives = mosaic.querySelectorAll(".mosaic__tab.active");
                    actives.forEach(function (tab) {
                        tab.style.zIndex = "0";
                        tab.style.opacity = ".5";
                        setTimeout(function (tab) {
                            tab.style.cssText = null;
                            tab.classList.remove("active");
                        }, 350, tab);
                    });
                    isOpenedMosaic = !isOpenedMosaic;
                }
                isOpenedMosaic = true;
                target.classList.add("active");
            }
        }
    });
};
var FigureInit = function () {
    var vec = [document.createElement('img'), document.createElement('img'), document.createElement('img')];
    var footer = document.body.getElementsByTagName('footer')[0];
    vec.forEach(function (vec, index) {
        vec.classList.add('vec-image-background');
        vec.src = "img/svg/vec-" + (index + 1).toFixed() + ".svg";
        vec.alt = "#";
        vec.style.zIndex = "-1";
        document.body.appendChild(vec);
    });
    var bodyRect = document.body.getBoundingClientRect();
    var footerRect = footer.getBoundingClientRect();
    vec[0].style.top = ((bodyRect.height - 400) / 2).toFixed() + "px";
    vec[0].style.left = "0";
    vec[1].style.top = ((bodyRect.height - 600) / 2).toFixed() + "px";
    vec[1].style.right = "0";
    vec[2].style.top = (bodyRect.height - footerRect.height - 276).toFixed() + "px";
    vec[2].style.right = "0";
};
var isOpenedMosaic = false;
window.onload = function () {
    document.body.appendChild(document.createElement("style"));
    if (window.innerWidth <= 768) {
        window.onresize = WindowResizeEvent;
        WindowResizeEvent();
    }
    var mySwiper = new Swiper(".swiper-container", {
        direction: "horizontal",
        speed: 300,
        loop: true,
        uniqueNavElements: true,
        autoplay: {
            delay: 5000
        },
        pagination: {
            el: ".swiper-bullets",
            type: "bullets",
            clickable: true,
            renderBullet: function (index, className) {
                return "<svg class=\"progress " + className + "\"><circle r=\"50\" cx=\"150\" cy=\"80\"/></svg>";
                //return `<span class=""></span>`;
            }
        }
    });
    document.querySelectorAll(".search-target").forEach(SearchInitEvent);
    document.querySelectorAll(".addr.pos-1, .addr.pos-2").forEach(AddrInitEvent);
    document.querySelectorAll(".brgr-menu").forEach(MobileMenuInitEvent);
    document.querySelectorAll(".mosaic__tab").forEach(MosaicTabInitEvent);
    //ArrowUpInit()
    FigureInit();
};
