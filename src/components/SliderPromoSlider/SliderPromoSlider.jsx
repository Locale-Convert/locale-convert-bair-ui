import React from "react"
import { Swiper,SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import VideoControlWithoutPause from "../VideoContainer/VideoControlWithoutPause"
import "swiper/css";
import "swiper/css/pagination";


const SliderPromoSlider = ({videoSlider}) => {
  return (
    <>
      <div className="video-slider">
        <h2 className={"main-title slider-video-title"}>Вiдео</h2>
        <Swiper
          navigation={true}
          allowTouchMove={false}
          initialSlide={0}
          slidesPerView={1}
          breakpoints={{
            1440: {
              slidesPerView: 3.5,
            },
            1024: {
              slidesPerView: 2.5,
            },
            666: {
              slidesPerView: 2,
            },
            420: {
              slidesPerView: 1,
            }
          }}
          modules={[Pagination, Navigation]}
          className="slider-instagram"
        >
          {!!videoSlider && videoSlider.map((item,index) => (
            <SwiperSlide key={index}>
              <div className="three-itempage__max-item three-itempage__max-item-wrapper">
                <VideoControlWithoutPause  videoUrl={item.url}/>
              </div>
            </SwiperSlide>
          ))
          }
        </Swiper>
      </div>
    </>
  )
}

export default SliderPromoSlider

