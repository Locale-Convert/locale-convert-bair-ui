// BannerWithText.jsx
import React from "react";
import './style.css';

const BannerWithText = ({ imageSrc, text, textStyle = {} }) => {
  return (
    <section className="banner-with-text">
      <img src={imageSrc} alt="Banner" className="banner-image" />
      <div className="banner-text" style={textStyle}>
        {text}
      </div>
    </section>
  );
};

export default BannerWithText;
