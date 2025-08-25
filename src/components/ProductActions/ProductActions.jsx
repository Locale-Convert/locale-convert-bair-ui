import React, { useState, useEffect, useMemo } from "react";
import basket from "../../images/icons/basket.svg";
import "./style.css";
import { useCartStore } from "../../store/store";

const ProductActions = ({ addToBasket, currentColor, isAdded, price, oldPrice, showPrice }) => {
    const [showMobileActions, setShowMobileActions] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const { cartItems } = useCartStore();

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

            if (currentScrollY === 0) {
                setShowMobileActions(false);
            } else if (currentScrollY < lastScrollY) {
                setShowMobileActions(true);
            } else {
                setShowMobileActions(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isMobile, lastScrollY]);

    const getTotalItemCount = useMemo(() => {
        return cartItems && cartItems.reduce((total, item) => total + (item.count || 1), 0);
    }, [cartItems]);

    if (currentColor && currentColor.available === false) {
        return (
            <div className="product-actions-unavailable">
                <button className="notify-btn" disabled>
                    ПОВІДОМИТИ, КОЛИ БУДЕ
                </button>
            </div>
        );
    }

    // Якщо товар доданий у кошик
    if (isAdded) {
        return (
            <div className="product-actions-added">
                ПЕРЕЙТИ ДО ОФОРМЛЕННЯ
                <div className="dropbtn open-cart-btn">
                    <img src={basket} alt="Basket" />
                    {getTotalItemCount !== 0 ? (
                        <div className="cart-total">{getTotalItemCount}</div>
                    ) : null}
                </div>
            </div>
        );
    }

    return (
        <div className="product-actions-wrapper">
            {!isMobile && (
                <div className="product-actions-desktop">
                    <button
                        className="add-to-cart"
                        onClick={() => addToBasket(currentColor, currentColor.article)}
                    >
                        ДОДАТИ В КОШИК
                    </button>
                    <button className="buy-now">КУПИТИ ЗАРАЗ</button>
                </div>
            )}

            {isMobile && (
                <div className={`product-actions-mobile ${showMobileActions ? "visible" : ""}`}>
                    {showPrice && (
                        <div className="mobile-price-wrapper">
                            <span className="mobile-price">{price} грн</span>
                            {oldPrice && <span className="mobile-old-price">{oldPrice} грн</span>}
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
