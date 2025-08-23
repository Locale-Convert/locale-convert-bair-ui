import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import VideoControlWithoutPause from "../VideoContainer/VideoControlWithoutPause";
import arrowLeft from "../../images/smallArrowLeft.svg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";

const breakpoints = {
  420: { slidesPerView: 1.6, spaceBetween: 10 },
  666: { slidesPerView: 2.2, spaceBetween: 15 },
  1024: { slidesPerView: 2.6, spaceBetween: 20 },
  1440: { slidesPerView: 3.2, spaceBetween: 30 },
};

const SliderVideo = ({ videoSlider = [] }) => {
  const swiperRef = useRef(null);

  return (
    <div className="wrapper-video-slider">
      <div className="slider-header">
        <h2 className="slider-title">Вiдео</h2>
        <div className="slider-nav mobile-only">
          <button
            className="custom-prev"
            onClick={() => swiperRef.current?.swiper.slidePrev()}
          >
            <img src={arrowLeft} alt="Prev" />
          </button>
          <button
            className="custom-next"
            onClick={() => swiperRef.current?.swiper.slideNext()}
          >
            <img src={arrowLeft} alt="Next" className="rotate" />
          </button>
        </div>
      </div>

        <Swiper
        ref={swiperRef}
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation={{ nextEl: ".custom-next", prevEl: ".custom-prev" }}
        centeredSlides={true}
        slidesPerView={1.6} // або breakpoints
        spaceBetween={20}
        grabCursor={true}
        mousewheel={false} // якщо хочеш тільки drag
        className="slider-video"
        >
        {videoSlider.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="video-slide-wrapper">
              <VideoControlWithoutPause videoUrl={item.url} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderVideo;
