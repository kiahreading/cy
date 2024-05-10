import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Splide from '@splidejs/splide';
import LazyLoad from 'vanilla-lazyload';

// --------------------------------------------------
// 🐌 General
// --------------------------------------------------

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({
  ease: 'power1.inOut',
  duration: 0.5,
});

// --------------------------------------------------
// 💤 Lazy Loading
// --------------------------------------------------

const lazyLoadInstance = new LazyLoad({
  // Your custom settings go here
  elements_selector: '[data-lazy]',
  callback_loaded: (el) => {
    el.style.opacity = '1';
    el.style.visibility = 'initial';
  },
});

// --------------------------------------------------
// Homepage animation
// --------------------------------------------------

// Check if the user has already visited the homepage in the current session
const hasVisitedAnyPage = sessionStorage.getItem('hasVisitedAnyPage');

// If it's the first visit, run the animation
if (!hasVisitedAnyPage) {
  let homePage = document.querySelector('.template-index');
  if (homePage) {
    const animatedIntroItems = gsap.utils.toArray('.animated-intro-item');
    gsap.set(animatedIntroItems, { autoAlpha: 0 });
    // Your GSAP timeline animation code goes here
    const tl = gsap.timeline();

    // Target the middle div and scale it
    tl.to('.animated-intro-text', { ease: 'power1.inOut', duration: 0.6, autoAlpha: 1 });
    tl.to('.animated-intro-text', { ease: 'power1.inOut', duration: 0.6, autoAlpha: 0 }, '+=1.2');

    // Target the middle div and scale it
    tl.to(
      '.header__heading.animated-header-item',
      { ease: 'power1.inOut', delay: 0.1, duration: 0.5, autoAlpha: 1 },
      '-=0.3'
    );

    // Add a delay before targeting the divs before and after the middle div
    tl.to(
      gsap.utils.toArray('.header .animated-header-item')[1],
      { ease: 'power1.inOut', duration: 0.5, autoAlpha: 1 },
      '-=0.1'
    );
    tl.to(
      gsap.utils.toArray('.header .animated-header-item')[3],
      { ease: 'power1.inOut', duration: 0.5, autoAlpha: 1 },
      '-=0.6'
    );

    // Add a delay before targeting the divs before and after the previously targeted divs
    tl.to(
      gsap.utils.toArray('.header .animated-header-item')[0],
      { ease: 'power1.inOut', duration: 0.5, autoAlpha: 1 },
      '-=0.1'
    );
    tl.to(
      gsap.utils.toArray('.header .animated-header-item')[4],
      { ease: 'power1.inOut', duration: 0.5, autoAlpha: 1 },
      '-=0.6'
    );

    // Add a delay before targeting the divs before and after the previously targeted divs
    tl.to(
      gsap.utils.toArray('.animated-intro-item.animated-intro-item--other'),
      { ease: 'power1.inOut', duration: 0.5, autoAlpha: 1 },
      '+=0.4'
    );
  }

  // Mark the website as visited in the session
  sessionStorage.setItem('hasVisitedAnyPage', 'true');
}

// --------------------------------------------------
// 🎠 Carousels
// --------------------------------------------------

let bannerCarousel = document.querySelector('.splide--banner');

if (bannerCarousel) {
  let bannerSplide = new Splide(bannerCarousel, {
    type: 'fade',
    rewind: true,
    speed: 1200,
    pauseOnHover: false,
    interval: 3400,
    autoplay: true,
    arrows: false,
    pagination: false,
    perPage: 1,
    perMove: 1,
    focus: 'center',
    width: '100%',
    updateOnMove: true,
  });

  bannerSplide.mount();
}

// --------------------------------------------------
// Reveal text scrolltrigger
// --------------------------------------------------

const texts = gsap.utils.toArray(document.querySelectorAll('.reveal, .shopify-policy__container'));
let mm = gsap.matchMedia();
gsap.set(texts, { autoAlpha: 0 });

texts.forEach((text, i) => {
  const anim = gsap.to(text, {
    autoAlpha: 1,
    duration: 0.6,
    stagger: 0.0,
    ease: 'power1.inOut',
    paused: true,
    delay: 0.3,
  });

  mm.add('(min-width: 800px)', () => {
    // Use callbacks to control the state of the animation
    ScrollTrigger.create({
      trigger: text,
      start: 'top 90%',
      once: false,
      onEnter: (self) => {
        // If it's scrolled past, set the state
        // If it's scrolled to, play it
        anim.play();
      },
    });
  });

  mm.add('(max-width: 799px)', () => {
    // Use callbacks to control the state of the animation
    ScrollTrigger.create({
      trigger: text,
      start: 'top 95%',
      once: false,
      onEnter: (self) => {
        // If it's scrolled past, set the state
        // If it's scrolled to, play it
        anim.play();
      },
    });
  });

  ScrollTrigger.create({
    trigger: text,
    start: 'top bottom',
    onLeaveBack: () => anim.pause(0),
  });
});

// --------------------------------------------------
// Mega menu
// --------------------------------------------------

let spacePage = document.querySelector('.template-page-space');
let spacePageLogos = document.querySelectorAll('.header__heading-logo path');
let spacePageMenuItems = document.querySelector('.header__wrapper');

document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header');
  const fauxBackground = document.querySelector('.faux-background');
  const megaMenuTriggers = document.querySelectorAll('.mega-menu');
  const megaMenus = document.querySelectorAll('.mega-menu__content');

  megaMenuTriggers.forEach((trigger) => {
    const targetId = trigger.getAttribute('data-id');
    const megaMenu = document.querySelector(`.mega-menu__content[data-id="${targetId}"]`);

    let isMouseOverTrigger = false;
    let isMouseOverMenu = false;

    trigger.addEventListener('mouseenter', () => {
      isMouseOverTrigger = true;
      showMegaMenu();
    });

    trigger.addEventListener('mouseleave', () => {
      isMouseOverTrigger = false;
      hideMegaMenu();
    });

    megaMenu.addEventListener('mouseenter', () => {
      isMouseOverMenu = true;
      showMegaMenu();
    });

    megaMenu.addEventListener('mouseleave', () => {
      isMouseOverMenu = false;
      hideMegaMenu();
    });

    function showMegaMenu() {
      if (isMouseOverTrigger || isMouseOverMenu) {
        const tl = gsap.timeline();
        // tl.to(header, {ease: "power1.inOut", duration: 0.3, backgroundColor: '#fff' });
        tl.to(fauxBackground, { ease: 'power1.inOut', duration: 0.3, opacity: 1 });
        tl.to(megaMenu, { ease: 'power1.inOut', opacity: 1, display: 'block', duration: 0.3 }, '-=.3');
        if (spacePage) {
          // Loop through each path and set its fill attribute to var(--color-1)
          spacePageLogos.forEach((path) => {
            path.classList.add('black-logo');
          });
          spacePageMenuItems.style.color = 'var(--black)';
        }
        // gsap.to(header, { duration: 0.3, backgroundColor: '#fff' });
        // gsap.to(megaMenu, { opacity: 1, display: 'block', duration: 0.3, backgroundColor: '#fff' });
        // gsap.from(megaMenu.children, { opacity: 0, stagger: 0.1, duration: 0.5 });
      }
    }

    function hideMegaMenu() {
      if (!isMouseOverTrigger && !isMouseOverMenu) {
        const tl = gsap.timeline();
        tl.to(fauxBackground, { ease: 'power1.inOut', duration: 0.3, opacity: 0 });
        tl.to(megaMenu, { opacity: 0, display: 'none', duration: 0.3 }, '-=.3');
        if (spacePage) {
          spacePageLogos.forEach((path) => {
            path.classList.remove('black-logo');
          });
          spacePageMenuItems.style.color = 'var(--white)';
        }
      }
    }
  });
});

// --------------------------------------------------
// Mobile menu
// --------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuBtn = document.querySelector('.mobile-header-menu__menu-button');
  const modal = document.querySelector('.mobile-menu-modal');
  const modalText = modal.querySelector('.mobile-menu-modal__text');

  let isModalOpen = false;

  mobileMenuBtn.addEventListener('click', () => {
    if (isModalOpen) {
      // Close modal
      gsap.to(modalText, {
        opacity: 0,
        duration: 0.5,
        onComplete: function () {
          modal.style.display = 'none';
        },
      });
      // Allow scrolling on the body
      document.body.style.overflow = 'auto';

      if (spacePage) {
        spacePageLogos.forEach((path) => {
          path.classList.remove('black-logo');
        });
        spacePageMenuItems.style.color = 'var(--white)';
      }
    } else {
      // Open modal
      modal.style.display = 'flex';
      gsap.to(modalText, { opacity: 1, duration: 0.5 });
      // Prevent scrolling on the body
      document.body.style.overflow = 'hidden';

      if (spacePage) {
        // Loop through each path and set its fill attribute to var(--color-1)
        spacePageLogos.forEach((path) => {
          path.classList.add('black-logo');
        });
        spacePageMenuItems.style.color = 'var(--black)';
      }
    }

    // Toggle modal state
    isModalOpen = !isModalOpen;
  });
});

// --------------------------------------------------
// Product pop-up modal
// --------------------------------------------------

// document.addEventListener('DOMContentLoaded', function () {
//   const modalButtons = document.querySelectorAll('.product-popup-modal__button');

//   modalButtons.forEach(function (button) {
//       button.addEventListener('click', function () {
//           const modalId = button.getAttribute('data-id');
//           openModal(modalId);
//       });
//   });

//   function openModal(modalId) {
//       const modal = document.querySelector(`[data-id="${modalId}"]`);
//       const modalText = modal.querySelector('.product-popup-modal');

//       modal.style.display = 'block';
//       gsap.to(modalText, { scale: 1, duration: 0.5 });

//       // Close modal when clicking outside the modal content
//       modal.addEventListener('click', function (event) {
//           if (event.target === modal) {
//               closeModal(modalId);
//           }
//       });

//       // Prevent scrolling on the body
//       document.body.style.overflow = 'hidden';
//   }

//   function closeModal(modalId) {
//       const modal = document.querySelector(`[data-id="${modalId}"]`);
//       const modalText = modal.querySelector('.product-popup-modal');

//       gsap.to(modalText, { scale: 0, duration: 0.5, onComplete: function () {
//           modal.style.display = 'none';
//       }});

//       // Allow scrolling on the body
//       document.body.style.overflow = 'auto';
//   }
// });

// --------------------------------------------------
// Product carousel
// --------------------------------------------------

let carousel = document.querySelector('.carousel');

// If it's the first visit, run the animation
if (carousel) {
  let splide = new Splide(carousel, {
    type: 'fade',
    rewind: true,
    speed: 0,
    flickPower: 300,
    arrows: false,
    pagination: false,
  });

  carousel.addEventListener('pause', () => {
    splide.Components.Autoplay.pause();
  });

  carousel.addEventListener('resume', () => {
    splide.Components.Autoplay.play();
  });

  // splide.on( 'click', function (event) {

  // } );

  // Trigger lazyloading after splide has cloned the slides
  // splide.on('ready', () => {
  //   setupLazyLoading(carousel.querySelector);
  // })

  splide.mount();

  // Auto height
  if (carousel.classList.contains('carousel--auto-height')) {
    const autoHeight = () => {
      let activeSlide = splide.Components.Elements.slides[splide.index];
      gsap.set(carousel.querySelector('.splide__list'), {
        height: activeSlide.offsetHeight,
      });
    };
    autoHeight();
    splide.on('move', (e) => {
      autoHeight();
      let cs = document.querySelector('.carousel-counter__status');
      // cs.innerHTML = splide.index + 1;
    });
  }

  // Click to change slide
  if (carousel.classList.contains('carousel--click-to-next')) {
    let nextButtons = document.querySelectorAll('.carousel');
    if (nextButtons) {
      nextButtons.forEach((item) => {
        // Get the width of the div
        const divWidth = item.clientWidth;
        item.addEventListener('click', function (event) {
          // Get the horizontal position of the click event
          var clickX = event.clientX - item.getBoundingClientRect().left;

          // Calculate the distance from the left and right edges
          var distanceToLeft = clickX;
          var distanceToRight = divWidth - clickX;

          if (distanceToLeft < distanceToRight) {
            splide.go('<');
          } else {
            splide.go('>');
          }
        });
        item.addEventListener('mousemove', function (event) {
          // Get the horizontal position of the cursor within the div
          var cursorX = event.clientX - this.getBoundingClientRect().left;

          // Calculate the distance from the cursor to the left and right edges
          var distanceToLeft = cursorX;
          var distanceToRight = divWidth - cursorX;

          if (distanceToLeft < distanceToRight) {
            console.log('Cursor is closer to the left side of the div');
            item.setAttribute('data-mouse', 'left');
          } else {
            console.log('Cursor is closer to the right side of the div');
            item.setAttribute('data-mouse', 'right');
          }
        });
      });
    }
  }
}
// --------------------------------------------------
// Appearing content
// --------------------------------------------------

let contactTemplate = document.querySelector('.template-page-contact');

if (contactTemplate) {
  const container = document.querySelector('.appearing-container');
  const hiddenImage = document.querySelector('#hiddenImage picture');
  let isCursorInside = true;

  // Function to create and animate the "here i am" div
  function createHereIAmDiv() {
    const div = document.createElement('div');
    div.classList.add('here-i-am');
    const imageClone = hiddenImage.cloneNode(true); // Clone the hidden picture
    div.appendChild(imageClone);
    container.appendChild(div);

    const randomX = Math.random() * (window.innerWidth - 200);
    const randomY = Math.random() * (window.innerHeight - 50);

    gsap.set(div, { x: randomX, y: randomY });

    gsap.to(div, { duration: 1, opacity: 1 });
  }

  // Function to animate the image once when the cursor leaves the screen
  function animateImageOnce() {
    gsap.to('.here-i-am picture', {
      // Selecting <picture> elements
      duration: 1,
      opacity: 0,
      onComplete: () => {
        document.querySelectorAll('.here-i-am').forEach((div) => {
          container.removeChild(div);
        });
      },
    });
  }

  // Function to handle cursor enter and leave events
  function handleCursorActivity() {
    document.addEventListener('mouseenter', () => {
      isCursorInside = true;
      gsap.to('.here-i-am', {
        duration: 1,
        opacity: 0,
        onComplete: () => {
          document.querySelectorAll('.here-i-am').forEach((div) => {
            container.removeChild(div);
          });
        },
      });
    });

    document.addEventListener('mouseleave', () => {
      isCursorInside = false;
      animateImageOnce(); // Animate the image once when the cursor leaves
    });

    // setInterval(() => {
    //   if (!isCursorInside) {
    //     createHereIAmDiv();
    //   }
    // }, 6000);
  }

  // Start listening for cursor activity
  handleCursorActivity();
} else {
  const container = document.querySelector('.appearing-container');
  const hereIAmTexts = [
    'Beauty vibrates over things,<br>rests softly over aging metals.',
    'Mornings of <i>coladitos</i> y<br><i>mi amor cómo es que tú estás</i>?',
    'The air is a slap of steam in your face,<br>storm clouds spread like wildfire as you drive.',
  ];
  let isCursorInside = true;

  // Function to create and animate the "here i am" div
  function createHereIAmDiv() {
    const div = document.createElement('div');
    div.classList.add('here-i-am');
    const randomIndex = Math.floor(Math.random() * hereIAmTexts.length);
    div.innerHTML = hereIAmTexts[randomIndex];
    container.appendChild(div);

    const randomX = Math.random() * (window.innerWidth - 200);
    const randomY = Math.random() * (window.innerHeight - 50);

    gsap.set(div, { x: randomX, y: randomY });

    gsap.to(div, { duration: 1, opacity: 1 });
  }

  // Function to handle cursor enter and leave events
  function handleCursorActivity() {
    document.addEventListener('mouseenter', () => {
      isCursorInside = true;
      gsap.to('.here-i-am', {
        duration: 1,
        opacity: 0,
        onComplete: () => {
          document.querySelectorAll('.here-i-am').forEach((div) => {
            container.removeChild(div);
          });
        },
      });
    });

    document.addEventListener('mouseleave', () => {
      isCursorInside = false;
    });

    setInterval(() => {
      if (!isCursorInside) {
        createHereIAmDiv();
      }
    }, 6000);
  }

  // Start listening for cursor activity
  handleCursorActivity();
}
