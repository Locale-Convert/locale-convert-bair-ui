// FullWidthBanner.jsx
import React, { useEffect, useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import "./style.css";

const FullWidthBanner = ({ data, textStyle = {} }) => {
  // Початково ми не знаємо ширину екрану
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Якщо ширина ще не визначена, нічого не рендеримо
  if (isMobile === null) return null;

  const desktopImage = getImage(data?.desktopImage?.localFile);
  const mobileImage = getImage(data?.mobileImage?.localFile);
  const imageToShow = isMobile ? mobileImage : desktopImage;

  return (
    <section className="fullwidth-banner">
      {imageToShow && (
        <GatsbyImage
          image={imageToShow}
          alt={data.text || "Banner"}
          className="fullwidth-banner__image"
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
