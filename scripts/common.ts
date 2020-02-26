class Book {
    top;
    left;
    width;
    height;
    mouseX;
    mouseY;
    mousePX;
    mousePY;
    MouseLeaveDelay;

    parent      : HTMLDivElement;
    background  : HTMLDivElement;

    constructor(element : HTMLDivElement) {
        let rect        : DOMRect   = element.getBoundingClientRect();
        this.parent                 = element;
        this.background             = element.querySelector('.bk__svg')

        this.top                    = rect.top;
        this.left                   = rect.left;
        this.width                  = rect.width;
        this.height                 = rect.height

        element.addEventListener('mouseenter',  () => {
            clearTimeout(this.MouseLeaveDelay);
        });

        element.addEventListener('mousemove',   (e : MouseEvent) => {
            this.mouseX = e.pageX - this.left - this.width / 2;
            this.mouseY = e.pageY - this.top - this.height / 2;
            this.stateChanged(this);
        });

        element.addEventListener('mouseleave',  () => {
            clearTimeout(this.MouseLeaveDelay);
            this.MouseLeaveDelay = setTimeout((book : Book) => {
                book.mouseX = 0;
                book.mouseY = 0;
                book.stateChanged(this);
            }, 1000, this);
        });
    }

    stateChanged(book : Book) {
        book.mousePX = book.mouseX / book.width;
        book.mousePY = book.mouseY / book.height;

        book.parent.style.transform     = `rotateY(${book.mousePX * 30}deg) rotateX(${book.mousePY * -30}deg)`;
        book.background.style.transform = `translateX(${book.mousePX * -40}px) translateY(${book.mousePY * -40}px)`;
    }
};

//var b = new Book(document.querySelector('.bk'));

const SearchInitEvent = (search : HTMLElement) => {
    
    search.addEventListener('click', (e : MouseEvent) => {
        let parent : HTMLElement = (e.currentTarget as any);
        if(parent.hasAttribute('data-search-target')) {
            const id : string = parent.getAttribute('data-search-target') + '';
            if(id != "null") {
                parent = document.querySelector(`#${id}`);
                if(!parent) return;
            }
            else return;    
        }
        else {
            while(!parent.hasAttribute('search-area')){
                parent = parent.parentNode as HTMLElement;
            }
        }
        
        parent.querySelectorAll('input[name="search"]').forEach((input : HTMLInputElement) => {
            input.focus();
        });
    })
}

window.onload = () => {
    var mySwiper = new Swiper ('.swiper-container', {
        direction         : 'horizontal',
        speed             : 300,
        loop              : true,
        uniqueNavElements : true,

        autoplay: {
            delay: 5000,
        },

        pagination: {
            el: '.swiper-bullets',
            type: 'bullets',
            clickable: true,
            renderBullet: (index, className) => {
                return `<span class="${className}"></span>`;
            },
        }
    });


    document.querySelectorAll('.search-target').forEach(SearchInitEvent);
};