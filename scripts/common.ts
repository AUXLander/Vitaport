const SearchInitEvent = (search : HTMLElement) => {
    search.addEventListener("click", (e : MouseEvent) => {
        let parent : HTMLElement = (e.currentTarget as any);
        if(parent.hasAttribute("data-search-target")) {
            const id : string = parent.getAttribute("data-search-target") + "";
            if(id != "null") {
                parent = document.querySelector(`#${id}`);
                if(!parent) {
                    return;
                }
            }
            else {
                return;
            }
        }
        else {
            while(!parent.hasAttribute("search-area")){
                parent = parent.parentNode as HTMLElement;
            }
        }
        
        parent.querySelectorAll("input[name=search]").forEach((input : HTMLInputElement) => {
            input.focus();
        });
    })
}

var GOUpButton : HTMLButtonElement;
const ArrowUpInit = () => {
    let windowInnerOffset = window.outerHeight - document.documentElement.offsetHeight;
    if(Math.abs(windowInnerOffset) > 300) {
        GOUpButton = document.createElement("button");
        GOUpButton.classList.add("goup", "btn");

        const span : HTMLSpanElement = document.createElement("span");
        span.innerText = "Вверх";

        GOUpButton.appendChild(span);

        GOUpButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        document.body.appendChild(GOUpButton);
        ArrowDocumentScrollEvent();
        GOUpButton.style.opacity = "0";
    }

    document.addEventListener('scroll', ArrowDocumentScrollEvent)
}

const ArrowDocumentScrollEvent = () => {
    GOUpButton.style.transform = document.documentElement.scrollTop > 300 ? "translateY(0)" : "translateY(-50vh)";
    GOUpButton.style.opacity = document.documentElement.scrollTop > 300 ? "1" : "0";
}

const AddrInitEvent = (addr : HTMLElement) => {
    const turns = addr.querySelectorAll(".addr__l_bgr > *");
    turns.forEach((turn : HTMLElement) => {
        turn.addEventListener("click", () => {
            addr.classList.toggle("pos-1");
            addr.classList.toggle("pos-2");
        });
    });
}

const MobileMenuInitEvent = (menu : HTMLElement) => {
    menu.addEventListener("click", (e : MouseEvent) => {
        const menu : HTMLElement = <HTMLElement>e.currentTarget;
        if(menu) {
            menu.classList.toggle("active");
        }
    });
    document.body.addEventListener("click", (e: MouseEvent) => {
        let target  : HTMLElement | null  = e.target as HTMLElement;
        if(target) {
            let isBody  : boolean = (target == document.body);
            let isChild : boolean = target.parentElement.contains(menu);
            if(!isChild || isBody) {
                menu.classList.remove("active");
            }
        }
    });
}

const WindowResizeEvent = () => {
    document.querySelectorAll(".addr").forEach((addr : HTMLElement) => {
        let style  : HTMLStyleElement = document.body.querySelector("style");
        if(style) {
            const rect : DOMRect = addr.getBoundingClientRect();
            style.innerHTML = `:root{--width-addr:${rect.width}px}`;
        }
    });
}

const MosaicTabInitEvent = (tab : HTMLElement) => {
    tab.addEventListener("click", (e : MouseEvent) => {
        const close : boolean = (e.target as HTMLElement).classList.contains("pnl__cls");
        if(e.currentTarget == e.target || e.currentTarget == (<HTMLElement>e.target).parentElement || close) {
            const target : HTMLElement = (<HTMLElement>e.currentTarget);
            
            if(close) {
                isOpenedMosaic = false;
                target.classList.remove("active");
            }
            else {
                if(isOpenedMosaic) {
                    const mosaic : HTMLElement = target.parentElement;
                    const actives: NodeListOf<HTMLElement> = mosaic.querySelectorAll(".mosaic__tab.active");
                    actives.forEach((tab: HTMLElement) => {
                        tab.style.zIndex  = "0";
                        tab.style.opacity = ".5";
                        setTimeout((tab) => {
                            tab.style.cssText = null;
                            tab.classList.remove("active");
                        }, 550, tab)
                    });
                    isOpenedMosaic = !isOpenedMosaic;
                }
    
                isOpenedMosaic = true;
                target.classList.add("active");
            }
        }
    });
}

const FigureInit = () => {
    const vec     : HTMLImageElement[] = [document.createElement('img'),document.createElement('img'),document.createElement('img')];
    const footer  : HTMLElement        = document.body.getElementsByTagName('footer')[0];

    vec.forEach((vec : HTMLImageElement, index : number) => {
        vec.classList.add('vec-image-background');
        vec.src = "img/svg/vec-" + (index + 1).toFixed() + ".svg";
        vec.alt = "#";
        vec.style.zIndex = "-1";

        document.body.appendChild(vec);
    });

    const bodyRect   : DOMRect      = document.body.getBoundingClientRect();
    const footerRect : DOMRect      = footer.getBoundingClientRect();

    vec[0].style.top = ((bodyRect.height - 400) / 2).toFixed() + "px";
    vec[0].style.left = "0";

    vec[1].style.top = ((bodyRect.height - 600) / 2).toFixed() + "px";
    vec[1].style.right = "0";

    vec[2].style.top = (bodyRect.height - footerRect.height - 276).toFixed() + "px";
    vec[2].style.right = "0";
}

var documentHeader : HTMLElement;
var previousDocumentScrollValue : number = 0;
var previousDocumentScrollState : boolean = false;
const MobileHeaderEvent = () => {
    let currentDocumentScrollState = previousDocumentScrollValue > document.documentElement.scrollTop;
    if(currentDocumentScrollState != previousDocumentScrollState) {
        previousDocumentScrollState = currentDocumentScrollState;
        documentHeader.style.transform = previousDocumentScrollState ? "translateY(0)" : "translateY(-100%)";
    }
    previousDocumentScrollValue = document.documentElement.scrollTop;
}

const MobileHeaderInit = () => {
    if(window.innerWidth < 550 && !!documentHeader) {
        document.addEventListener('scroll', MobileHeaderEvent)
    }
}

const ArticleParser = () => {
    if(document.querySelectorAll('article.artcl').length) {
        ArrowUpInit();

        document.querySelectorAll('table').forEach((table : HTMLTableElement) => {
            let wrap : HTMLDivElement = document.createElement('div');
            wrap.classList.add('artcl__scrll');
            wrap.appendChild(table.cloneNode(true));
    
            table.parentElement.replaceChild(wrap, table);
        });
    
        document.querySelectorAll('article .inside-wrapper > *').forEach(element => element.setAttribute('data-aos','fade-up'));
    }
}

AOS.init({
    startEvent: 'DOMContentLoaded',
    once: true
});

var isOpenedMosaic = false;
window.onload = () => {
    documentHeader = document.querySelector('header');
    document.body.appendChild(document.createElement("style"));
    
    if(window.innerWidth <= 768) {
        window.onresize = WindowResizeEvent;
        WindowResizeEvent();
    }

    var mySwiper = new Swiper (".swiper-container", {
        direction         : "horizontal",
        speed             : 300,
        loop              : true,
        uniqueNavElements : true,

        autoplay: {
            delay: 2800,
        },

        pagination: {
            el: ".swiper-bullets",
            type: "bullets",
            clickable: true,
            renderBullet: (index, className) => {
                //return `<img class="${className}" src="img/svg/progress.svg"/>`
                return `
                    <svg class="${className}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="isolation:isolate" viewBox="0 0 22 22" width="22px" height="22px">
                        <circle class="progress" vector-effect="non-scaling-stroke" cx="11" cy="11" r="10" fill="none" stroke-width="2" stroke="#FFF" stroke-linejoin="miter" stroke-linecap="square" stroke-miterlimit="3"/>
                        <circle vector-effect="non-scaling-stroke" cx="11" cy="11" r="4" fill="#FFF"/>
                    </svg>`;
                //return `<span class=""></span>`;
            },
        }
    });


    document.querySelectorAll(".search-target").forEach(SearchInitEvent);
    document.querySelectorAll(".addr.pos-1, .addr.pos-2").forEach(AddrInitEvent);
    document.querySelectorAll(".brgr-menu").forEach(MobileMenuInitEvent);
    document.querySelectorAll(".mosaic__tab").forEach(MosaicTabInitEvent);

    FigureInit();
    ArticleParser();
    MobileHeaderInit();
};