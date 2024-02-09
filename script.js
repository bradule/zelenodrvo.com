'use strict';
const account1 = {
  owner: 'Dusan Brankovic',
  pin: 1111,
  level: 5,
  grade: 7,
};

const account2 = {
  owner: 'Bojan Jovicic',
  pin: 2222,
  level: 5,
  grade: 8,
};

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const menuItem = document.querySelector('.nav__link');
const sectionTimer = document.querySelector('#section--timer');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const navLinks = document.querySelector('.nav__link');
const topBtn = document.querySelector('#myBtn');
const header = document.querySelector('.header');
// const treninziSlika = document.querySelectorAll('.lazy-img')
const treninziSlika = document.querySelectorAll('img[data-src]');
const drvoLogo = document.getElementById('ZDlogo');
const drvoLogoFooter = document.querySelector('.footer__logo');

//MODAL
/////////////////////////////////////////////////////////////////////////
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

//SMOOTH scroling
///////////////////////////////////////////////////////////////////////
btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

sectionTimer.addEventListener('click', function (e) {
  sectionTimer.scrollIntoView({ behavior: 'smooth' });
});

//NAv line in sections
/////////////////////////////////////////////////////////////////////////

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

///// uvecaj sliku
// const uvecajSliku =  function (s) {
//   s.target.classList.remove('lazy-img')
//   s.target.previousElementSibling.classList.remove('hiddentxt')
//   // s.target.src.replace('Bblur.', 'B.')
//   // console.log(s.target.src);
// }

// ///// smanji sliku
// const smanjiSliku = function (s) {
// s.target.classList.add('lazy-img')
// s.target.previousElementSibling.classList.add('hiddentxt')
// }

const loadImg = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;

    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('lazy-img');
      entry.target.previousElementSibling.classList.remove('hiddentxt');
    });
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-100px',
});

treninziSlika.forEach(img => imgObserver.observe(img));

// treninziSlika.forEach(slika => slika.addEventListener('mouseover', uvecajSliku))
// treninziSlika.forEach(slika => slika.addEventListener('mouseout', smanjiSliku))

///// drvce to the top
const toTheTop = function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

drvoLogo.addEventListener('click', toTheTop);
drvoLogoFooter.addEventListener('click', toTheTop);

//SLIDER
//////////////////////////////////////////////////////////////////////////////
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  const dotContainer = document.querySelector('.dots');
  let curSlide = 0;
  const maxSlide = slides.length;

  //functions

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const actiateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // //Sledeci slajd
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    actiateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    actiateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    actiateDot(0);
  };

  init();

  //Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      actiateDot(slide);
    }
  });
};
slider();

//TIMER
//////////////////////////////////////////////////////////////////////
const brojSerija = document.querySelector('.serije');
const vezbanja = document.querySelector('.vezbanja');
const odmor = document.querySelector('.odmor');
const startButton = document.querySelector('.startBtn');

brojSerija.value = 0;
vezbanja.value = 0;
odmor.value = 0;

const odbrojavanje = function (e) {
  setInterval(() => {
    if (e.value > 0) {
      e.value--;
      console.log(e.value);
    } else {
      return;
    }
    // console.log('KDASJHKFASJF');
  }, 1000);
};

startButton.addEventListener('click', function () {
  const vezbanjaConst = vezbanja.value;
  console.log(vezbanjaConst);
  const odmorConst = odmor.value;
  odbrojavanje(vezbanja);

  const dogadjaj = new Event('krajBrojanja');

  vezbanja.addEventListener(
    'krajBrojanja',
    function (e) {
      if (e.target.value === 0) {
        odbrojavanje(odmor);
      }
    },
    false
  )});

  vezbanja.dispatchEvent(dogadjaj);

//   // const event = new Event('krajBrojanja')
//   // vezbanja.addEventListener('krajBrojanja', function (e){
//   //   e.target.value === 0 ? 'a': 'b'
//   //   }
//   // }, false)
//   // vezbanja.dispatchEvent(event)
// });

// // const startTimer = function () {

// //   setInterval(function () {
// //     let brojV = vezbanja.value
// //       if (vezbanja.value < 1) {
// //       return
// //     } else {console.log(
// //       vezbanja.value);
// //       vezbanja.value--;   }
// //   },1000)
// // }

// // startButton.addEventListener('click', startTimer)

// // const animacijaBtn = function (b) {
// //   document.querySelectorAll('timer__el btn--scroll-to').forEach(b => b.classList.remove('active'))
// // }

// // document.addEventListener('click', function (e) {
// //   e.preventDefault
// //   if(e.target.classList.contains('serijeUp')) {
// //     console.log('PLUS JEDAN');
// //     brojSerija.value++
// //   } else if (brojSerija.value >= 1 && e.target.classList.contains('serijeDown')){
// //     console.log('TIMER DOWN');
// //     brojSerija.value--;
// //   } else if(e.target.classList.contains('vezbanjaUp')) {
// //     console.log('PLUS JEDAN');
// //     vezbanja.value++
// //   } else if(vezbanja.value >= 1 && e.target.classList.contains('vezbanjaDown')){
// //     console.log('TIMER DOWN');
// //     vezbanja.value--;
// //   } else if(e.target.classList.contains('odmorUp')) {
// //     console.log('PLUS JEDAN');
// //     odmor.value++
// //   } else if(odmor.value >= 1 && e.target.classList.contains('odmorDown')){
// //     console.log('TIMER DOWN');
// //     odmor.value--;
// //   }
// // })

// // const startTimer = function () {
// //    if (vezbanja.value === 0) {
// //     brojSerija.value--}
// //     else if (vezbanja.value > 0) {
// //     let timeV = vezbanja.value;
// //     let timeO = odmor.value;
// //             // brojSerija.value
// //     //call timer every second
// //     setInterval(function() {
// //       if (timeV > 1) {
// //         timeV--;
// //         console.log(timeV);
// //         vezbanja.value = timeV;
// //       } else if (timeV === 1) {
// //         console.log(odmor.value);
// //         brojSerija.value = brojSerija.value - 1;
// //       } else if (brojSerija.value === 0) return;

// //       // vezbanjaVrednost--
// //       //in each second print remaining time
// //       // when 0
// //         //1. read time from odmor interval
// //       //2. call timer every second
// //       //3. every second print remaining time
// //       //4. reset vezbanja na pocetnu crednost
// //       //5. reduce broj serija by 1
// //       //6. whent odmor reaches 0
// //         //1. start vezbanja
// //         //2. reset odnome
// //     }, 1000)
// //   }
// //   //read time from vezbanje element

// //   //afther each time interval passed from vezbanje input

// //     //1. read time from odmor interval
// //     //2. call timer every second
// //     //3. every second print remaining time
// //     //4. reset vezbanja na pocetnu crednost
// //     //5. reduce broj serija by 1
// //     //6. whent odmor reaches 0
// //       //1. start vezbanja
// //       //2. reset odnome











