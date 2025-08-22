import React from "react";
import "./style.css";

const ProductActions = ({ addToBasket, currentColor, isAdded, price, oldPrice }) => {
    if (isAdded) {
        return (
            <div className="product-actions-added">
                ДОДАНО В КОШИК
            </div>
        );
    }

    return (
        <div className="product-actions-wrapper">
            <div className="product-actions-mobile">
                <div className="mobile-price-wrapper">
                    <span className="mobile-price">4999 грн</span>
                    {true && <span className="mobile-old-price">7999 грн</span>}
                </div>
                <div className="product-actions">
                    <button className="add-to-cart" onClick={() => addToBasket(currentColor)}>
                        ДОДАТИ В КОШИК
                    </button>
                    <button className="buy-now">КУПИТИ ЗАРАЗ</button>
                </div>
            </div>
        </div>
    );
};

export default ProductActions;
