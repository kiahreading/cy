import Splide from '@splidejs/splide';
import LazyLoad from "vanilla-lazyload";


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