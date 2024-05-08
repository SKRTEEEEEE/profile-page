"use client"

import { useRef} from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './autoplay-slider.module.css';

// import required modules
import  { Autoplay, Pagination, Navigation } from 'swiper/modules';

// SwiperCore.use([Autoplay, Pagination, Navigation]);

interface AutoplaySliderProps {
    delay?: number;
    disableOnInteraction?: boolean;
  }

const AutoplaySlider: React.FC<AutoplaySliderProps> = ({
    delay = 5500,
    disableOnInteraction = false,
  }) => {
  const progressCircle = useRef<SVGSVGElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);
  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', String(1 - progress));
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };
  return (
    <div className={styles.htmlz}>
    <div className={styles.bodyz}>
      <Swiper
      breakpoints={{
        320: {
            slidesPerView: 1,
            spaceBetween: 150
        },
        // 768: {
        //     slidesPerView: 2,
        //     spaceBetween: 15
        // },
        1024: {
            slidesPerView: 6,
            spaceBetween: 150
        }
    }}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay,
          disableOnInteraction,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className={`py-12 ${styles.mySwiper}`}
      >
        <SwiperSlide className={styles.swiperSlide}>Slide 1</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>Slide 2</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>Slide 3</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>Slide 4</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>Slide 1</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>Slide 2</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>Slide 3</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>Slide 4</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>Slide 1</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>Slide 2</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>Slide 3</SwiperSlide>
        <SwiperSlide className={styles.swiperSlide}>Slide 4</SwiperSlide>
        <div className={styles.autoplayProgress} slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </div></div>
  );
}


export default AutoplaySlider;