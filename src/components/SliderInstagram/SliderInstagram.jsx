import React from "react"
import { StaticImage } from "gatsby-plugin-image"

import { Swiper,SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { useTranslation } from 'react-i18next';
import '../../../i18n';

const SliderPromoSlider = ({ data }) => {
  const { i18n, t } = useTranslation();
  return (
    <>
      <div className={"wrapper-slider"} id={"reviews"}>
        <h2 className={"main-title accordion-main-title"}>{t('homepage.feedback.title')}</h2>
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
            <div  className="three-itempage__max-item three-itempage__max-item-wrapper">
              <StaticImage
                src="../../images/instagram/otzyv-01.jpg"
                className="instagram-image"
                alt="This is a picture of my face."
                objectFit="contain"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div  className="three-itempage__max-item three-itempage__max-item-wrapper">
              <StaticImage
                src="../../images/instagram/otzyv-01-i.jpg"
                className="instagram-image"
                alt="This is a picture of my face."
                objectFit="contain"
              />
            </div>
        </SwiperSlide>
          <SwiperSlide>
            <div className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
            <StaticImage
              src="../../images/instagram/otzyv-02.jpg"
              className="instagram-image"
              alt="This is a picture of my face."
              objectFit="contain"
            />
            </div>
          </SwiperSlide>
          <SwiperSlide className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
            <StaticImage
              src="../../images/instagram/otzyv-02-i.jpg"
              className="instagram-image"
              alt="This is a picture of my face."
              objectFit="contain"
            />
          </SwiperSlide>
          <SwiperSlide className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
            <StaticImage
              src="../../images/instagram/otzyv-03.jpg"
              className="instagram-image"
              alt="This is a picture of my face."
              objectFit="contain"
            />
          </SwiperSlide>
          <SwiperSlide className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
            <StaticImage
              src="../../images/instagram/otzyv-03-i.jpg"
              className="instagram-image"
              alt="This is a picture of my face."
              objectFit="contain"
            />
          </SwiperSlide>
          <SwiperSlide className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
            <StaticImage
              src="../../images/instagram/otzyv-04.jpg"
              className="instagram-image"
              alt="This is a picture of my face."
              objectFit="contain"
            />
          </SwiperSlide>
          <SwiperSlide className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
            <StaticImage
              src="../../images/instagram/otzyv-04-i.jpg"
              className="instagram-image"
              alt="This is a picture of my face."
              objectFit="contain"
            />
          </SwiperSlide>
          <SwiperSlide className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
            <StaticImage
              src="../../images/instagram/otzyv-05.jpg"
              className="instagram-image"
              alt="This is a picture of my face."
              objectFit="contain"
            />
          </SwiperSlide>
          <SwiperSlide className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
            <StaticImage
              src="../../images/instagram/otzyv-05-i.jpg"
              className="instagram-image"
              alt="This is a picture of my face."
              objectFit="contain"
            />
          </SwiperSlide>
          <SwiperSlide className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
            <StaticImage
              src="../../images/instagram/otzyv-06.jpg"
              className="instagram-image"
              alt="This is a picture of my face."
              objectFit="contain"
            />
          </SwiperSlide>
          <SwiperSlide className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
            <StaticImage
              src="../../images/instagram/otzyv-06-i.jpg"
              className="instagram-image"
              alt="This is a picture of my face."
              objectFit="contain"
            />
          </SwiperSlide>
          <SwiperSlide className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
            <StaticImage
              src="../../images/instagram/otzyv-07.jpg"
              className="instagram-image"
              alt="This is a picture of my face."
              objectFit="contain"
            />
          </SwiperSlide>
          <SwiperSlide className={"three-itempage__max-item three-itempage__max-item-wrapper"}>
            <StaticImage
              src="../../images/instagram/otzyv-07-i.jpg"
              className="instagram-image"
              alt="This is a picture of my face."
              objectFit="contain"
            />
          </SwiperSlide>
          </Swiper>
      </div>
    </>
  )
}

export default SliderPromoSlider

