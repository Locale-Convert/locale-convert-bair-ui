import React, { useState } from "react";
import "./style.css";
import ColorSlider from "../IconColorSlider/ColorSlider";
import CreditModal from "../CreditModal/CreditModal";
import CreditButtons from "../CreditButtons/CreditButtons";
import Installments from "../Installments/Installments";
import ProductActions from "../ProductActions/ProductActions";
import monobankIcon from "../../images/monobank.svg";
import privatbankIcon from "../../images/privatbank.svg";

export const creditModalData = {
    monobank: {
        title: "Оплата частинами від Monobank",
        icon: monobankIcon,
        description: (
            <>
                <p>Опис продукту:</p>
                <ol className="cm-list">
                    <li>Наявність картки Монобанку</li>
                    <li>Доступний кредитний ліміт за сервісом “Оплата частинами”</li>
                    <li>Перший платіж буде списаний у день оформлення</li>
                </ol>
                <p>Подарунки не надаються при купівлі товару в 0,01% кредит чи оплату частинами.</p>
            </>
        ),
        buttonText: null,
        onButtonClick: null
    },
    privatbank: {
        title: "Оплата частинами від Приватбанк",
        icon: privatbankIcon,
        description: (
            <>
                <p>Опис продукту:</p>
                <ol className="cm-list">
                    <li>Наявність картки "Універсальна"</li>
                    <li>Доступний кредитний ліміт за сервісом “Оплата частинами”</li>
                    <li>Перший платіж буде списаний у день оформлення</li>
                </ol>
                <p>Подарунки не надаються при купівлі товару в 0,01% кредит чи оплату частинами.</p>
            </>
        ),
        buttonText: null,
        onButtonClick: null
    }
};

const ProductInfo = ({
    data,
    changeSlider,
    colorTitle,
    addToBasket,
    isAdded,
    currentColor,
    price
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});

    const openModal = (bank) => {
        setModalData(creditModalData[bank]);
        setIsModalOpen(true);
    };

    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="product-card">
            <button className="back-button" onClick={() => window.history.back()}>
                ← Назад
            </button>
            <h1 className="product-title">
                Коляска 2 в 1 Bair Kiwi Plus ECO BKP-26 нефрит
            </h1>
            <div className="product-article">
                Артикул: 680693 / <span className="article-number">78 нефрит</span>
            </div>
            <div className="product-price">{price} ₴</div>
            <div className="product-thumbnails">
                <ColorSlider data={data} changeSlider={changeSlider} colorTitle={colorTitle} />
            </div>

            <Installments price={price} />

            <CreditButtons openModal={openModal} />

            <ProductActions addToBasket={addToBasket} currentColor={currentColor} isAdded={isAdded} />

            <CreditModal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={modalData.title}
                icon={modalData.icon}
                description={modalData.description}
                buttonText={modalData.buttonText}
                onButtonClick={modalData.onButtonClick}
            />
        </div>
    );
};

export default ProductInfo;
