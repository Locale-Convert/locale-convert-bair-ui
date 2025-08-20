import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "./style.css";

const ProductsSlider = ({ data }) => {
  return (
    <div className="products-slider">
      <h2 className="products-title">Конверти</h2>
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
                {item.isNew && <span className="badge new">НОВИНКА</span>}
                {item.discount && (
                  <span className="badge discount">-{item.discount}%</span>
                )}
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
  );
};

export default ProductsSlider;
