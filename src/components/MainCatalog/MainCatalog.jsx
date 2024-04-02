import React, { useState, useEffect }  from "react"
import "../../styles/style.css"
import { GatsbyImage } from "gatsby-plugin-image"
import { getImageHelper } from "../../hooks"
import { useTranslation } from 'react-i18next';
import '../../../i18n';


const MainCatalog = ({data}) => {
  const { i18n, t } = useTranslation();
  const [isMobileView, setIsMobileView] = useState(false);

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
      <h2 className={"main-title"}>{t('homepage.productList.title')}</h2>
      <div className={"main_catalog-box-items"}>
        {data.nodes.map((item,index) => (
          <a key={index} href={`${item.url}/`} className={"main_catalog-box-item"}>
            <div className={"main_catalog-box-item-image"}>
              <GatsbyImage
                image={getImageHelper(isMobileView ? item.mainImg?.mobileImage : item.mainImg?.desktopImage)}
                className={"image-width"}
                alt="This is a picture of my face."
                objectFit="contain"
              />
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
      <div className="circle"></div>
    </div>
  )
}

export default MainCatalog
