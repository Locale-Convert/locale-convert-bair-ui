import React, { useEffect, useMemo }     from "react";
import { GatsbyImage }          from "gatsby-plugin-image";
import { useLocation }          from "@reach/router";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { getImageHelper }       from "../../hooks";
import { addToLocalStorage }    from "../../hooks/localstorage";
import { useCartStore } from "../../store/store";

const RelatedMittensAccessories = ({ relatedAccessories }) => {
    return (
        <div className="related-products-circle">
            <div className="related-products-box">
                <div className="related-products-title">Cхожі товари</div>
                <div className="related-product-items">
                    {relatedAccessories && relatedAccessories.map((item, index) => (
                        <div key={index} className="related-product-item">
                            <a href={`/${item.url}`} className="related-product-image-box">
                                <GatsbyImage
                                    className="related-product-image"
                                    image={getImageHelper(item.mainImage)}
                                    alt=""
                                    objectFit="contain"
                                    style={{ width: '95%' }}
                                />
                            </a>
                            <div className="related-product-description">
                                <a href={`/${item.url}`} className="related-product-title">
                                    {item.title}
                                </a>
                                <div className="related-product-price">
                                    {item.price} грн
                                </div>
                                <a href={`/${item.url}`} className="related-product-button">
                                    Перейти
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RelatedMittensAccessories;
