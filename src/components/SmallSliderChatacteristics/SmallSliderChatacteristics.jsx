import React from "react"
import "swiper/css";
import "swiper/css/pagination";
import { navigate } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image"
import { getImageHelper } from "../../hooks"

import { Swiper,SwiperSlide } from "swiper/react";


const SmallSliderChatacteristics = ({data}) => {
  return (
    <>
        <div className="vertical-swiper-container">
            <Swiper
                direction="vertical"
                spaceBetween={5}
                slidesPerView={4}
                mousewheel={true}
                navigation={{
                }}
                onSlideChange={(swiper) => {
                    const index = swiper.activeIndex;
                }}
            >
                {data.map((item, index) => (
                <SwiperSlide key={index}>
                    <div className={"vertical-slide"}>
                    <div className={"vertical-image"}>
                        <GatsbyImage
                        image={getImageHelper(item)}
                        className={"three-itempage__max-item-img"}
                        alt=""
                        objectFit="cover"
                        />
                    </div>
                    <div className={"icon-title"}>{item.color}</div>
                    </div>
                </SwiperSlide>
                ))}
            </Swiper>
        </div>
    </>
  )
}

export default SmallSliderChatacteristics
