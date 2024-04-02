import React from "react";
import { 
    Swiper,
    SwiperSlide 
}                         from "swiper/react";
import { GatsbyImage }    from "gatsby-plugin-image";
import { getImageHelper } from "../../hooks";

const VerticalSlider = ({ sliderImage, selectedItemForMainSlider, changeItemSlider }) => {
    return (
        <div className="vertical-swiper-container">
            <Swiper
                direction="vertical"
                spaceBetween={5}
                slidesPerView={4}
                slidesPerGroup={1}
                mousewheel={true}
                className="vertical-swiper"
            >
                {sliderImage.map((item, index) => (
                    <SwiperSlide key={index} style={{ minHeight:'120px' }}>
                        <div
                            className={`${selectedItemForMainSlider === index ? "icon-select-item" : ""}`}
                            onClick={(event) => {
                                event.stopPropagation();
                                changeItemSlider(index);
                            }}
                        >
                            <GatsbyImage
                                image={getImageHelper(item)}
                                className={"three-itempage__max-item-img"}
                                alt="This is a picture of my face."
                                objectFit="cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default VerticalSlider;
