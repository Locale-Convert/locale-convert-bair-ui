import React, { useState, useEffect } from "react"
import { GatsbyImage } from "gatsby-plugin-image";
import { getImageHelper } from "../../hooks";

import "../../styles/style.css"
import icon_promo from "../../images/molniya.svg"


const MainBannerWithText = ({ promo }) => {
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
    <div className={"main_banner_image-promo banner-padding-left"}>
      <div className={"banner-text-absolute"}>
        <h2 className={"main-title main-title-desktop"}>Розстебніть конверт повністю та використовуйте як килимок або м'який матрацик</h2>
        <img src={icon_promo} className={"icon_promo"} alt={""}/>
        <p className={"promo-subtext promo-icon-subtext"}>
          двосторонні блискавки, повністю або частково відкривають конверт для швидкого доступу до дитини
        </p>
      </div>
      <div className={"image_banner-height"}>
      {isMobileView !== null && (
        <GatsbyImage
          image={getImageHelper(imageToShow)}
          className={"image_banner"}
          alt=""
          objectFit="cover"
        />
      )}

      </div>
    </div>
    </>
  )
}

export default MainBannerWithText
