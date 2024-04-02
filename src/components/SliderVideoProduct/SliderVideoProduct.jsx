import React, { useEffect, useRef } from "react"
import { Swiper,SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import VideoControlWithoutPause from "../VideoContainer/VideoControlWithoutPause"
import "swiper/css";
import "swiper/css/pagination";

const SliderVideoProduct = ({videoSlider = "", title, classTitle, classSlider = "", breakpoints }) => {
  const swiperRef = useRef(null);

  useEffect(() => {
    // Перевірка, чи є тільки один слайд у Swiper
    if (swiperRef.current) {
      const swiperWrapper = swiperRef.current.el.querySelector('.swiper-wrapper');
      if (swiperWrapper && swiperWrapper.childElementCount === 1) {
        swiperWrapper.classList.add('single-slide'); // Додаємо клас для одного слайда
      }
    }
  }, [videoSlider]);

  return (
    <>
      <div className={`${(classSlider && videoSlider.length === 1) ? classSlider : 'desc-video-box'}`}>
        { !!videoSlider.length > 0 ? (
          <div>
            <h2 className={classTitle}>{title}</h2>
            <Swiper
              navigation={true}
              initialSlide={0}
              breakpoints={breakpoints}
              spaceBetween={30}
              slidesPerView={1}
              modules={[Pagination, Navigation]}
              className={`slider-instagram`}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {videoSlider.map((item,index) => (
                <SwiperSlide key={index} style={{ marginTop: 0}}>
                  <div>
                    <VideoControlWithoutPause videoUrl={item.url} />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : ""}

      </div>
    </>
  )
}

export default SliderVideoProduct

