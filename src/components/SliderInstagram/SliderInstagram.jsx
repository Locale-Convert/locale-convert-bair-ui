import React from "react"
import { StaticImage } from "gatsby-plugin-image"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination } from "swiper"
import arrowLeft from "../../images/smallArrowLeft.svg";

import "swiper/css"
import "swiper/css/navigation"

import './styles.css';

const breakpoints = {
  320: { slidesPerView: 1.5, spaceBetween: 10, pagination: false },
  500: { slidesPerView: 1.5, spaceBetween: 10, pagination: false },
  666: { slidesPerView: 2, spaceBetween: 0 },
  1024: { slidesPerView: 3, spaceBetween: 0 },
  1300: { slidesPerView: 4, spaceBetween: 0 },
}

const SliderInstagram = () => {
  return (
    <div className="wrapper-slider" id="reviews">
      <div className="slider-header">
        <h2 className="slider-title">Фото-відгуки</h2>

        {/* Кнопки для мобайлу */}
        <div className="slider-nav mobile-only">
          <button className="custom-prev">
            <img src={arrowLeft} alt="Prev" />
          </button>
          <button className="custom-next">
            <img src={arrowLeft} alt="Next" className="rotate" />
          </button>
        </div>
      </div>

      <Swiper
        initialSlide={0}
        slidesPerView={1.1}
        spaceBetween={10}
        breakpoints={breakpoints}
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        className="slider-instagram"
      >
        <SwiperSlide>
          <div className="three-itempage__max-item three-itempage__max-item-wrapper">
            <StaticImage
              src="../../images/instagram/otzyv-11.jpg"
              className="instagram-image"
              alt="Відгук з Instagram про зимові конверти Bair"
              objectFit="contain"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="three-itempage__max-item three-itempage__max-item-wrapper">
            <StaticImage
              src="../../images/instagram/otzyv-11-i.jpg"
              className="instagram-image"
              alt="Відгук з Instagram про зимові конверти Bair"
              objectFit="contain"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="three-itempage__max-item three-itempage__max-item-wrapper">
            <StaticImage
              src="../../images/instagram/otzyv-09.jpg"
              className="instagram-image"
              alt="Відгук з Instagram про зимові конверти Bair"
              objectFit="contain"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="three-itempage__max-item three-itempage__max-item-wrapper">
            <StaticImage
              src="../../images/instagram/otzyv-09-i.jpg"
              className="instagram-image"
              alt="Відгук з Instagram про зимові конверти Bair"
              objectFit="contain"
            />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="three-itempage__max-item three-itempage__max-item-wrapper">
            <StaticImage
              src="../../images/instagram/otzyv-10.jpg"
              className="instagram-image"
              alt="Відгук з Instagram про зимові конверти Bair"
              objectFit="contain"
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default SliderInstagram
