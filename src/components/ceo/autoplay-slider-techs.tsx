"use client"

import { JSX, useRef} from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import styles from './autoplay-slider-techs.module.css';

// import required modules
import  { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { TechProject } from '@/core/domain/entities/project';
import { useLocale } from 'next-intl';
import { IntlKey } from '@/core/domain/entities/intl';
import { DynamicSimpleIcon, SimpleIconNames } from '../oth/dyn/dynamic-si';


type AutoplaySliderProps = {
    delay?: number;
    disableOnInteraction?: boolean;
    data: TechProject[];
  }


const AutoplaySliderTechs: React.FC<AutoplaySliderProps> = ({
    delay = 5500,
    disableOnInteraction = false,
    data
  }) => {
  const progressCircle = useRef<SVGSVGElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);
  const locale = useLocale()
  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', String(1 - progress));
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };
  return (

      <Swiper
      breakpoints={{
        320: {
            slidesPerView: 1,
            spaceBetween: 15
        },
        // 768: {
        //     slidesPerView: 4,
        //     spaceBetween: 15
        // },
        // 1024: {
        //     slidesPerView: 6,
        //     spaceBetween: 15
        // }
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

        {data.map((tech)=> 
        {const shouldRenderParagraph = tech?.version && tech?.version.trim() !== '';
          return (<SwiperSlide key={tech.nameBadge} className={styles.swiperSlide}>
            {<DynamicSimpleIcon iconName={`Si${tech.nameBadge.at(0)?.toLocaleUpperCase + tech.nameBadge.slice(1)}` as SimpleIconNames} className="w-8 h-8" />}
                    <div className="flex flex-col">
                      <span className='text-xl'> {tech.nameId} {shouldRenderParagraph && tech.version} </span>
                      <span className="text-xs"><i>{tech.typeDesc[locale as IntlKey]}</i></span>
                    </div>

          </SwiperSlide>)}
        )}
        
      
        <div className={`${styles.autoplayProgress} text-secondary-400/20`} slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span className='stroke-secondary-800' ref={progressContent}></span>
        </div>
      </Swiper>
  
  );
}


export default AutoplaySliderTechs;