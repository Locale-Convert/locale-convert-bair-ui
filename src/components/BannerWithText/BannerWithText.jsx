// BannerWithText.jsx
import React from "react";
import './style.css';

const BannerWithText = ({ data, textStyle = {} }) => {
  const desktopImage = data?.desktopImage?.localFile?.url;
  const mobileImage = data?.mobileImage?.localFile?.url;

  return (
    <section className="banner-with-text">
        <img
          src={desktopImage}
          alt={data?.text || "Banner Desktop"}
          className="banner-image desktop-only"
        />
        <img
          src={mobileImage}
          alt={data?.text || "Banner Mobile"}
          className="banner-image mobile-only"
        />
      <div className="banner-text" style={textStyle}>
        {data?.text}
      </div>
    </section>
  );
};

export default BannerWithText;
