import React, { useState, useEffect, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GatsbyImage } from "gatsby-plugin-image";
import { getImageHelper } from "../../hooks";

const MainSlider = ({ sliderImage, selectedIndex, changeItemSlider }) => {
    const [currentSlide, setCurrentSlide] = useState(selectedIndex);
    const [totalSlides, setTotalSlides] = useState(0);

    useEffect(() => {
        setTotalSlides(sliderImage.length);
    }, [sliderImage]);

    const settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        beforeChange: (oldIndex, newIndex) => {
            setCurrentSlide(newIndex);
            changeItemSlider(newIndex);
        },
        easing: "linear",
        initialSlide: selectedIndex
    };

    const sliderRef = useRef(null);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(selectedIndex, false); // Викликаємо метод slickGoTo з анімацією вимкненою
            setCurrentSlide(selectedIndex);
            setTotalSlides(sliderImage.length);
        }
    }, [selectedIndex, sliderImage]);
    return (
        <>
            <Slider {...settings} ref={sliderRef} initialSlide={selectedIndex} className="mySwiper" id="thumbnail_slider">
                {sliderImage.map((item, index) => (
                    <div key={index}>
                        <GatsbyImage
                            image={getImageHelper(item)}
                            className={"main-slider-image"}
                            alt="Main Slider Image"
                            objectFit="cover"
                        />
                    </div>
                ))}
            </Slider>
            <div className='current-slide'>{currentSlide + 1} / {totalSlides}</div>
        </>
    );
};

export default MainSlider;
