import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Accordion from "../../components/Accordion/Accordion";
import SliderInstagram from "../../components/SliderInstagram/SliderInstagram";
import SaleBanner from "../../components/SaleBanner/SaleBanner";
import BannerWithText from "../../components/BannerWithText/BannerWithText";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";


import './style.css';
import SliderVideo from "../../components/SliderVideo/SliderVideo";

const HomePage = ({ data }) => {
  const {
    allStrapiProducts,
    allStrapiAccessories: { nodes },
    allStrapiBeds,
    strapiHomePage: { videoUrl, promoOne, promoTwo }
  } = data;

  const [isMobileView, setIsMobileView] = useState(null);
  const [isBasketView, setIsBasketView] = useState(false);

  useEffect(() => {
    const determineScreenSize = () => {
      const initialView = window.innerWidth < 600;
      setIsMobileView(initialView);
    };

    determineScreenSize();

    const handleWindowResize = () => {
      setIsMobileView(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <>
      {isMobileView ? (
        <div className={"wrapper-mobile"}>
          <Header isBasketView={isBasketView} setIsBasketView={setIsBasketView} />
          <SaleBanner />
          <div className="padding-top-bottom home-product-wrapper">
            <ProductsSlider
              data={allStrapiProducts.nodes}
              title="Коляски"
              sliderSettings={{
                breakpoints: {
                  320: { slidesPerView: 1.2, spaceBetween: 15 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 2, spaceBetween: 20 },
                  1440: { slidesPerView: 2, spaceBetween: 20 },
                },
                catalogLink: "/strollers",
                showPagination: true,
                showNavigation: false,
                mobileAsGrid: true,   // грід тільки на мобайлі
                desktopAsGrid: false, // на десктопі слайдер
              }}
              navigationOnDesktop={false}
            />
          </div>
          <BannerWithText data={promoOne} />
          <div className="padding-top-bottom home-product-wrapper">
            <ProductsSlider
              data={allStrapiProducts.nodes}
              title="Конверти"
              sliderSettings={{
                breakpoints: {
                  320: { slidesPerView: 1.2, spaceBetween: 15 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 2, spaceBetween: 20 },
                  1440: { slidesPerView: 2, spaceBetween: 20 },
                },
                catalogLink: "/strollers",
                showPagination: true,
                showNavigation: false,
                mobileAsGrid: true,   // грід тільки на мобайлі
                desktopAsGrid: false, // на десктопі слайдер
              }}
              navigationOnDesktop={false}
            />
          </div>
          <BannerWithText data={promoTwo} textStyle={{ maxWidth: '250px' }} />
          <div className="padding-top-bottom home-product-wrapper">
            <ProductsSlider
              data={allStrapiBeds.nodes}
              title="Ліжка"
              sliderSettings={{
                breakpoints: {
                  320: { slidesPerView: 1.2, spaceBetween: 15 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 2, spaceBetween: 20 },
                  1440: { slidesPerView: 2, spaceBetween: 20 },
                },
                catalogLink: "/strollers",
                showPagination: true,
                showNavigation: false,
                mobileAsGrid: true,   // грід тільки на мобайлі
                desktopAsGrid: false, // на десктопі слайдер
              }}
              navigationOnDesktop={false}
            />
          </div>
          <BannerWithText data={promoTwo} textStyle={{ maxWidth: '250px' }} />
          <SliderVideo videoSlider={videoUrl} />
          <SliderInstagram />
          <Accordion />
          {/* <CommunicationButton /> */}
          <Footer link={"#top"} />
        </div>
      ) : (
        <div className={"wrapper-mobile"}>
          <Header isBasketView={isBasketView} setIsBasketView={setIsBasketView} />
          <SaleBanner />
          <div className="banner-wrapper">
            <ProductsSlider
              data={allStrapiProducts.nodes}
              title="Коляски"
              sliderSettings={{
                breakpoints: {
                  320: { slidesPerView: 1.2, spaceBetween: 15 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 2, spaceBetween: 20 },
                  1440: { slidesPerView: 2, spaceBetween: 20 },
                },
                catalogLink: "/strollers",
                showPagination: true,
                showNavigation: false,
                mobileAsGrid: true,   // грід тільки на мобайлі
                desktopAsGrid: false, // на десктопі слайдер
              }}
              navigationOnDesktop={false}
            />
            <BannerWithText data={promoOne} />
          </div>
          <div className="banner-wrapper">
            <BannerWithText data={promoTwo} textStyle={{ maxWidth: '250px' }} />
            <ProductsSlider
              data={allStrapiProducts.nodes}
              title="Конверти"
              sliderSettings={{
                breakpoints: {
                  320: { slidesPerView: 1.2, spaceBetween: 15 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 2, spaceBetween: 20 },
                  1440: { slidesPerView: 2, spaceBetween: 20 },
                },
                catalogLink: "/strollers",
                showPagination: true,
                showNavigation: false,
                mobileAsGrid: true,   // грід тільки на мобайлі
                desktopAsGrid: false, // на десктопі слайдер
              }}
              navigationOnDesktop={false}
            />
          </div>
          <div className="banner-wrapper">
            <ProductsSlider
              data={allStrapiBeds.nodes}
              title="Ліжка"
              sliderSettings={{
                breakpoints: {
                  320: { slidesPerView: 1.2, spaceBetween: 15 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 2, spaceBetween: 20 },
                  1440: { slidesPerView: 2, spaceBetween: 20 },
                },
                catalogLink: "/strollers",
                showPagination: true,
                showNavigation: false,
                mobileAsGrid: true,   // грід тільки на мобайлі
                desktopAsGrid: false, // на десктопі слайдер
              }}
              navigationOnDesktop={false}
            />
            <BannerWithText data={promoTwo} textStyle={{ maxWidth: '250px' }} />
          </div>
          <SliderVideo videoSlider={videoUrl} />
          <SliderInstagram />
          <Accordion />
          {/* <CommunicationButton /> */}
          <Footer link={"#top"} />
        </div>

      )}


    </>
  )
}

export default HomePage





