import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import VideoControlWithoutPause from "../VideoContainer/VideoControlWithoutPause";
import arrowLeft from "../../images/smallArrowLeft.svg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";

const breakpoints = {
  420: { slidesPerView: 1, spaceBetween: 10 },
  666: { slidesPerView: 2.2, spaceBetween: 15 },
  1024: { slidesPerView: 2.6, spaceBetween: 20 },
  1440: { slidesPerView: 3.5, spaceBetween: 10 },
};

const SliderVideo = ({ videoSlider = [] }) => {
  const swiperRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="slider-video-wrapper">
      <div className="slider-header-video">
        <h2 className="slider-title-video">Вiдео</h2>
        <div className="slider-nav-video mobile-only">
          <button
            className="custom-prev-video"
            onClick={() => swiperRef.current?.swiper.slidePrev()}
          >
            <img src={arrowLeft} alt="Prev" />
          </button>
          <button
            className="custom-next-video"
            onClick={() => swiperRef.current?.swiper.slideNext()}
          >
            <img src={arrowLeft} alt="Next" className="rotate-video" />
          </button>
        </div>
      </div>

      <Swiper
        ref={swiperRef}
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        initialSlide={2}
        navigation={{
          nextEl: ".custom-next-video",
          prevEl: ".custom-prev-video",
        }}
        breakpoints={breakpoints}
        centeredSlides={!isMobile}
        grabCursor={true}
        slidesPerView={1.2}
        spaceBetween={20}
        className="slider-video"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
      >
        {videoSlider.map((item, index) => (
          <SwiperSlide
            key={index}
            className={!isMobile && index === activeIndex ? "active-slide" : ""}
          >
            <div className="video-slide-wrapper-video">
              <VideoControlWithoutPause videoUrl={item.url} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderVideo;
