import React, { useState } from "react";
import "./style.css";
import ColorSlider from "../IconColorSlider/ColorSlider";
import monobankIcon from "../../images/monobank.svg";
import privatbankIcon from "../../images/privatbank.svg";
import CreditModal from "../CreditModal/CreditModal";

const ProductInfo = ({
    data,
    changeSlider,
    colorTitle,
    addToBasket,
    isAdded,
    currentColor
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState({});

    const openModal = (bank) => {
        console.log("Opening modal for", bank);

        if (bank === "monobank") {
            setModalData({
                title: "Оплата частинами від Monobank",
                icon: monobankIcon,
                description: (
                    <>
                        <p>Опис продукту:</p>
                        <ol className="cm-list">
                            <li> Наявність картки Монобанку</li>
                            <li> Доступний кредитний ліміт за сервісом “Оплата частинами”</li>
                            <li> Перший платіж буде списаний у день оформлення</li>
                        </ol>
                        <p>Подарунки не надаються при купівлі товару в 0,01% кредит чи оплату частинами.</p>
                    </>
                ),
                buttonText: null,
                onButtonClick: null
            });
        } else if (bank === "privatbank") {
            setModalData({
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
            });
        }

        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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
                <button className="payment-monobank" onClick={() => openModal("monobank")}>
                    <img src={monobankIcon} alt="Monobank" className="bank-icon" /> Monobank
                </button>
                <button className="payment-privatbank" onClick={() => openModal("privatbank")}>
                    <img src={privatbankIcon} alt="Privatbank" className="bank-icon" /> Privatbank
                </button>
            </div>
            <div className="product-actions">
                {!isAdded ? (
                    <>
                        <button className="add-to-cart" onClick={() => addToBasket(currentColor)}>
                            ДОДАТИ В КОШИК
                        </button>
                        <button className="buy-now">КУПИТИ ЗАРАЗ</button>
                    </>
                ) : null}
            </div>

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
