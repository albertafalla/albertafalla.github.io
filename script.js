'use strict';

/////// ELEMENTS
// MODAL
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// BUTTON SCROLL
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// TABS
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

// NAVIGATION MENU FADE AND STICKY NAV BAR
const nav = document.querySelector('.nav');
const allSections = document.querySelectorAll('.section');
const header = document.querySelector('.header');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// BUTTON SCROLLING
btnScrollTo.addEventListener('click', function (e) {
  const s1coor = section1.getBoundingClientRect();
  console.log(s1coor);

  section1.scrollIntoView({ behavior: 'smooth' });
});

////////// PAGE NAVIGATION
// // USING SCROLLINTOVIEW
// document.querySelectorAll('.nav__link').forEach(function (e) {
//   e.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  const id = e.target.getAttribute('href');
  // MATCHING STRATEGY
  if (e.target.classList.contains('nav__link')) {
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// TABBED COMPONENT

// tabs.forEach(t => t.addEventListener('click', () => console.log('Tabs')));

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  const clicked = e.target.closest('.operations__tab');
  // GUARD CLAUSE
  if (!clicked) return;

  // ACTIVE TAB
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // DISPLAYING THE ACTIVE TAB
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// MENU FADE ANIMATION
const hanldeHover = function (e, op) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const hover = e.target;
    const siblings = hover.closest('.nav').querySelectorAll('.nav__link');
    const logo = hover.closest('.nav').querySelector('img');

    siblings.forEach(e => {
      if (e !== hover) e.style.opacity = op; //this;
    });
    logo.style.opacity = op; //this;
  }
};

nav.addEventListener('mouseover', function (e) {
  hanldeHover(e, 0.5);
});
nav.addEventListener('mouseout', function (e) {
  hanldeHover(e, 1);
});

// REVEALING SECTIONS
const revealSection = function (entries, observer) {
  // const [entry] = entries;
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// // PASSING AN 'ARGUEMENT' INTO EVENT HANDLER
// nav.addEventListener('mouseover', hanldeHover.bind(0.5));

// nav.addEventListener('mouseout', hanldeHover.bind(1));

// STICKY NAVIGATION
// const sec1coor = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);

//   if (window.scrollY > sec1coor.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// STICKY NAVIGATION: INTERSECTION OBSERVER API
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// // LAZY LOADING IMAGES
// const imgTargets = document.querySelectorAll('img[data-src]');

// const loadImg = function (entries, observer) {
//   const [entry] = entries;
//   if (!entry.isIntersecting) return;
//   entry.target.src = entry.target.dataset.src;
//   entry.target.addEventListener('load', function () {
//     entry.target.classList.remove('lazy-img');
//   });
//   observer.unobserve(entry.target);
// };

// const imgObserver = new IntersectionObserver(loadImg, {
//   root: null,
//   threshold: 0,
//   rootMargin: '200px',
// });

// imgTargets.forEach(function (img) {
//   imgObserver.observe(img);
// });

/////// SLIDER FUNCTIONALITIES
const sliders = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const maxSlide = slides.length;
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;

  // FUNCTIONS
  const createDots = function () {
    slides.forEach((_, index) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${index}"></button>`
      );
    });
  };

  // SET THE SLIDES SIDE BY SIDE AT 0% 100% 200% and so on
  const gotoSlide = function (slide) {
    slides.forEach(
      (slides, index) =>
        (slides.style.transform = `translateX(${100 * (index - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;

    gotoSlide(curSlide);
    activeDots(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;
    gotoSlide(curSlide);
    activeDots(curSlide);
  };

  const activeDots = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(d => d.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const init = function () {
    createDots();
    gotoSlide(0);
    activeDots(0);
  };
  init();

  // EVENT HANDLERS
  // CLICK TO GO TO THE NEXT SLIDE
  btnRight.addEventListener('click', nextSlide);
  // CLICK TO GO BACK TO PREV SLIDE
  btnLeft.addEventListener('click', prevSlide);
  // USING THE ARROW KEYS FOR THE SLIDES
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextSlide();
    e.key === 'ArrowLeft' && prevSlide();
  });
  // USING THE DOTS TO NAVIGATE THE SLIDES
  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      curSlide = Number(e.target.dataset.slide);
      gotoSlide(curSlide);
      activeDots(curSlide);
    }
  });
};
sliders();
