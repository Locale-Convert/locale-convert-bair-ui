import React, { useState, useEffect } from "react"
import "../../styles/style.css"
import { GatsbyImage } from "gatsby-plugin-image";
import { getImageHelper } from "../../hooks";


const Promo = ({ promo }) => {
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
      <h2 className={"promo-text"}>Універсальні прорізи для ременів безпеки</h2>
      <p className={"promo-subtext subtext-margin"}>
        Прорізи на липучках, дозволяють використовувати конверт з різними видами кріплення
      </p>
    </div>
    {isMobileView !== null && (
      <GatsbyImage
        image={getImageHelper(imageToShow)}
        className={"image__promo_banner"}
        alt=""
        objectFit="cover"
      />
    )}

  </div>
  )
}

export default Promo
