import React, { useState, useEffect } from "react"
import { GatsbyImage } from "gatsby-plugin-image";
import { getImageHelper } from "../../hooks";
import { useTranslation } from 'react-i18next';
import '../../../i18n';

import "../../styles/style.css"
import icon_promo from "../../images/molniya.svg"


const MainBannerWithText = ({ promo }) => {
  const { i18n, t } = useTranslation();
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
        <h2 className={"main-title main-title-desktop"}>{t('homepage.promoSecondLeft.title')}</h2>
        <img src={icon_promo} className={"icon_promo"} alt={""}/>
        <p className={"promo-subtext promo-icon-subtext"}>
          {t('homepage.promoSecondLeft.text')}
        </p>
      </div>
      <div className={"image_banner-height"}>
      {isMobileView !== null && (
        <GatsbyImage
          image={getImageHelper(imageToShow)}
          className={"image_banner"}
          alt="This is a picture of my face."
          objectFit="cover"
        />
      )}
      
      </div>
    </div>
    </>
  )
}

export default MainBannerWithText
