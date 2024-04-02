import React, { useState, useEffect } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { getImageHelper } from "../../hooks"
import { useTranslation } from 'react-i18next';
import '../../../i18n';

const AccessoriesDesktop = ({data, promo}) => {
    const { i18n, t } = useTranslation();
    const [isMobileView, setIsMobileView] = useState(false);

    useEffect(() => {
        const handleWindowResize = () => {
            setIsMobileView(window.innerWidth < 800);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

  const imageToShow = isMobileView ? promo.mobileImage : promo.desktopImage;
  return (
      <div className={"main_catalog-box main_catalog-box-margin wrapper "}>
        <div className="accessories-box">
            <div className={"accessories-banner"}>
                <div >
                    <div className={"accessories-banner-text"}>
                        <h2 className={"accessories-banner-promo-text"}>{t('homepage.accessoriesBanner.title')}</h2>
                        <p className={"accessories-banner-promo-subtext subtext-margin"}>
                            {t('homepage.accessoriesBanner.text')}
                        </p>
                    </div>
                    <GatsbyImage
                        image={getImageHelper(imageToShow)}
                        className={"image__promo_banner image__promo_banner-min-height"}
                        alt="This is a picture of my face."
                        objectFit="cover"
                        style={{ height: '88%'}}
                    />
                </div>
            </div>
            <div className="accessories-product">
                {!!data && data.map((item,index) => (
                <a href={`/${item.url}/`} key={index} className={"accessories-product-box-item"}>
                <div className={"accessories-block-box-item-image"}>
                    <GatsbyImage
                    image={getImageHelper(isMobileView ? item.mainImg?.mobileImage : item.mainImg?.desktopImage)}
                    className={"image-width-accessories"}
                    alt="This is a picture of my face."
                    objectFit="contain"
                    style={{minHeight: '60%'}}
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
        </div>
      </div>
  )
}

export default AccessoriesDesktop
