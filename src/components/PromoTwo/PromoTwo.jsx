import React, { useState, useEffect } from "react"
import { GatsbyImage } from "gatsby-plugin-image";
import { getImageHelper } from "../../hooks";
import { useTranslation } from 'react-i18next';
import '../../../i18n';

import "../../styles/style.css"


const PromoTwo = ({ promo }) => {
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
    {isMobileView !== null && (
      <div className={"main_banner_image-promo banner-padding-right banner-mobile"}>
      <div className={"banner-text-absolute"}>
        <h2 className={"main-title main-title-desktop "}>{t('homepage.promoFirstRight.title')}</h2>
        <p className={"promo-icon-subtext"}>{t('homepage.promoFirstRight.text')}</p>
      </div>
        <GatsbyImage
          image={getImageHelper(imageToShow)}
          className={"image_banner"}
          alt="This is a picture of my face."
          objectFit="contain"
        />
      </div>
    )}
    </>
  )
}

export default PromoTwo
