import React, { useState, useEffect } from "react"
import { GatsbyImage } from "gatsby-plugin-image";
import { getImageHelper } from "../../hooks";

import "../../styles/style.css"


const PromoTwo = ({ promo }) => {
  const [isMobileView, setIsMobileView] = useState(null);

  useEffect(() => {
    const determineScreenSize = () => {
      const initialView = window.innerWidth < 600;
      setIsMobileView(initialView);
    };

    determineScreenSize();

    const handleWindowResize = () => {
      setIsMobileView(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const imageToShow = isMobileView ? promo.mobileImage : promo.desktopImage;

  return (
    <>
    {isMobileView !== null && (
      <div className={"main_banner_image-promo banner-padding-right banner-mobile"}>
      <div className={"banner-text-absolute"}>
        <h2 className={"main-title main-title-desktop "}>Затишний капюшон</h2>
        <p className={"promo-icon-subtext"}>Глибокий капюшон на кулісці, щільно стягується навколо голови малюка. Знімне хутро.</p>
      </div>
        <GatsbyImage
          image={getImageHelper(imageToShow)}
          className={"image_banner"}
          alt=""
          objectFit="contain"
        />
      </div>
    )}
    </>
  )
}

export default PromoTwo
