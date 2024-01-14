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

const texts = gsap.utils.toArray(".reveal");

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