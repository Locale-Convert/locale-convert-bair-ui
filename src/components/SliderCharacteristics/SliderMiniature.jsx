import React, { useRef, useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GatsbyImage } from "gatsby-plugin-image";
import { getImageHelper } from "../../hooks";

const SliderMiniature = ({ sliderImage, selectedIndex, changeItemSlider }) => {
    const thumbnailSliderRef = useRef(null);

    useEffect(() => {
        if (thumbnailSliderRef.current) {
            thumbnailSliderRef.current.slickGoTo(selectedIndex);
        }
    }, [selectedIndex]);


    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        vertical: true,
        verticalSwiping: true,
        waitForAnimate: true,
        slidesToShow: sliderImage.length < 4 ? sliderImage.length : 4,
        afterChange: index => {
            changeItemSlider(index);
        }
    };

    const handleClick = (index) => {
        if (index !== selectedIndex) {
            changeItemSlider(index);
        }
    };

    return (
        <Slider {...settings} ref={thumbnailSliderRef} className='vertical-slider'>
            {sliderImage.map((item, index) => (
                <div key={index} className={`thumbnail-item ${index === selectedIndex ? "selected" : ""}`} onClick={() => handleClick(index)}>
                    <GatsbyImage
                        image={getImageHelper(item)}
                        className={"thumbnail-image"}
                        alt="Thumbnail"
                        objectFit="cover"
                    />
                </div>
            ))}
        </Slider>
    );
};

export default SliderMiniature;
