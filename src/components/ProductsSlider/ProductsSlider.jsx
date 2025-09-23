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
import { formatNumberWithSpaces } from "../../hooks/price";

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

  const isMobileGrid = !!sliderSettings.mobileAsGrid;
  const isDesktopGrid = !!sliderSettings.desktopAsGrid;

  const showNavigation = !!sliderSettings.showNavigation;
  const showPagination = sliderSettings.showPagination !== false;
  const catalogLink = sliderSettings.catalogLink || null;

  useEffect(() => {
    if (swiperRef.current && showNavigation && !isDesktopGrid) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, [showNavigation, isDesktopGrid]);

  // --------------------- Зміни для ціни "від" ---------------------
  const getLowestPrice = (item) => {
    // отримуємо всі ціни з colorSlider
    const colorPrices =
      item.colorSlider?.map((c) => parseFloat(c.colorPrice)).filter((p) => !isNaN(p)) || [];

    const basePrice = parseFloat(item.price);

    const allPrices = [...colorPrices, basePrice];
    if (!allPrices.length) return { price: basePrice, showFrom: false };

    const lowest = Math.min(...allPrices);
    const showFrom = lowest < basePrice;
    return { price: lowest, showFrom };
  };
  // ------------------------------------------------------------------

  const renderProductCard = (item) => {
    const imageData = getImage(item.mainImage?.localFile);
    const isAvailable = true;

    // --------------------- Визначаємо фінальну ціну ---------------------
    const { price: finalPrice, showFrom: showPriceFrom } = getLowestPrice(item);
    // ------------------------------------------------------------------

    return (
      <a href={`/${item.url}`} className="product-card-link">
        <div className={`product-card ${!isAvailable ? "unavailable" : ""}`}>
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
            {item.colorSlider && item.colorSlider.length > 0 && (
              <ProductColors
                colors={item.colorSlider.map((color) => color.hash)}
                maxVisible={5}
              />
            )}

            <div className="home-product-price">
              {isAvailable ? (
                <>
                  <span className="price-new">
                    {showPriceFrom ? "від " : ""}
                    {formatNumberWithSpaces(finalPrice)} грн
                  </span>
                  {!showPriceFrom && item.oldPrice && (
                    <span className="price-old">{formatNumberWithSpaces(item.oldPrice)} грн</span>
                  )}
                </>
              ) : (
                <span className="out-of-stock">Немає в наявності</span>
              )}
            </div>
          </div>
          {!isAvailable && <div className="overlay-product-card" />}
        </div>
      </a>
    );
  };

  return (
    <div
      className={`products-slider 
        ${isMobileGrid ? "mobile-grid-active" : ""} 
        ${isDesktopGrid ? "desktop-grid-active" : ""}`}
    >
      <div className="products-header">
        <h2 className="products-title">{title}</h2>

        {catalogLink && (
          <a href={catalogLink} className="catalog-link" aria-label="Перейти в каталог">
            <img src={arrowRight} alt="Перейти в каталог" />
          </a>
        )}

        {showNavigation && !isDesktopGrid && (
          <div className="slider-nav-desktop">
            <div ref={prevRef} className="ps-swiper-prev" />
            <div ref={nextRef} className="ps-swiper-next" />
          </div>
        )}
      </div>

      {!isDesktopGrid && (
        <div className="slider-desktop">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            breakpoints={breakpoints}
            navigation={
              showNavigation ? { prevEl: prevRef.current, nextEl: nextRef.current } : false
            }
            pagination={showPagination ? { clickable: true } : false}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {data.map((item, idx) => (
              <SwiperSlide key={idx}>{renderProductCard(item)}</SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

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
