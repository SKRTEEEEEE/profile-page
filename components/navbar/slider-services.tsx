"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import { lenguajesResources } from '@/data/data';

const SliderServices = () => {
    return (
        <Swiper
            breakpoints={{
                320: {
                    slidesPerView: 1,
                    spaceBetween: 15
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 15
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 15
                }
            }}
            freeMode={true}
            pagination={{
                clickable: true
            }}
            modules={[Pagination]}
            className="h-[240px] md:h-[340px] w-[270px] lg:w-[500px] md:w-[400px]"
        >
            
            <ul>
            {lenguajesResources.map((item, index) => (
                <SwiperSlide key={index} >
                    <li className="flex px-6 py-8 h-auto md:h-[290px] rounded-lg cursor-pointer bg-[rgba(65,47,123,0.15)] sm:flex-col gap-x-6 sm:gap-x-0 group hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300 hover:border-secondary border-2">
                        <div className="mb-4 text-4xl text-secondary">{item.icon}</div>
                        <div>
                            <p className="mb-4 text-lg" tabIndex={0}>{item.title}</p>
                            <p className="text-sm">{item.description}</p>
                        </div>
                    </li>
                </SwiperSlide>
            ))}</ul>
        </Swiper>
    );
}

export default SliderServices;