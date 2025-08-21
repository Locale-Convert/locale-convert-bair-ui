import React, { useState, useEffect, useRef } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GatsbyImage } from "gatsby-plugin-image";
import { ArrowBackIosNewOutlined, ArrowForwardIosRounded } from '@mui/icons-material';
import { getImageHelper } from "../../hooks";

import "./style.css";


const MainSlider = ({ sliderImage, selectedIndex, changeItemSlider }) => {
    const [currentSlide, setCurrentSlide] = useState(selectedIndex);
    const [totalSlides, setTotalSlides] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const sliderRef = useRef(null);

    useEffect(() => {
        setTotalSlides(sliderImage.length);
    }, [sliderImage]);

    // Кастомні кнопки
    const NextArrow = ({ onClick }) => (
        <div className="custom-arrow custom-next" onClick={onClick}>
            <ArrowForwardIosRounded/>
        </div>
    );

    const PrevArrow = ({ onClick }) => (
        <div className="custom-arrow custom-prev" onClick={onClick}>
            <ArrowBackIosNewOutlined/>
        </div>
    );

    const settings = {
        dots: false,
        infinite: true,
        speed: 700,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        initialSlide: selectedIndex,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (oldIndex, newIndex) => {
            setIsAnimating(true);
            setCurrentSlide(newIndex);
        },
        afterChange: (current) => {
            changeItemSlider(current);
            setIsAnimating(false);
        },
        easing: "linear"
    };

    useEffect(() => {
        if (sliderRef.current && sliderImage.length > 0) {
            if (!isAnimating) sliderRef.current.slickGoTo(selectedIndex, true);
            setCurrentSlide(selectedIndex);
        }
    }, [selectedIndex]);

    return (
        <div className="main-slider-container">
            <Slider {...settings} ref={sliderRef} className="mySwiper" id="thumbnail_slider">
                {sliderImage.map((item, index) => (
                    <div key={index}>
                        <GatsbyImage
                            image={getImageHelper(item)}
                            className="main-slider-image"
                            alt=""
                            objectFit="cover"
                        />
                    </div>
                ))}
            </Slider>
            <div className="current-slide">{currentSlide + 1} / {totalSlides}</div>
        </div>
    );
};

export default MainSlider;
