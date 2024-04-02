import React, { useState, useEffect } from "react"
import "../../styles/style.css"
import { GatsbyImage } from "gatsby-plugin-image"
import { getImageHelper } from "../../hooks"


const RelatedProducts = ({data, title}) => {
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

  return (
    <div className={"main_catalog-box wrapper"}>
      <div className={"main-title"}>{title}</div>
      <div className={"main_catalog-box-items"}>
        {data.map((item,index) => (
          <a key={index} href={`/${item.url}/`} className={"main_catalog-box-item"}>
            <div className={"main_catalog-box-item-image"}>
            {isMobileView !== null && (
              <GatsbyImage
                image={getImageHelper(isMobileView ? item.mainImg?.mobileImage : item.mainImg?.desktopImage)}
                className={"image-width"}
                alt="This is a picture of my face."
                objectFit="contain"
              />
            )}
            </div>
            <div className={"main_catalog-box-item-text"}>
              <div className={"main_catalog-box-item-title"}>{item.title}</div>
              <div className={"main_catalog-box-item-price-box"}>
                {
                  !!item.oldPrice ? (
                    <>
                      <div className={"main_catalog-box-item-old-price"}>{item.oldPrice} грн</div>
                      <div className={"main_catalog-box-item-price"}>{item.price} грн</div>
                    </>
                  ) : (
                    <div className={"main_catalog-box-item-price"}>{item.price} грн</div>
                  )
                }
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
