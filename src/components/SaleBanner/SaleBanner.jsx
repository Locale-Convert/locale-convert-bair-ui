// SaleBanner.jsx
import React from "react";
import { StaticImage } from "gatsby-plugin-image";

import './style.css';

const SaleBanner = () => {
  return (
    <section className="sale-banner">
      <StaticImage
        src="../../images/saleBanner.png"
        alt="Sale Banner Desktop"
        className="sale-banner-image desktop-only"
        layout="fullWidth"
        placeholder="blurred"
      />
      <StaticImage
        src="../../images/saleBanner-mobile.png"
        alt="Sale Banner Mobile"
        className="sale-banner-image mobile-only"
        layout="fullWidth"
        placeholder="blurred"
      />
      <div className="sale-banner-content">
        <h1 className="sale-title">SALE</h1>
        <p className="sale-subtitle">20% на всі моделі</p>
      </div>
    </section>
  );
};

export default SaleBanner;
