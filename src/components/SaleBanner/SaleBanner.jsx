import React from "react";
import './style.css';

const SaleBanner = ({ data }) => {
  const desktopImage = data?.desktopImage?.localFile?.url;
  const mobileImage = data?.mobileImage?.localFile?.url;

  return (
    <section className="sale-banner">
      <div className="sale-banner-image-wrapper">
        {desktopImage && (
          <img
            src={desktopImage}
            alt="Sale Banner Desktop"
            className="sale-banner-image desktop-only"
          />
        )}
        {mobileImage && (
          <img
            src={mobileImage}
            alt="Sale Banner Mobile"
            className="sale-banner-image mobile-only"
          />
        )}
      </div>
      <div className="sale-banner-content">
        <h1 className="sale-title">SALE</h1>
        <p className="sale-subtitle">20% на всі моделі</p>
      </div>
    </section>
  );
};

export default SaleBanner;
