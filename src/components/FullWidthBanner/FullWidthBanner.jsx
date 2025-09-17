// FullWidthBanner.jsx
import React from "react";
import "./style.css";

const FullWidthBanner = ({ data, textStyle = {} }) => {
  const desktopImage = data?.desktopImage?.localFile?.url;
  const mobileImage = data?.mobileImage?.localFile?.url;

  return (
    <section className="fullwidth-banner">
      {desktopImage && (
        <img
          src={desktopImage}
          alt={data?.text || "Banner Desktop"}
          className="fullwidth-banner__image desktop-only"
        />
      )}
      {mobileImage && (
        <img
          src={mobileImage}
          alt={data?.text || "Banner Mobile"}
          className="fullwidth-banner__image mobile-only"
        />
      )}
      {data?.text && (
        <div className="fullwidth-banner__text" style={textStyle}>
          {/* {data.text} */}
        </div>
      )}
    </section>
  );
};

export default FullWidthBanner;
