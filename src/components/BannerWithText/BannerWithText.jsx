// BannerWithText.jsx
import React, { useEffect, useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import './style.css';

const BannerWithText = ({ data, textStyle = {} }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const desktopImage = getImage(data?.desktopImage?.localFile);
  const mobileImage = getImage(data?.mobileImage?.localFile);
  const imageToShow = isMobile ? mobileImage : desktopImage;

  return (
    <section className="banner-with-text">
      {imageToShow && (
        <GatsbyImage
          image={imageToShow}
          alt={data.text || "Banner"}
          className="banner-image"
        />
      )}
      <div className="banner-text" style={textStyle}>
        {data?.text}
      </div>
    </section>
  );
};

export default BannerWithText;
