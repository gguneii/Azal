import React from 'react'
import { Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide   } from 'swiper/react';

import slider1 from '../../assets/sliders/slide1.png';
import slider1lg from '../../assets/sliders/slide1lg.png';
import slider2 from '../../assets/sliders/slide2.png';
import slider2lg from '../../assets/sliders/slide2lg.png';
import slider3 from '../../assets/sliders/slide3.png';
import slider3lg from '../../assets/sliders/slide3lg.png';




import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Slider() {
  return (
    <Swiper
      modules={[Autoplay,Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      autoplay={{
        delay: 4000, 
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      className='md:w-[80%] mx-auto'
    >
        <SwiperSlide >
              <div>
                <img src={slider1} alt="x" className='sm:hidden  rounded-3xl p-2 my-2' />
                <img src={slider1lg} alt="x" className='hidden sm:block p-5  rounded-3xl mx-auto max-h-[200px]' />
              </div>      
        </SwiperSlide>
        <SwiperSlide>
            <div>
                <img src={slider2} alt="x" className='sm:hidden  rounded-3xl p-2 my-2' />
                <img src={slider2lg} alt="x" className='hidden sm:block p-5  rounded-3xl mx-auto max-h-[200px]' />
              </div>         
        </SwiperSlide>
        <SwiperSlide>
            <div>
                <img src={slider3} alt="x" className='sm:hidden  rounded-3xl p-2 my-2' />
                <img src={slider3lg} alt="x" className='hidden sm:block p-5  rounded-3xl mx-auto max-h-[200px]' />
            </div>         
        </SwiperSlide>
    </Swiper>
  )
}

export default Slider