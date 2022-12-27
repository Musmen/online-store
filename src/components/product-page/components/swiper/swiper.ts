import './scss/swiper.scss';

import Swiper, { Thumbs } from 'swiper';

const initSwipers: () => void = () => {
  const thumbsSwiper: Swiper = new Swiper('.thumbs-swiper', {
    slidesPerView: 'auto',
    slideToClickedSlide: true,
  });

  new Swiper('.posters-swiper', {
    modules: [Thumbs],
    slidesPerView: 1,
    spaceBetween: 320,
    grabCursor: true,
    thumbs: {
      swiper: thumbsSwiper,
    },
  });
};

export default initSwipers;
