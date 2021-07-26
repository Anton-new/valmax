// Header

(function () {
    const header = document.querySelector('.header');
    function changeheader () {
        if (window.pageYOffset > 84) {
            header.classList.add('header__active');
        }
        else {
            header.classList.remove('header__active')
        }
    };
    window.addEventListener('scroll', changeheader);
}());

// Burger

(function () {
    const header = document.querySelector('.header');
    const burger = document.querySelector('.burger__js');
    const menu = document.querySelector('.header__nav');
    const menuCloseItem = document.querySelector('.header__nav__close');
    const menuLinks = document.querySelectorAll('.nav__link');
    let blur;
    
    function burgerClick () {

        // Влияет на blur у создаваемого дива
        header.classList.remove('header__active'); 

        blur = document.createElement('div');
        blur.classList.add('header__nav__blur');
        header.appendChild(blur);
        menu.classList.add('header__nav__active');
        hideScroll();
        menuLinks.forEach(each => {each.addEventListener('click', linkClick)});       
    };

    function linkClick () {
        menu.classList.remove('header__nav__active');
        header.removeChild(blur);
        header.classList.add('header__active');
        menu.addEventListener('transitionend', showScrollafterBurger);
        menuLinks.forEach(each => {each.removeEventListener('click', linkClick)});
    };

    function closeClick () {
        menu.classList.remove('header__nav__active');
        if (window.pageYOffset > 84) {header.classList.add('header__active')}
        header.removeChild(blur);
        menu.addEventListener('transitionend', showScrollafterBurger);
    };
    
    burger.addEventListener('click', burgerClick);
    menuCloseItem.addEventListener('click', closeClick)
}());

// Smooth scroll

(function () {

    const smoothScroll = function (targetEl, duration) {
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top;
        let startPosition = window.pageYOffset;
        let startTime = null;
    
        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {each.addEventListener('click', function () {
            const currentTarget = this.getAttribute('href');
            smoothScroll(currentTarget, 1000);
            })
        });
    };
    scrollTo();
}());

// Circles

(function () {
    

    
    // console.log();

    function scrollcircle () {

        const circle = document.querySelectorAll('.circle');
        const a = document.querySelector('.main-page').scrollHeight;
        const b = document.querySelector('.creative-page').scrollHeight;
        const c = document.querySelector('.cards-page').scrollHeight;
        const d = document.querySelector('.portfolio').scrollHeight;
        const e = document.querySelector('.info').scrollHeight;
        console.log(a,b,c,d,e);

        if (window.pageYOffset < (a/2) || (window.pageYOffset === 0)) {
            circle[0].style.opacity = '100%';
        } else {
            circle[0].style.opacity = '20%';
        }
        if ((window.pageYOffset >= (a/2)) && (window.pageYOffset < (a + b/2))) {
            circle[1].style.opacity = '100%';
        } else {
            circle[1].style.opacity = '20%';
        }
        if ((window.pageYOffset >= (a + b/2)) && (window.pageYOffset < (a + b + c/2))) {
            circle[2].style.opacity = '100%';
        } else {
            circle[2].style.opacity = '20%';
        }
        if ((window.pageYOffset >= (a + b + c/2)) && (window.pageYOffset < (a + b + c + d/2))) {
            circle[3].style.opacity = '100%';
        } else {
            circle[3].style.opacity = '20%';
        }
        if ((window.pageYOffset >= (a + b + c + d/2)) && (window.pageYOffset < (a + b + c + d + e/2))) {
            circle[4].style.opacity = '100%';
        } else {
            circle[4].style.opacity = '20%';
        }
        if (window.pageYOffset >= (a + b + c + d + e/2)) {
            circle[5].style.opacity = '100%';
        } else {
            circle[5].style.opacity = '20%';
        }
    };
    window.addEventListener('scroll', scrollcircle);
    // console.log(a,b,c,d,e);
}());

// Adaptive main-page (Если настроить условия только при запуске, то код значительно уменьшится, так как слушатель resize убирается, а слушаель загрузки Дом-дерева не нужен)

(function () {
    function adaptiveMainpage () {
        if (window.innerWidth <= 800 && document.querySelector('.main__section-left')) {
            function unwrap(wrapper) {
    
                var docFrag = document.createDocumentFragment();
                while (wrapper.firstChild) {
                    var child = wrapper.removeChild(wrapper.firstChild);
                    docFrag.appendChild(child);
                }
            
                wrapper.parentNode.replaceChild(docFrag, wrapper);
            }
            
            unwrap(document.querySelector('.main__section-left'));
        } else {
            if (window.innerWidth > 800 && document.querySelector('.main__section-1').children.length === 4) {
                function createwrap(wrapper) {
                
                    var docFrag2 = document.createDocumentFragment();
                    var div = docFrag2.appendChild(document.createElement('div'));
                    div.classList.add('main__section-left');
                    while (wrapper.children.length > 1) {
                        var child2 = wrapper.removeChild(wrapper.firstChild);
                        div.appendChild(child2);
                    }
                
                    wrapper.prepend(div);
                }
            
                createwrap(document.querySelector('.main__section-1'));
            }
        }
    }
    window.addEventListener('resize', adaptiveMainpage);
    document.addEventListener("DOMContentLoaded", adaptiveMainpage);
}());

// Text animation on main-page

(function () {
    
    const maintitle = document.querySelector('.main__title');
    const text = document.querySelectorAll('.main__animation');

    function appear (a) {
        a.style.opacity = '1';
    };
    function disappear (a) {
        a.style.opacity = '0';
    };

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    async function perebor () {
        for (let i = 0; i <= text.length - 1; i++) {
            appear(text[i]);
            await sleep(1000);
        };
        for (let i = 0; i <= text.length - 1; i++) {
            disappear(text[i]);
        };
    }

    maintitle.addEventListener('mouseover', perebor);

}());


// Buttons animation

(function () {
    const buttonList = document.querySelectorAll('.button__js');

    function createCircleIcon (posX, posY, event) {

        const container = event.target;
        const circle = document.createElement('div');

        circle.classList.add('button__circle');
        circle.style.left = `${posX}px`;
        circle.style.top = `${posY}px`;

        container.appendChild(circle);

        setTimeout(() => circle.remove(), 1000);
    }

    function handleButtonClick (event) {
        const offset = event.target.getBoundingClientRect();
        const posX = event.clientX - offset.left;
        const posY = event.clientY - offset.top;

        createCircleIcon(posX, posY, event);
    }
    
    for (i = 0; i <= buttonList.length - 1; i++) {
        buttonList[i].addEventListener('mousedown', handleButtonClick);
    }
}());

// Portfolio

(function () {
    const photoArr = document.querySelectorAll('.portfolio__photo');
    photoArr.forEach(function (element, index, array) { element.addEventListener('click', () => slider(index))});

    function slider (index) {
        
        const portfolioWrap = document.querySelector('.portfolio__slider');
        const sliderClose = document.querySelector('.slider__nav__close');
            
        let slides = document.querySelectorAll('.slides .slide');
        let currentSlide = index;
        let slideInterval = setInterval(nextSlide, 4000);
        
        // hide scroll
        hideScroll();

        portfolioWrap.classList.add('portfolio__slider--active');
        slides[currentSlide].classList.add('showing');

        sliderClose.addEventListener('click', (event) => {
            
            clearInterval(slideInterval);
            slides[currentSlide].classList.remove('showing');
            portfolioWrap.classList.remove('portfolio__slider--active');
            pauseButton.innerHTML = 'Пауза';

            // showscroll
            portfolioWrap.addEventListener('transitionend', showScrollafterPortfolio);
        });


        function nextSlide() {
            goToSlide(currentSlide + 1);
        }
        function previousSlide() {
            goToSlide(currentSlide - 1);
        }
        function goToSlide(n) {
            slides[currentSlide].classList.remove('showing');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('showing');
        }

        let playing = true;
        let pauseButton = document.getElementById('controls');
        function pauseSlideshow() {
            pauseButton.innerHTML = 'Слайдшоу';
            playing = false;
            clearInterval(slideInterval);
        }
        function playSlideshow() {
            pauseButton.innerHTML = 'Пауза';
            playing = true;
            slideInterval = setInterval(nextSlide, 4000);
        }
        pauseButton.onclick = function() {
            if(playing) {
            pauseSlideshow();
        } else {
            playSlideshow();
        }
        };

        let next = document.getElementById('next');
        let previous = document.getElementById('previous');
        next.onclick = function() {
            pauseSlideshow();
            nextSlide();
        };
        previous.onclick = function() {
            pauseSlideshow();
            previousSlide();
        };
    }
}());




// Adaptive cards

(function () {
    function adaptiveCards () {
        const obolochka = document.querySelector('.cards__view-window').clientWidth;
        const cardsWrapper = document.querySelector('.cards__wrapper');
        let cardWidth;
        
        if (window.innerWidth > 900) {
            cardWidth = obolochka * 0.3;
        } else if (window.innerWidth <= 900 && window.innerWidth > 600) {
            cardWidth = obolochka * 0.475; 
        } else if (window.innerWidth <= 600) {
            cardWidth = obolochka;
        }
        cardsWrapper.style.gridTemplateColumns = `repeat(4, ${cardWidth}px)`;
    }

    adaptiveCards();
    window.addEventListener('resize', adaptiveCards);
}());



// Cards slider

(function () {
    let movePosition;
    let position;
    let obolochka;
    let track;
    let bar;
    let a = 0;

    function changeCards () {
        obolochka = document.querySelector('.cards__view-window');
        track = document.querySelector('.cards__wrapper');
        const nextbtn = document.querySelector('.cards__view-window .cards__arrow-right');
        const previousbtn = document.querySelector('.cards__view-window .cards__arrow-left');
        bar = document.querySelector('.cards__bar__scroll');
        
        position = 0;
        a = 0;
        bar.style.transform = `translateY(-50%) translateX(${a}%)`;
        change();
        
        previousbtn.addEventListener('click', changeLeft);
        nextbtn.addEventListener('click', changeRight);
    }
    function changeLeft () {
        movePosition = ((track.scrollWidth - (obolochka.clientWidth * 0.05 * 3)) / 4) + obolochka.clientWidth * 0.05;
        if (Math.round(position) != 0 ) {
            position += movePosition;
            change();
            bar.style.transform = `translateY(-50%) translateX(${a -= 100}%)`;
            console.log(Math.round(position), -(track.scrollWidth - obolochka.clientWidth));
        }   
    }
    function changeRight () {
        movePosition = ((track.scrollWidth - (obolochka.clientWidth * 0.05 * 3)) / 4) + obolochka.clientWidth * 0.05;
        if (Math.round(position) > -(track.scrollWidth - obolochka.clientWidth)) {
            position -= movePosition;
            change();
            bar.style.transform = `translateY(-50%) translateX(${a += 100}%)`;
            console.log(Math.round(position), -(track.scrollWidth - obolochka.clientWidth));
        }
    }
    function change () {
        track.style.transform = `translateX(${position}px)`;
    }

        // Cards swipe

        let x1;
        let x2;
        let y1;
        let y2;
        let xDiff;
        let yDiff;
        const cards = document.querySelectorAll('.cards__item');

        cards.forEach(function (element, index, array) { 
            element.addEventListener('touchstart', touchStart);
            element.addEventListener('touchmove', touchMove);
            element.addEventListener('touchend', touchEnd);
        })

        function touchStart (event) {
            x1 = event.touches[0].clientX;
            y1 = event.touches[0].clientY;
        }
        function touchMove (event) {
            x2 = event.touches[0].clientX;
            y2 = event.touches[0].clientY;
            
            xDiff = x1 - x2;
            yDiff = y1 - y2;
            console.log(xDiff, yDiff);
        }
        function touchEnd (event) {
            if (xDiff > 0 && xDiff > Math.abs(yDiff)) {
                    changeRight();
                } else if (xDiff < 0 && Math.abs(xDiff) > Math.abs(yDiff)) {
                    changeLeft();
                }
        }

    changeCards();
    window.addEventListener('resize', changeCards);
}());

// Form validation

(function () {
    let regName = /[a-zA-Zа-яёА-ЯЁ ]/;
    let regPhone = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

    const submitBtn = document.querySelectorAll('.form__button');

    function submit (event) {
        let field1;
        let field2;
        let field4;
        let field1Wrap;
        let field2Wrap;
        let form;
        let c;
        if (event.target.closest('.footer__form')) {
            c = true;
            field1 = document.querySelector('#user-name');
            field2 = document.querySelector('#user-phone');
            field4 = document.querySelector('#user-comment');
            field1Wrap = document.querySelector('.input__wrap-1');
            field2Wrap = document.querySelector('.input__wrap-2');
            form = document.querySelector('.footer__form .form__fill');
            console.log('bottom');
        } else {
            c = false;
            field1 = document.querySelector('#user-name-0');
            field2 = document.querySelector('#user-phone-0');
            field4 = document.querySelector('#user-comment-0');
            field1Wrap = document.querySelector('.input__wrap-10');
            field2Wrap = document.querySelector('.input__wrap-20');
            form = document.querySelector('.form__dialog .form__fill');
            console.log('top');
        }

        const userName = field1.value;
        const userPhone = field2.value;
        const userComment = field4.value;

        event.preventDefault();
        console.log(userName, userPhone);

        function checkName (regName, userName) {
            if (!regName.test(userName)) {
                field1.style.backgroundColor = 'rgba(236, 53, 53, 0.4)';
                field1Wrap.classList.add('form__field__name-valid');
                return false;
            } else {
                field1Wrap.classList.remove('form__field__name-valid');
                return true;
            }
        }
        function checkPhone (regPhone, userPhone) {
            if (!regPhone.test(userPhone)) {
                field2.style.backgroundColor = 'rgba(236, 53, 53, 0.4)';
                field2Wrap.classList.add('form__field__phone-valid');
                return false;
            } else {
                field2Wrap.classList.remove('form__field__phone-valid');
                return true;
            }
        }
        function wait() {
            return new Promise(resolve => setTimeout(resolve, 2000));
        }
        async function sendData (a, b) {
            console.log(a, b);
            if (a && b) {
                // Отправка формы
                form.classList.add('sending');
                console.log('Данные отправляются');
                await wait();
                form.classList.remove('sending');
                form.reset();
                if (c === false) {
                    document.querySelector('.form__dialog').classList.remove('form__dialog--active');
                    document.querySelector('.form__wrap').classList.remove('form__wrap--active');
                    document.querySelector('.form__dialog').addEventListener('transitionend', showScrollafterModal);
                }
                
                field1.style.backgroundColor = 'rgba(227, 216, 11, 0.4)';
                field2.style.backgroundColor = 'rgba(227, 216, 11, 0.4)';
            } else {
                console.log('Что-то не верно');
            }
        }

        sendData(checkName(regName, userName), checkPhone(regPhone, userPhone));
    }
    submitBtn.forEach(function (element, index, array) { element.addEventListener('click', submit)});
}());


// POP UP (С использованием объекта, содержащий классы)

(function () {
    const CLASS_LIST = {
        FORM_WRAP: 'form__wrap',
        FORM_WRAP_ACTIVE: 'form__wrap--active',
        FORM_DIALOG: 'form__dialog',
        FORM_DIALOG_ACTIVE: 'form__dialog--active',
        MODAL_OPEN: 'button__modal__js',
        MODAL_CLOSE: 'form__close'
    };

    document.addEventListener('click', (event) => {
        // open
        const modalWrap = document.querySelector(`.${CLASS_LIST.FORM_WRAP}`);
        const modal = document.querySelector(`.${CLASS_LIST.FORM_DIALOG}`);

        if (event.target.closest(`.${CLASS_LIST.MODAL_OPEN}`)) {

            hideScroll();

            modalWrap.classList.add(CLASS_LIST.FORM_WRAP_ACTIVE);
            modal.classList.add(CLASS_LIST.FORM_DIALOG_ACTIVE);
        }
        // close
        if (event.target.closest(`.${CLASS_LIST.MODAL_CLOSE}`) || event.target.classList.contains(CLASS_LIST.FORM_WRAP_ACTIVE)) {
            
            modal.classList.remove(CLASS_LIST.FORM_DIALOG_ACTIVE);
            modalWrap.classList.remove(CLASS_LIST.FORM_WRAP_ACTIVE);
            
            modal.addEventListener('transitionend', showScrollafterModal);
        }
    });
}());

// Scroll

const circles = document.querySelector('.scroll');
const header = document.querySelector('.header');


function hideScroll () {
    
    const getScrollbarWidth = window.innerWidth - document.documentElement.clientWidth;;
    header.style.paddingRight = `${getScrollbarWidth}px`;
    document.body.style.paddingRight = `${getScrollbarWidth}px`;
    circles.style.paddingRight = `${getScrollbarWidth}px`;
    document.body.style.overflowY = 'hidden';

}

function showScrollafterModal (event) {

    header.style.paddingRight = '';
    document.body.style.paddingRight = '';
    circles.style.paddingRight = '';
    document.body.style.overflowY = 'visible';

    document.querySelector('.form__dialog').removeEventListener('transitionend', showScrollafterModal); 
}

function showScrollafterPortfolio (event) {

    header.style.paddingRight = '';
    document.body.style.paddingRight = '';
    circles.style.paddingRight = '';
    document.body.style.overflowY = 'visible';

    document.querySelector('.portfolio__slider').removeEventListener('transitionend', showScrollafterPortfolio); 
}

function showScrollafterBurger (event) {

    header.style.paddingRight = '';
    document.body.style.paddingRight = '';
    circles.style.paddingRight = '';
    document.body.style.overflowY = 'visible';

    document.querySelector('.header__nav').removeEventListener('transitionend', showScrollafterBurger); 
}