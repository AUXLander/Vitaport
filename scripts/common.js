var Book = /** @class */ (function () {
    function Book(element) {
        var _this = this;
        var rect = element.getBoundingClientRect();
        this.parent = element;
        this.background = element.querySelector('.bk__svg');
        this.top = rect.top;
        this.left = rect.left;
        this.width = rect.width;
        this.height = rect.height;
        element.addEventListener('mouseenter', function () {
            clearTimeout(_this.MouseLeaveDelay);
        });
        element.addEventListener('mousemove', function (e) {
            _this.mouseX = e.pageX - _this.left - _this.width / 2;
            _this.mouseY = e.pageY - _this.top - _this.height / 2;
            _this.stateChanged(_this);
        });
        element.addEventListener('mouseleave', function () {
            clearTimeout(_this.MouseLeaveDelay);
            _this.MouseLeaveDelay = setTimeout(function (book) {
                book.mouseX = 0;
                book.mouseY = 0;
                book.stateChanged(_this);
            }, 1000, _this);
        });
    }
    Book.prototype.stateChanged = function (book) {
        book.mousePX = book.mouseX / book.width;
        book.mousePY = book.mouseY / book.height;
        book.parent.style.transform = "rotateY(" + book.mousePX * 30 + "deg) rotateX(" + book.mousePY * -30 + "deg)";
        book.background.style.transform = "translateX(" + book.mousePX * -40 + "px) translateY(" + book.mousePY * -40 + "px)";
    };
    return Book;
}());
;
//var b = new Book(document.querySelector('.bk'));
var SearchInitEvent = function (search) {
    search.addEventListener('click', function (e) {
        var parent = e.currentTarget;
        if (parent.hasAttribute('data-search-target')) {
            var id = parent.getAttribute('data-search-target') + '';
            if (id != "null") {
                parent = document.querySelector("#" + id);
                if (!parent)
                    return;
            }
            else
                return;
        }
        else {
            while (!parent.hasAttribute('search-area')) {
                parent = parent.parentNode;
            }
        }
        parent.querySelectorAll('input[name="search"]').forEach(function (input) {
            input.focus();
        });
    });
};
var AddrInitEvent = function (addr) {
    var turns = addr.querySelectorAll('.addr__l_bgr > *');
    turns.forEach(function (turn) {
        turn.addEventListener('click', function () {
            addr.classList.toggle('pos-1');
            addr.classList.toggle('pos-2');
        });
    });
};
window.onload = function () {
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        speed: 300,
        loop: true,
        uniqueNavElements: true,
        autoplay: {
            delay: 5000
        },
        pagination: {
            el: '.swiper-bullets',
            type: 'bullets',
            clickable: true,
            renderBullet: function (index, className) {
                return "<span class=\"" + className + "\"></span>";
            }
        }
    });
    document.querySelectorAll('.search-target').forEach(SearchInitEvent);
    document.querySelectorAll('.addr.pos-1, .addr.pos-2').forEach(AddrInitEvent);
};
