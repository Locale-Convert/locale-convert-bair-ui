import React, { useState, useEffect } from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { getImageHelper } from "../../hooks"

const AccessoriesDesktop = ({ data, promo }) => {
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

    const getLowestPrice = (colorSlider) => {
        if (!colorSlider || colorSlider.length === 0) return null;
    
        const prices = colorSlider.map(item => parseFloat(item.colorPrice)).filter(price => !isNaN(price));
        return prices.length ? Math.min(...prices) : null;
    };

    const imageToShow = isMobileView ? promo.mobileImage : promo.desktopImage;
    return (
        <div className={"main_catalog-box main_catalog-box-margin wrapper "}>
            <div className="accessories-box">
                <div className={"accessories-banner"}>
                    <div >
                        <div className={"accessories-banner-text"}>
                            <h2 className={"accessories-banner-promo-text"}>Доповніть коляску теплим і стильним аксесуаром</h2>
                            <p className={"accessories-banner-promo-subtext subtext-margin"}>
                                Рукавички в колір конверту
                            </p>
                        </div>
                        <GatsbyImage
                            image={getImageHelper(imageToShow)}
                            className={"image__promo_banner image__promo_banner-min-height"}
                            alt="Зимові рукавички на коляску від Bair"
                            objectFit="cover"
                            style={{ height: '88%' }}
                        />
                    </div>
                </div>
                <div className="accessories-product">
                    {!!data && data.map((item, index) => {

                        const lowestPrice = getLowestPrice(item.colorSlider);
                        
                        const finalPrice = lowestPrice !== null ? lowestPrice : item.price;

                        return (
                            <a href={`/${item.url}/`} key={index} className={"accessories-product-box-item"}>
                            <div className="stickers-for-accessories-desktop">
                                {item?.stickerNew ? <div className="sticker green">{item.stickerNewTitle ? item.stickerNewTitle : 'НОВИНКА 2025'}</div> : null}
                                {item?.stickerBlackFriday ? <div className="sticker black">{item.stickerBlackFridayTitle ? item.stickerBlackFridayTitle : 'ЧОРНА П\'ЯТНИЦЯ'}</div> : null}
                                {item?.stickerSale ? <div className="sticker yellow">{item.stickerSaleTitle ? item.stickerSaleTitle : 'ЗНИЖКА'}</div> : null}
                            </div>
                            <div className={"accessories-block-box-item-image"}>
                                <GatsbyImage
                                    image={getImageHelper(isMobileView ? item.mainImg?.mobileImage : item.mainImg?.desktopImage)}
                                    className={"image-width-accessories"}
                                    alt="Рукавиці на коляску Bair"
                                    objectFit="contain"
                                    style={{ minHeight: '60%' }}
                                />
                            </div>
                            <div className={"main_catalog-box-item-text"}>
                                <div className={"main_catalog-box-item-title"}>{item.title}</div>
                                <div className={"main_catalog-box-item-price-box"}>
                                    {
                                        !!item.oldPrice && !item.isPriceFrom ? (
                                            <>
                                                <div className={"main_catalog-box-item-old-price"}>{item.oldPrice} грн</div>
                                                <div className={"main_catalog-box-item-price"}>{item.price} грн</div>
                                            </>
                                        ) : (
                                            <div className={"main_catalog-box-item-price"}>{item.isPriceFrom ? 'від' : ''} {finalPrice && item.isPriceFrom ? finalPrice : item.price} грн</div>
                                        )
                                    }
                                </div>
                            </div>
                        </a>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default AccessoriesDesktop
