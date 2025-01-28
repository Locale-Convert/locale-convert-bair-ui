import React, { useState, useEffect } from "react";
import "../../styles/style.css";
import { GatsbyImage } from "gatsby-plugin-image";
import { getImageHelper } from "../../hooks";

const RelatedProducts = ({ data, title, colorSlider }) => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const determineScreenSize = () => {
      const initialView = window.innerWidth < 600;
      setIsMobileView(initialView);
    };

    determineScreenSize();

    const handleWindowResize = () => {
      setIsMobileView(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const getLowestPrice = (colorSlider) => {
    if (!colorSlider || colorSlider.length === 0) return null;

    const prices = colorSlider.map(item => parseFloat(item.colorPrice)).filter(price => !isNaN(price));
    return prices.length ? Math.min(...prices) : null;
  };



  return (
    <div className="main_catalog-box wrapper">
      <div className="main-title">{title}</div>
      <div className="main_catalog-box-items">
        {data.map((item, index) => {
          // Выбираем мобильное или десктопное изображение в зависимости от ширины экрана
          const currentImage = isMobileView
            ? item.mainImg?.mobileImage
            : item.mainImg?.desktopImage;

          const imageAlt = currentImage?.alternativeText || `Конверт Bair ${item.title}`;

          const lowestPrice = getLowestPrice(item.colorSlider);

          const finalPrice = lowestPrice !== null ? lowestPrice : item.price;

          return (
            <a key={index} href={`/${item.url}/`} className="main_catalog-box-item">
              <div className="stickers">
                {item?.stickerNew ? <div className="sticker green">{item.stickerNewTitle ? item.stickerNewTitle : 'НОВИНКА 2025'}</div> : null}
                {item?.stickerBlackFriday ? <div className="sticker black">{item.stickerBlackFridayTitle ? item.stickerBlackFridayTitle : 'ЧОРНА П\'ЯТНИЦЯ'}</div> : null}
                {item?.stickerSale ? <div className="sticker yellow">{item.coloStickerSaleTitle ? item.coloStickerSaleTitle : item.stickerSaleTitle}</div> : null}
              </div>
              <div className="main_catalog-box-item-image">
                <GatsbyImage
                  image={getImageHelper(currentImage)}
                  className="image-width"
                  alt={imageAlt}
                  objectFit="contain"
                />
              </div>
              <div className="main_catalog-box-item-text">
                <div className="main_catalog-box-item-title">{item.title}</div>
                <div className="main_catalog-box-item-price-box">
                  {item.oldPrice && !item.isPriceFrom ? (
                    <>
                      <div className="main_catalog-box-item-old-price">{item.oldPrice} грн</div>
                      <div className="main_catalog-box-item-price">{item.price} грн</div>
                    </>
                  ) : (
                    <div className="main_catalog-box-item-price">{item.isPriceFrom ? 'від' : ''} {finalPrice && item.isPriceFrom ? finalPrice : item.price} грн</div>
                  )}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;

