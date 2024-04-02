import React, { useState, useEffect } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import "../../styles/style.css";
import { getImageHelper } from "../../hooks";
import { useTranslation } from 'react-i18next';
import '../../../i18n';

const MainBanner = ({ promo }) => {
  const { t } = useTranslation();
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
    <div className={"main_banner-box"}>
      <div className="circle-main"></div>
      <div className={"main_banner_text"}>
        <h1 className={"main-title"}>{t('homepage.mainBanner.title')}</h1>
        <div className={"main-subtitle"}>
          {t('homepage.mainBanner.text')}
        </div>
      </div>
      <div className={"main_banner_image"}>
        {isMobileView !== null && (
            <GatsbyImage
              image={getImageHelper(imageToShow)}
              className={"image_banner"}
              alt="This is a picture of my face."
              objectFit="cover"
              style={{ maxHeight: '640px' }}
            />
          )
        }
      </div>
    </div>
  );
};

export default MainBanner;
