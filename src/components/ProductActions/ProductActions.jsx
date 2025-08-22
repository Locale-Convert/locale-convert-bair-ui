import React, { useState, useEffect } from "react";
import "./style.css";

const ProductActions = ({ addToBasket, currentColor, isAdded, price, oldPrice, showPrice }) => {
    const [showMobileActions, setShowMobileActions] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    const handleScroll = () => {
        if (!isMobile) return; // скрол тільки для мобайла

        const currentScrollY = window.scrollY;

        if (currentScrollY === 0) {
            setShowMobileActions(false);
        } else if (currentScrollY < lastScrollY) {
            setShowMobileActions(true);
        } else {
            setShowMobileActions(false);
        }

        setLastScrollY(currentScrollY);
    };

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, [lastScrollY, isMobile]);

    if (isAdded) {
        return (
            <div className="product-actions-added">
                ДОДАНО В КОШИК
            </div>
        );
    }

    return (
        <div className="product-actions-wrapper">
            {/* --- Десктоп версія --- */}
            {!isMobile && (
                <div className="product-actions-desktop">
                    <button className="add-to-cart" onClick={() => addToBasket(currentColor)}>
                        ДОДАТИ В КОШИК
                    </button>
                    <button className="buy-now">КУПИТИ ЗАРАЗ</button>
                </div>
            )}

            {/* --- Мобільна версія --- */}
            {isMobile && (
                <div className={`product-actions-mobile ${showMobileActions ? "visible" : ""}`}>
                    {showPrice && (
                        <div className="mobile-price-wrapper">
                            <span className="mobile-price">{price} грн</span>
                            {oldPrice && <span className="mobile-old-price">{oldPrice} грн</span>}
                        </div>
                    )}
                    <div className="product-actions">
                        <button className="add-to-cart" onClick={() => addToBasket(currentColor)}>
                            ДОДАТИ В КОШИК
                        </button>
                        <button className="buy-now">КУПИТИ ЗАРАЗ</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductActions;
