import React, { useRef, useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { GatsbyImage } from "gatsby-plugin-image";
import { getImageHelper } from "../../hooks";
import { PlayCircleFilledWhite } from '@mui/icons-material';

import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@mui/icons-material';
import "./style.css";

const SliderMiniature = ({ sliderImage, selectedIndex, changeItemSlider, videoUrl }) => {
    const thumbnailSliderRef = useRef(null);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    useEffect(() => {
        if (!thumbnailSliderRef.current) return;

        const slider = thumbnailSliderRef.current.innerSlider;
        const currentSlide = slider.state.currentSlide;
        const slidesToShow = slider.props.slidesToShow;

        if (selectedIndex < currentSlide || selectedIndex >= currentSlide + slidesToShow) {
            thumbnailSliderRef.current.slickGoTo(selectedIndex);
        }
    }, [selectedIndex]);

    const handleClick = (index) => {
        if (index !== selectedIndex) {
            changeItemSlider(index);
        }
    };

    const NextArrow = ({ style, onClick }) => (
        <div className="vertical-arrow vertical-next" style={{ ...style }} onClick={onClick}>
            <KeyboardArrowDownRounded />
        </div>
    );

    const PrevArrow = ({ style, onClick }) => (
        <div className="vertical-arrow vertical-prev" style={{ ...style }} onClick={onClick}>
            <KeyboardArrowUpRounded />
        </div>
    );

    const settings = {
        dots: false,
        infinite: true,
        speed: 300,
        vertical: true,
        verticalSwiping: true,
        waitForAnimate: true,
        slidesToShow: videoUrl ? 4 : 5, // якщо є відео, показуємо 4
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        afterChange: index => changeItemSlider(index)
    };

    return (
        <div className="slider-miniature-container">
            {videoUrl && (
                <div
                    className="thumbnail-item video-thumbnail"
                    onClick={() => setIsVideoOpen(true)}
                >
                    <GatsbyImage
                        image={getImageHelper(sliderImage[0])}
                        className="thumbnail-image"
                        alt="Video Thumbnail"
                        objectFit="cover"
                    />
                    <PlayCircleFilledWhite className="video-play-icon" />
                </div>
            )}

            <Slider {...settings} ref={thumbnailSliderRef} className="vertical-slider">
                {sliderImage.map((item, index) => (
                    <div
                        key={index}
                        className={`thumbnail-item ${index === selectedIndex ? "selected" : ""}`}
                        onClick={() => handleClick(index)}
                    >
                        <GatsbyImage
                            image={getImageHelper(item)}
                            className="thumbnail-image"
                            alt="Thumbnail"
                            objectFit="cover"
                        />
                    </div>
                ))}
            </Slider>

            {isVideoOpen && (
                <div className="video-modal">
                    <div
                        className="modal-video-overlay"
                        onClick={() => setIsVideoOpen(false)}
                    />
                    <div className="video-content">
                        <iframe
                            src={`${videoUrl}?autoplay=1&mute=1&controls=1`}
                            id="myVideo"
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            className="product-video-promo"
                        ></iframe>
                        <button
                            className="close-button"
                            onClick={() => setIsVideoOpen(false)}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SliderMiniature;
