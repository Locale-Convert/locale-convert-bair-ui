import React, { useState, useEffect } from "react"
import "../../styles/style.css"
import { GatsbyImage } from "gatsby-plugin-image";
import { getImageHelper } from "../../hooks";
import { useTranslation } from 'react-i18next';
import '../../../i18n';


const PromoTextBottom = ({ promo }) => {
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
    <div className={"main_banner_image-promo banner-padding-right banner-height-vh"}>
      <div className={"promo_image_text-bottom"}>
        <h2 className={"promo-text"}>{t('homepage.promoSecondRight.title')}</h2>
        <p className={"promo-subtext subtext-margin"}>
          {t('homepage.promoSecondRight.textOne')}
        </p>
        <p className={"promo-subtext subtext-margin"}>
          {t('homepage.promoSecondRight.textTwo')}
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

export default PromoTextBottom
