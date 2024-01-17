import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Splide from '@splidejs/splide';
import LazyLoad from "vanilla-lazyload";


// --------------------------------------------------
// 🐌 General
// --------------------------------------------------

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({
  ease: 'power1.inOut',
  duration: .5
})

// --------------------------------------------------
// 💤 Lazy Loading
// --------------------------------------------------

const lazyLoadInstance = new LazyLoad({
  // Your custom settings go here
  elements_selector: "[data-lazy]",
  callback_loaded: (el) => {
    el.style.opacity = '1';
    el.style.visibility = 'initial'
  }
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
    gsap.set(animatedIntroItems, { autoAlpha: 0});
    // Your GSAP timeline animation code goes here
    const tl = gsap.timeline();
  
    // Target the middle div and scale it
    tl.to('.animated-intro-text', {ease: "power1.inOut", duration: .6, autoAlpha: 1 });
    tl.to('.animated-intro-text', {ease: "power1.inOut", duration: .6, autoAlpha: 0 }, '+=1.2');
  
    // Target the middle div and scale it
    tl.to('.header__heading.animated-header-item', {ease: "power1.inOut", delay: 0.1, duration: .5, autoAlpha: 1 }, '-=0.3');
  
    // Add a delay before targeting the divs before and after the middle div
    tl.to(gsap.utils.toArray('.header .animated-header-item')[1], {ease: "power1.inOut", duration: .5, autoAlpha: 1 }, '-=0.1');
    tl.to(gsap.utils.toArray('.header .animated-header-item')[3], {ease: "power1.inOut", duration: .5, autoAlpha: 1 }, '-=0.6');
  
    // Add a delay before targeting the divs before and after the previously targeted divs
    tl.to(gsap.utils.toArray('.header .animated-header-item')[0], {ease: "power1.inOut", duration: .5, autoAlpha: 1 }, '-=0.1');
    tl.to(gsap.utils.toArray('.header .animated-header-item')[4], {ease: "power1.inOut", duration: .5, autoAlpha: 1 }, '-=0.6');
  
    // Add a delay before targeting the divs before and after the previously targeted divs
    tl.to(gsap.utils.toArray('.animated-intro-item.animated-intro-item--other'), {ease: "power1.inOut", duration: .5, autoAlpha: 1 }, '+=0.4');
  }

  // Mark the website as visited in the session
  sessionStorage.setItem('hasVisitedAnyPage', 'true');
};

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
    updateOnMove: true
  });

  bannerSplide.mount();
}

// --------------------------------------------------
// Reveal text scrolltrigger
// --------------------------------------------------

const texts = gsap.utils.toArray(document.querySelectorAll('.reveal, .shopify-policy__container'));

gsap.set(texts, { autoAlpha: 0 });

texts.forEach((text, i) => {

  const anim = gsap.to(text, {
    autoAlpha: 1,
    duration: .6,
    stagger: 0.0,
    ease: "power1.inOut",
    paused: true,
    delay: .3
  });

  // Use callbacks to control the state of the animation
  ScrollTrigger.create({
    trigger: text,
    start: "top 90%",
    once: false,
    onEnter: self => {
      // If it's scrolled past, set the state
      // If it's scrolled to, play it
      anim.play()
    }
  });

  ScrollTrigger.create({
    trigger: text,
    start: "top bottom",
    onLeaveBack: () => anim.pause(0)
  });

});

// --------------------------------------------------
// Mega menu
// --------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector('.header');
  const fauxBackground = document.querySelector('.faux-background');
  const megaMenuTriggers = document.querySelectorAll('.mega-menu');
  const megaMenus = document.querySelectorAll('.mega-menu__content');

  megaMenuTriggers.forEach(trigger => {
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
               tl.to(fauxBackground, {ease: "power1.inOut", duration: 0.3, opacity: 1 });
              tl.to(megaMenu, {ease: "power1.inOut", opacity: 1, display: 'block', duration: 0.3}, '-=.3');

              // gsap.to(header, { duration: 0.3, backgroundColor: '#fff' });
              // gsap.to(megaMenu, { opacity: 1, display: 'block', duration: 0.3, backgroundColor: '#fff' });
              // gsap.from(megaMenu.children, { opacity: 0, stagger: 0.1, duration: 0.5 });
          }
      }

      function hideMegaMenu() {
          if (!isMouseOverTrigger && !isMouseOverMenu) {
            const tl = gsap.timeline();
              tl.to(fauxBackground, {ease: "power1.inOut", duration: 0.3, opacity: 0 });
              tl.to(megaMenu, { opacity: 0, display: 'none', duration: 0.3}, '-=.3');
          }
      }
  });
});

// --------------------------------------------------
// Product pop-up modal
// --------------------------------------------------

document.addEventListener('DOMContentLoaded', function () {
  const modalButtons = document.querySelectorAll('.product-popup-modal__button');

  modalButtons.forEach(function (button) {
      button.addEventListener('click', function () {
          const modalId = button.getAttribute('data-id');
          openModal(modalId);
      });
  });

  function openModal(modalId) {
      const modal = document.querySelector(`[data-id="${modalId}"]`);
      const modalText = modal.querySelector('.product-popup-modal__content');

      modal.style.display = 'block';
      gsap.to(modalText, { scale: 1, duration: 0.5 });

      // Close modal when clicking outside the modal content
      modal.addEventListener('click', function (event) {
          if (event.target === modal) {
              closeModal(modalId);
          }
      });

      // Prevent scrolling on the body
      document.body.style.overflow = 'hidden';
  }

  function closeModal(modalId) {
      const modal = document.querySelector(`[data-id="${modalId}"]`);
      const modalText = modal.querySelector('.product-popup-modal__content');

      gsap.to(modalText, { scale: 0, duration: 0.5, onComplete: function () {
          modal.style.display = 'none';
      }});

      // Allow scrolling on the body
      document.body.style.overflow = 'auto';
  }
});
