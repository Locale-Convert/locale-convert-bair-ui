import React from "react"
import { StaticImage } from "gatsby-plugin-image"

import { Swiper,SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const SliderPromoSlider = ({ data }) => {
  return (
    <>
      <div className={"wrapper-slider"} id={"reviews"}>
        <h2 className={"main-title accordion-main-title"}>Фото-відгуки</h2>
        <Swiper
          navigation={true}
          initialSlide={0}
          slidesPerView={1.5}
          breakpoints={{
            1440: {
              slidesPerView: 5.1,
            },
            1024: {
              slidesPerView: 3,
            },
            666: {
              slidesPerView: 3,
            },
            500: {
              slidesPerView: 1.5,
            }
          }}
          modules={[Pagination, Navigation]}
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
      <SwiperSlide>
      <div className="three-itempage__max-item three-itempage__max-item-wrapper">
      <StaticImage
      src="../../images/instagram/otzyv-10-i.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="three-itempage__max-item three-itempage__max-item-wrapper">
      <StaticImage
      src="../../images/instagram/otzyv-12.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="three-itempage__max-item three-itempage__max-item-wrapper">
      <StaticImage
      src="../../images/instagram/otzyv-12-i.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="three-itempage__max-item three-itempage__max-item-wrapper">
      <StaticImage
      src="../../images/instagram/otzyv-13.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="three-itempage__max-item three-itempage__max-item-wrapper">
      <StaticImage
      src="../../images/instagram/otzyv-13-i.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="three-itempage__max-item three-itempage__max-item-wrapper">
      <StaticImage
      src="../../images/instagram/otzyv-14.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="three-itempage__max-item three-itempage__max-item-wrapper">
      <StaticImage
      src="../../images/instagram/otzyv-14-i.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="three-itempage__max-item three-itempage__max-item-wrapper">
      <StaticImage
      src="../../images/instagram/otzyv-15.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="three-itempage__max-item three-itempage__max-item-wrapper">
      <StaticImage
      src="../../images/instagram/otzyv-15-i.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="three-itempage__max-item three-itempage__max-item-wrapper">
      <StaticImage
      src="../../images/instagram/otzyv-16.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="three-itempage__max-item three-itempage__max-item-wrapper">
      <StaticImage
      src="../../images/instagram/otzyv-17-i.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="three-itempage__max-item three-itempage__max-item-wrapper">
      <StaticImage
      src="../../images/instagram/otzyv-18.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="three-itempage__max-item three-itempage__max-item-wrapper">
      <StaticImage
      src="../../images/instagram/otzyv-18-i.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="three-itempage__max-item three-itempage__max-item-wrapper">
      <StaticImage
      src="../../images/instagram/otzyv-19.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="three-itempage__max-item three-itempage__max-item-wrapper">
      <StaticImage
      src="../../images/instagram/otzyv-19-i.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div  className="three-itempage__max-item three-itempage__max-item-wrapper">
      <StaticImage
      src="../../images/instagram/otzyv-01.jpg"
      className="instagram-image"
      alt="відгук на конверти bair"
      objectFit="contain"
      />
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div  className="three-itempage__max-item three-itempage__max-item-wrapper">
      <StaticImage
      src="../../images/instagram/otzyv-01-i.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
      <StaticImage
      src="../../images/instagram/otzyv-02.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </div>
      </SwiperSlide>
      <SwiperSlide className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
      <StaticImage
      src="../../images/instagram/otzyv-02-i.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </SwiperSlide>
      <SwiperSlide className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
      <StaticImage
      src="../../images/instagram/otzyv-03.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </SwiperSlide>
      <SwiperSlide className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
      <StaticImage
      src="../../images/instagram/otzyv-03-i.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </SwiperSlide>
      <SwiperSlide className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
      <StaticImage
      src="../../images/instagram/otzyv-04.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </SwiperSlide>
      <SwiperSlide className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
      <StaticImage
      src="../../images/instagram/otzyv-04-i.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </SwiperSlide>
      <SwiperSlide className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
      <StaticImage
      src="../../images/instagram/otzyv-05.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </SwiperSlide>
      <SwiperSlide className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
      <StaticImage
      src="../../images/instagram/otzyv-05-i.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </SwiperSlide>
      <SwiperSlide className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
      <StaticImage
      src="../../images/instagram/otzyv-06.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </SwiperSlide>
      <SwiperSlide className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
      <StaticImage
      src="../../images/instagram/otzyv-06-i.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </SwiperSlide>
      <SwiperSlide className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
      <StaticImage
      src="../../images/instagram/otzyv-07.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </SwiperSlide>
      <SwiperSlide className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
      <StaticImage
      src="../../images/instagram/otzyv-07-i.jpg"
      className="instagram-image"
      alt="Відгук з Instagram про зимові конверти Bair"
      objectFit="contain"
      />
      </SwiperSlide>
          </Swiper>
      </div>
    </>
  )
}

export default SliderPromoSlider

