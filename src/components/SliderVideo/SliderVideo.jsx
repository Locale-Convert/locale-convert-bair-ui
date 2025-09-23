import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import VideoControlWithoutPause from "../VideoContainer/VideoControlWithoutPause";
import arrowLeft from "../../images/smallArrowLeft.svg";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";

const breakpoints = {
  320: { slidesPerView: 1.1, spaceBetween: 10 },
  375: { slidesPerView: 1.2, spaceBetween: 12 },
  400: { slidesPerView: 1.3, spaceBetween: 14 },
  430: { slidesPerView: 1.4, spaceBetween: 15 },
  480: { slidesPerView: 1.5, spaceBetween: 15 },
  520: { slidesPerView: 1.6, spaceBetween: 16 },
  576: { slidesPerView: 1.7, spaceBetween: 16 },
  640: { slidesPerView: 2, spaceBetween: 18 },
  768: { slidesPerView: 2.2, spaceBetween: 20 },
  900: { slidesPerView: 2.5, spaceBetween: 20 },
  1024: { slidesPerView: 2.6, spaceBetween: 20 },
  1200: { slidesPerView: 3, spaceBetween: 20 },
  1440: { slidesPerView: 3.5, spaceBetween: 25 },
  1600: { slidesPerView: 4, spaceBetween: 30 },
};

const SliderVideo = ({ videoSlider = [] }) => {
  const swiperRef = useRef(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    swiper.params.centeredSlides = !isMobile;
    swiper.params.spaceBetween = isMobile ? 15 : 20;
    swiper.update();
  }, [isMobile]);

  const handlePrev = () => {
    const s = swiperRef.current;
    if (!s || s.animating) return;
    s.slidePrev();
  };

  const handleNext = () => {
    const s = swiperRef.current;
    if (!s || s.animating) return;
    s.slideNext();
  };

  const handleSlideClick = (index) => {
    if (!isMobile && index !== activeIndex) {
      setActiveIndex(index);
      swiperRef.current.slideToLoop(index); // активуємо слайд у Swiper
    }
  };

  return (
    <div className="slider-video-wrapper">
      <div className="slider-header-video">
        <h2 className="slider-title-video">Вiдео</h2>
        <div className="slider-nav-video mobile-only">
          <button className="custom-prev-video" onClick={handlePrev}>
            <img src={arrowLeft} alt="Prev" />
          </button>
          <button className="custom-next-video" onClick={handleNext}>
            <img src={arrowLeft} alt="Next" className="rotate-video" />
          </button>
        </div>
      </div>

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        breakpoints={breakpoints}
        slidesPerView={isMobile ? 1.2 : 1}
        spaceBetween={isMobile ? 15 : 20}
        centeredSlides={!isMobile}
        slidesOffsetBefore={0}
        slidesOffsetAfter={20}
        slidesPerGroup={1}
        grabCursor={true}
        loop={!isMobile} 
        initialSlide={!isMobile ? Math.floor(videoSlider.length / 2) : 0}
        speed={500}
        className="slider-video"
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        observer={true}
        observeParents={true}
      >
        {videoSlider.map((item, index) => (
          <SwiperSlide
            key={index}
            className={!isMobile && index === activeIndex ? "active-slide" : ""}
          >
            <div
              className="video-slide-wrapper-video"
              onClick={() => handleSlideClick(index)}
            >
              <VideoControlWithoutPause
                videoUrl={item.url}
                isActive={index === activeIndex}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderVideo;
