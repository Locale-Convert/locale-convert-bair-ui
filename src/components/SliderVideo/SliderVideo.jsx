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
  420: { slidesPerView: 1.2, spaceBetween: 10 },
  666: { slidesPerView: 2.2, spaceBetween: 15 },
  1024: { slidesPerView: 2.6, spaceBetween: 20 },
  1440: { slidesPerView: 3.5, spaceBetween: 10 },
};

const SliderVideo = ({ videoSlider = [] }) => {
  const swiperRef = useRef(null); // тут зберемо сам інстанс Swiper
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // детектор мобайла
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // При зміні isMobile — оновлюємо параметри інстансу (щоб centeredSlides оновився)
  useEffect(() => {
    const swiper = swiperRef.current;
    if (!swiper) return;
    // безпечне оновлення параметрів
    swiper.params.centeredSlides = !isMobile;
    swiper.params.spaceBetween = isMobile ? 15 : 20;
    // slidesPerView може бути керований breakpoints, залишаємо як є
    swiper.update(); // переміряти слайди з новими параметрами
  }, [isMobile]);

  const handlePrev = () => {
    const s = swiperRef.current;
    if (!s) return;
    // не натискати під час анімації
    if (s.animating) return;
    s.slidePrev(); // використовує speed з props Swiper (або можна передати s.slidePrev(500))
  };

  const handleNext = () => {
    const s = swiperRef.current;
    if (!s) return;
    if (s.animating) return;
    s.slideNext();
  };

  return (
    <div className="slider-video-wrapper">
      <div className="slider-header-video">
        <h2 className="slider-title-video">Вiдео</h2>
        <div className="slider-nav-video mobile-only">
          <button
            className="custom-prev-video"
            onClick={handlePrev}
          >
            <img src={arrowLeft} alt="Prev" />
          </button>
          <button
            className="custom-next-video"
            onClick={handleNext}
          >
            <img src={arrowLeft} alt="Next" className="rotate-video" />
          </button>
        </div>
      </div>

      <Swiper
        // зберігаємо інстанс через onSwiper — це гарантує, що реф містить саме Swiper instance
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        breakpoints={breakpoints}
        // slidesPerView залишаємо базовим 1 — дробове значення задається в breakpoints або через isMobile нижче
        slidesPerView={isMobile ? 1.2 : 1}
        spaceBetween={isMobile ? 15 : 20}
        centeredSlides={!isMobile}
        slidesPerGroup={1}
        grabCursor={true}
        loop={false}
        speed={500} // базова швидкість анімації (ms)
        className="slider-video"
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        observer={true}
        observeParents={true}
      >
        {videoSlider.map((item, index) => (
          <SwiperSlide
            key={index}
            className={!isMobile && index === activeIndex ? "active-slide" : ""}
          >
            <div className="video-slide-wrapper-video">
              <VideoControlWithoutPause videoUrl={item.url} isActive={index === activeIndex} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderVideo;
