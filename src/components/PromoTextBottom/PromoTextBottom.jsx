import React, { useState, useEffect } from "react"
import "../../styles/style.css"
import { GatsbyImage } from "gatsby-plugin-image";
import { getImageHelper } from "../../hooks";


const PromoTextBottom = ({ promo }) => {
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
        <h2 className={"promo-text"}>Зовнішня тканина захищає від вітру і мокрого снігу</h2>
        <p className={"promo-subtext subtext-margin"}>
          Конверт виготовляється із міцної тканини, яка не продувається вітром і не промокає
        </p>
        <p className={"promo-subtext subtext-margin"}>
          Щільний шар утеплювача, надійно зберігає тепло. Усередині м'яка плюшева тканина
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

export default PromoTextBottom
