import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Navigation, Pagination } from "swiper";
import arrowRight from "../../images/arrowRight.svg";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";
import ProductColors from "./ProductColors";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./style.css";

const ProductsSlider = ({ data, title, sliderSettings = {} }) => {
  const [visibleCount, setVisibleCount] = useState(sliderSettings.initialCount || 4);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  const handleShowMore = () =>
    setVisibleCount((prev) => prev + (sliderSettings.loadMoreCount || 4));
  const hasMore = visibleCount < data.length;

  const defaultBreakpoints = {
    320: { slidesPerView: 1.2, spaceBetween: 15 },
    768: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 3, spaceBetween: 20 },
    1440: { slidesPerView: 4, spaceBetween: 20 },
  };
  const breakpoints = sliderSettings.breakpoints || defaultBreakpoints;

  useEffect(() => {
    if (swiperRef.current && !sliderSettings.catalogLink) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  const renderProductCard = (item) => {
    const imageData = getImage(item.mainImage?.localFile);

    return (
      <a href={`/${item.url}`} className="product-card-link">
        <div className="product-card">
          <div className="product-image">
            <div className="badges-wrapper">
              {item.stickerNew && <span className="badge new">{item.stickerNewTitle}</span>}
              {item.stickerSale && <span className="badge discount">{item.stickerSaleTitle}</span>}
            </div>
            {item.warning && <span className="badge warning">{item.warning}</span>}
            {imageData && (
              <GatsbyImage
                image={imageData}
                alt={item.title}
                objectFit="contain"
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </div>
          <div className="product-info">
            <h3 className="product-title">{item.title}</h3>
            <p className="product-desc">{item.smallDescription}</p>
            {item.colorsHashes && <ProductColors colors={item.colorsHashes} maxVisible={5} />}
            <div className="home-product-price">
              <span className="price-new">{item.price} грн</span>
              {item.oldPrice && <span className="price-old">{item.oldPrice} грн</span>}
            </div>
          </div>
        </div>
      </a>
    );
  };

  // Налаштування гріду
  const isMobileGrid = sliderSettings.mobileAsGrid;
  const isDesktopGrid = sliderSettings.desktopAsGrid;

  return (
    <div
      className={`products-slider ${
        (isMobileGrid || isDesktopGrid) ? "force-grid" : ""
      }`}
    >
      <div className="products-header">
        <h2 className="products-title">{title}</h2>
        {sliderSettings.catalogLink && (
          <a href={sliderSettings.catalogLink} className="catalog-link">
            <img src={arrowRight} alt="Перейти в каталог" />
          </a>
        )}
        {!sliderSettings.catalogLink && !isDesktopGrid && (
          <div className="slider-nav-desktop">
            <div ref={prevRef} className="ps-swiper-prev"></div>
            <div ref={nextRef} className="ps-swiper-next"></div>
          </div>
        )}
      </div>

      {/* Desktop slider */}
      {!isDesktopGrid && (
        <div className="slider-desktop">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            breakpoints={breakpoints}
            navigation={
              sliderSettings.catalogLink
                ? false
                : { prevEl: prevRef.current, nextEl: nextRef.current }
            }
            pagination={{ clickable: true }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {data.map((item, idx) => (
              <SwiperSlide key={idx}>{renderProductCard(item)}</SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Mobile / Desktop grid */}
      {(isMobileGrid || isDesktopGrid) && (
        <div className="products-grid">
          {data.slice(0, visibleCount).map((item, idx) => (
            <div key={idx}>{renderProductCard(item)}</div>
          ))}
        </div>
      )}

      {hasMore && isMobileGrid && (
        <div className="show-more-wrapper">
          <ShowMoreButton onClick={handleShowMore} />
        </div>
      )}
    </div>
  );
};


export default ProductsSlider;
