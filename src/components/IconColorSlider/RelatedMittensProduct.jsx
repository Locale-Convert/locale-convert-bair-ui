import React, { useMemo, useEffect, useState } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import "react-toastify/dist/ReactToastify.css";
import { getImageHelper } from "../../hooks";
import close from "../../images/close.svg";

const RelatedMittensProduct = ({ title, colorTitle, relatedAccessories, addToBasket, closeBlock = false }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const storedVisibility = localStorage.getItem("relatedMittensProductVisible");
        if (storedVisibility === "false") {
            setIsVisible(false);
        }
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        localStorage.setItem("relatedMittensProductVisible", "false");
    };

    const [accessoriesItemOne, accessoriesItemTwo] = useMemo(() => {
        if (!relatedAccessories || relatedAccessories.length < 2) {
            return [null, null];
        }

        const itemOne = relatedAccessories[0].colorSlider.find(access => access.color === colorTitle);
        const itemTwo = relatedAccessories[1].colorSlider.find(access => access.color === colorTitle);

        const completeItemOne = itemOne ? {
            ...itemOne,
            price: relatedAccessories[0].price,
            title: relatedAccessories[0].title,
            id   : relatedAccessories[0].id,
            url  : relatedAccessories[0].url
        } : null;

        const completeItemTwo = itemTwo ? {
            ...itemTwo,
            price: relatedAccessories[1].price,
            title: relatedAccessories[1].title,
            id   : relatedAccessories[1].id,
            url  : relatedAccessories[1].url
        } : null;

        return [completeItemOne, completeItemTwo];
    }, [relatedAccessories, colorTitle]);

    if (!(accessoriesItemOne && accessoriesItemTwo) || (!isVisible && closeBlock) || (!accessoriesItemOne.visible && !accessoriesItemTwo.visible)) return null;

    return (
        <div className="related-products-circle">
            <div className="related-products-box">
                <div className="title-with-close">
                    <div className="related-products-title">{title}</div>
                    {closeBlock && (
                        <span className="close-btn-releated-accessories" onClick={handleClose}><img src={close} alt="button-close" /></span>
                    )}
                </div>
                <div className="related-product-items">
                    {(accessoriesItemOne && accessoriesItemTwo) && (
                        <>
                            {accessoriesItemOne.visible ? (
                                <div className="related-product-item">
                                    <div className="related-product-image-box">
                                    <a href={`/${relatedAccessories[0].url}/#${accessoriesItemOne.article}`}>
                                        <GatsbyImage
                                            className="related-product-image"
                                            image={getImageHelper(accessoriesItemOne.imageColor)}
                                            alt=""
                                            objectFit="contain"
                                            style={{ width: '95%' }}
                                        />
                                    </a>
                                    {accessoriesItemOne.isSale && (
                                        <div className="sale-icon">
                                            {accessoriesItemOne.isSaleTitle || 'SALE'}
                                        </div>
                                    )}
                                    </div>
                                    <div className="related-product-description">
                                        <a href={`/${relatedAccessories[0].url}/#${accessoriesItemOne.article}`} className="related-product-title">
                                            {relatedAccessories[0].title}
                                        </a>
                                        <div className="related-product-price">
                                            {accessoriesItemOne.colorPrice ? accessoriesItemOne.colorPrice : accessoriesItemOne.price} грн
                                        </div>
                                        <a className="related-product-button" onClick={() => addToBasket(accessoriesItemOne, accessoriesItemOne.article)}>  
                                            Додати
                                        </a>
                                    </div>
                                </div>
                            ) : null}
                            {accessoriesItemTwo.visible ? (
                                <div className="related-product-item">
                                    <div className="related-product-image-box">
                                        <a  href={`/${relatedAccessories[1].url}/#${accessoriesItemTwo.article}`}>
                                            <GatsbyImage
                                                className="related-product-image"
                                                image={getImageHelper(accessoriesItemTwo.imageColor)}
                                                alt=""
                                                objectFit="contain"
                                                style={{ width: '95%' }}
                                            />
                                        </a>
                                        {accessoriesItemTwo.isSale && (
                                            <div className="sale-icon">
                                                {accessoriesItemTwo.isSaleTitle || 'SALE'}
                                            </div>
                                        )}
                                    </div>
                                    <div className="related-product-description">
                                        <a href={`/${relatedAccessories[1].url}/#${accessoriesItemTwo.article}`} className="related-product-title">
                                            {relatedAccessories[1].title}
                                        </a>
                                        <div className="related-product-price">
                                            {accessoriesItemTwo.colorPrice ? accessoriesItemTwo.colorPrice : accessoriesItemTwo.price} грн
                                        </div>
                                        <a className="related-product-button" onClick={() => addToBasket(accessoriesItemTwo, accessoriesItemTwo.article)}> 
                                            Додати
                                        </a>
                                    </div>
                                </div>
                            ) : null}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RelatedMittensProduct;
