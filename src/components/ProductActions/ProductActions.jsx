import React, { useState, useEffect, useMemo } from "react";
import basket from "../../images/icons/basket.svg";
import "./style.css";
import { useCartStore } from "../../store/store";
import { formatNumberWithSpaces } from "../../hooks/price";

const ProductActions = ({ addToBasket, currentColor, data, isAdded, showPrice }) => {
    const [showMobileActions, setShowMobileActions] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const { cartItems } = useCartStore();

    const displayedPrice = currentColor?.colorPrice ?? data?.price;
    const displayedOldPrice = currentColor?.colorOldPrice ?? data?.oldPrice;

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!isMobile) return;
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            if (currentScrollY === 0 || currentScrollY + windowHeight >= docHeight) {
                setShowMobileActions(false);
            } else {
                setShowMobileActions(true);
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isMobile]);

    const getTotalItemCount = useMemo(() => {
        return cartItems && cartItems.reduce((total, item) => total + (item.count || 1), 0);
    }, [cartItems]);

    if (!currentColor) return null;

    if (currentColor.available === false) {
        return (
            <div className="product-actions-unavailable">
                <button className="notify-btn" disabled>
                    ПОВІДОМИТИ, КОЛИ БУДЕ
                </button>
            </div>
        );
    }

    if (isAdded) {
        return (
            <a href="/order" className="product-actions-added">
                ПЕРЕЙТИ ДО ОФОРМЛЕННЯ
                <div className="dropbtn open-cart-btn">
                    <img src={basket} alt="Basket" />
                    {getTotalItemCount !== 0 && (
                        <div className="cart-total">{getTotalItemCount}</div>
                    )}
                </div>
            </a>
        );
    }

    return (
        <div className="product-actions-wrapper">
            {!isMobile && (
                <div className="product-actions-desktop">
                    <button className="add-to-cart" onClick={() => addToBasket(currentColor)}>
                        ДОДАТИ В КОШИК
                    </button>
                    <button className="buy-now">КУПИТИ ЗАРАЗ</button>
                </div>
            )}
            {isMobile && (
                <div className={`product-actions-mobile ${showMobileActions ? "visible" : ""}`}>
                    {showPrice && displayedPrice !== undefined && displayedPrice !== null && (
                        <div className="mobile-price-wrapper">
                            <span className="mobile-price">
                                {formatNumberWithSpaces(displayedPrice)} грн
                            </span>
                            {displayedOldPrice !== undefined && displayedOldPrice !== null && (
                                <span className="mobile-old-price">
                                    {formatNumberWithSpaces(displayedOldPrice)} грн
                                </span>
                            )}
                        </div>
                    )}
                    <div className="product-actions">
                        <button
                            className="add-to-cart"
                            onClick={() => addToBasket(currentColor, currentColor.article)}
                        >
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
