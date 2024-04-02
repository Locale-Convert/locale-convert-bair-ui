import React, { useState, useEffect } from "react"
import "../../styles/style.css"
import { GatsbyImage } from "gatsby-plugin-image";
import { getImageHelper } from "../../hooks";
import { useTranslation } from 'react-i18next';
import '../../../i18n';

const Promo = ({ promo }) => {
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
  <div className={"main_banner_image-promo banner-padding-left banner-height-vh"}>
    <div className={"promo_image_text-bottom-2"}>
      <h2 className={"promo-text"}>{t('homepage.promoFirstLeft.title')}</h2>
      <p className={"promo-subtext subtext-margin"}>
        {t('homepage.promoFirstLeft.text')}
      </p>
    </div>
    {isMobileView !== null && (
      <GatsbyImage
        image={getImageHelper(imageToShow)}
        className={"image__promo_banner"}
        alt="This is a picture of my face."
        objectFit="cover"
      />
    )}
    
  </div>
  )
}

export default Promo
