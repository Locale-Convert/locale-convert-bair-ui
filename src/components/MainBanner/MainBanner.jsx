import React, { useState, useEffect } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import "../../styles/style.css";
import { getImageHelper } from "../../hooks";

const MainBanner = ({ promo }) => {
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
        <h1 className={"main-title"}>Зимовi конверти Bair</h1>
        <div className={"main-subtitle"}>
          Теплий аксесуар для холодної погоди дітям від народження.
          <br /> Зберігає тепло та захищає дитину від вітру, дощу і снігу.
        </div>
      </div>
      <div className={"main_banner_image"}>
        {isMobileView !== null && (
            <GatsbyImage
              image={getImageHelper(imageToShow)}
              className={"image_banner"}
              alt="Конверти в коляску Bair"
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
