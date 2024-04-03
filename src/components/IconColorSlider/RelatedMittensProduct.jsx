import React, { useEffect, useMemo } from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { useLocation } from "@reach/router";

import "react-toastify/dist/ReactToastify.css";

import { getImageHelper } from "../../hooks";
import { addToLocalStorage } from "../../hooks/localstorage";
import { useCartStore } from "../../store/store";
import { useTranslation } from 'react-i18next';
import '../../../i18n';


const RelatedMittensProduct = ({ title, products, colorTitle, colorArticle, relatedAccessories, colorSlider }) => {
    const { t } = useTranslation();


    // const [accessoriesItemOne, accessoriesItemTwo] = useMemo(() => {
    //     const itemOne = relatedAccessories[0].colorSlider.find(access => access.color === colorTitle);
    //     const itemTwo = relatedAccessories[1].colorSlider.find(access => access.color === colorTitle);

    //     return [itemOne, itemTwo];
    // }, [relatedAccessories, colorTitle]);


    return (
        <></>
        // <div className="related-products-circle">
        //     <div className="related-products-box">
        //         <div className="related-products-title">{t('product.relatedProduct.titleOne')}</div>
        //         <div className="related-product-items">
        //             {/* {relatedAccessories && relatedAccessories.map((item, index) => ( */}
        //             {accessoriesItemOne && accessoriesItemTwo && (
        //                 <>
        //                     <div className="related-product-item">
        //                         <a href={`/${relatedAccessories[0].url}/#${accessoriesItemOne.article}`} className="related-product-image-box">
        //                             <GatsbyImage
        //                                 className="related-product-image"
        //                                 image={getImageHelper(accessoriesItemOne.imageColor)}
        //                                 alt="This is a picture of my face."
        //                                 objectFit="contain"
        //                                 style={{ width: '95%' }}
        //                             />
        //                         </a>
        //                         <div className="related-product-description">
        //                             <a href={`/${relatedAccessories[0].url}/#${accessoriesItemOne.article}`} className="related-product-title">
        //                                 {relatedAccessories[0].title}
        //                             </a>
        //                             <div className="related-product-price">
        //                                 {relatedAccessories[0].price} грн
        //                             </div>
        //                             <a href={`/${relatedAccessories[0].url}/#${accessoriesItemOne.article}`} className="related-product-button">
        //                                 {t('product.goTo')}
        //                             </a>
        //                         </div>

        //                     </div>
        //                     <div className="related-product-item">
        //                         <a href={`/${relatedAccessories[1].url}/#${accessoriesItemTwo.article}`} className="related-product-image-box">
        //                             <GatsbyImage
        //                                 className="related-product-image"
        //                                 image={getImageHelper(accessoriesItemTwo.imageColor)}
        //                                 alt="This is a picture of my face."
        //                                 objectFit="contain"
        //                                 style={{ width: '95%' }}
        //                             />
        //                         </a>
        //                         <div className="related-product-description">
        //                             <a href={`/${relatedAccessories[1].url}/#${accessoriesItemTwo.article}`} className="related-product-title">
        //                                 {relatedAccessories[1].title}
        //                             </a>
        //                             <div className="related-product-price">
        //                                 {relatedAccessories[1].price} грн
        //                             </div>
        //                             <a href={`/${relatedAccessories[1].url}/#${accessoriesItemTwo.article}`} className="related-product-button">
        //                                 {t('product.goTo')}
        //                             </a>
        //                         </div>

        //                     </div>
        //                 </>
        //             )

        //             }

        //             {/* ))} */}
        //         </div>
        //     </div>
        // </div>
    );
};

export default RelatedMittensProduct;


{/* <div className="related-product-description">
    <a href={`/${item.url}`} className="related-product-title">
        {item.title}
    </a>
    <div className="related-product-price">
        {item.price} грн
    </div>
    <div className="related-product-button" onClick={() => addToCart(item)}>
        Додати в кошик
    </div>
</div> */}
