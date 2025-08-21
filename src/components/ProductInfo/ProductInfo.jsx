import React from "react";
import "./style.css";
import ColorSlider from "../IconColorSlider/ColorSlider";
import monobankIcon from "../../images/monobank.svg";
import privatbankIcon from "../../images/privatbank.svg";

const ProductInfo = ({ data, changeSlider, colorTitle }) => {
    return (
        <div className="product-card">
            <button className="back-button">← Назад</button>
            <h1 className="product-title">
                Коляска 2 в 1 Bair Kiwi Plus ECO BKP-26 нефрит
            </h1>
            <div className="product-article">
                Артикул: 680693 / <span className="article-number">78 нефрит</span>
            </div>
            <div className="product-price">17 699 ₴</div>
            <div className="product-thumbnails">
                <ColorSlider data={data} changeSlider={changeSlider} colorTitle={colorTitle} />
            </div>
            <div className="installments">
                Розбий на платежі <span className="bold-text">від 6 200 грн</span> / місяць
            </div>
            <div className="payment-buttons">
                <button className="payment-monobank">
                    <img src={monobankIcon} alt="Monobank" className="bank-icon" /> Monobank
                </button>
                <button className="payment-privatbank">
                    <img src={privatbankIcon} alt="Privatbank" className="bank-icon" /> Privatbank
                </button>
            </div>
            <div className="product-actions">
                <button className="add-to-cart">ДОДАТИ В КОШИК</button>
                <button className="buy-now">КУПИТИ ЗАРАЗ</button>
            </div>
        </div>
    );
};

export default ProductInfo;
