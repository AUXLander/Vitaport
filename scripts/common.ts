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
    }
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
        if(e.currentTarget == e.target || close) {
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
                        }, 350, tab)
                    });
                    isOpenedMosaic = !isOpenedMosaic;
                }
    
                isOpenedMosaic = true;
                target.classList.add("active");
            }
        }
    });
}

var isOpenedMosaic = false;
window.onload = () => {

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
            delay: 5000,
        },

        pagination: {
            el: ".swiper-bullets",
            type: "bullets",
            clickable: true,
            renderBullet: (index, className) => {
                return `<span class="${className}"></span>`;
            },
        }
    });


    document.querySelectorAll(".search-target").forEach(SearchInitEvent);
    document.querySelectorAll(".addr.pos-1, .addr.pos-2").forEach(AddrInitEvent);
    document.querySelectorAll(".brgr-menu").forEach(MobileMenuInitEvent);
    document.querySelectorAll(".mosaic__tab").forEach(MosaicTabInitEvent);

    //ArrowUpInit()
    

    
};