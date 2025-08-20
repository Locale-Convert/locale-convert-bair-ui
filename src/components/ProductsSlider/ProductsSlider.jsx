import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import arrowRight from "../../images/arrowRight.svg";

import "swiper/css";
import "swiper/css/pagination";
import "./style.css";

const ProductsSlider = ({ data, title }) => {
  return (
    <div className="products-slider">
      <div className="products-header">
        <h2 className="products-title">{title}</h2>
        <a href="/catalog" className="catalog-link">
          <img src={arrowRight} alt="Перейти в каталог" />
        </a>
      </div>

      {/* Десктоп — слайдер */}
      <div className="slider-desktop">
        <Swiper
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={2}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1.2, spaceBetween: 15 },
            768: { slidesPerView: 2, spaceBetween: 20 },
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="product-card">
                <div className="product-image">
                  <div className="badges-wrapper">
                    {item.isNew && <span className="badge new">НОВИНКА</span>}
                    {item.discount && (
                      <span className="badge discount">-{item.discount}%</span>
                    )}
                  </div>
                  {item.warning && (
                    <span className="badge warning">{item.warning}</span>
                  )}
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="product-info">
                  <h3 className="product-title">{item.title}</h3>
                  <p className="product-desc">{item.description}</p>
                  <div className="product-colors">
                    {item.colors.map((c, i) => (
                      <span
                        key={i}
                        className="color-dot"
                        style={{ backgroundColor: c }}
                      ></span>
                    ))}
                  </div>
                  <div className="product-price">
                    <span className="price-new">{item.price} грн</span>
                    {item.oldPrice && (
                      <span className="price-old">{item.oldPrice} грн</span>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Мобільний — грід */}
      <div className="products-grid">
        {data.map((item, index) => (
          <div key={index} className="product-card">
            <div className="product-image">
              <div className="badges-wrapper">
                {item.isNew && <span className="badge new">НОВИНКА</span>}
                {item.discount && (
                  <span className="badge discount">-{item.discount}%</span>
                )}
              </div>
              {item.warning && (
                <span className="badge warning">{item.warning}</span>
              )}
              <img src={item.image} alt={item.title} />
            </div>
            <div className="product-info">
              <h3 className="product-title">{item.title}</h3>
              <p className="product-desc">{item.description}</p>
              <div className="product-colors">
                {item.colors.map((c, i) => (
                  <span
                    key={i}
                    className="color-dot"
                    style={{ backgroundColor: c }}
                  ></span>
                ))}
              </div>
              <div className="product-price">
                <span className="price-new">{item.price} грн</span>
                {item.oldPrice && (
                  <span className="price-old">{item.oldPrice} грн</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsSlider;
