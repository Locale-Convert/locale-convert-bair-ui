import React, { useState, useEffect } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

import './style.css';

const SaleBanner = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const desktopImage = getImage(data?.desktopImage?.localFile);
  const mobileImage = getImage(data?.mobileImage?.localFile);
  const imageToShow = isMobile ? mobileImage : desktopImage;

  return (
    <section className="sale-banner">
      {imageToShow && (
        <GatsbyImage
          image={imageToShow}
          alt="Sale Banner"
          className={`sale-banner-image ${isMobile ? 'mobile-only' : 'desktop-only'}`}
        />
      )}
      <div className="sale-banner-content">
        <h1 className="sale-title">{"SALE"}</h1>
        <p className="sale-subtitle">{"20% на всі моделі"}</p>
      </div>
    </section>
  );
};

export default SaleBanner;
