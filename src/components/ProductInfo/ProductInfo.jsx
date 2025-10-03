import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import ColorSlider from "../IconColorSlider/ColorSlider";
import CreditModal from "../CreditModal/CreditModal";
import CreditButtons from "../CreditButtons/CreditButtons";
import Installments from "../Installments/Installments";
import ProductActions from "../ProductActions/ProductActions";
import monobankIcon from "../../images/monobank.svg";
import privatbankIcon from "../../images/privatbank.svg";
import { formatNumberWithSpaces } from "../../hooks/price";

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
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [showMobilePrice, setShowMobilePrice] = useState(false);

  const priceRef = useRef(null);

  const openModal = (bank) => {
    setModalData(creditModalData[bank]);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const isAvailable = currentColor?.available !== false;

  // IntersectionObserver для мобільної ціни
  useEffect(() => {
    if (!priceRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowMobilePrice(!entry.isIntersecting),
      { root: null, threshold: 0.1 }
    );
    observer.observe(priceRef.current);
    return () => observer.disconnect();
  }, []);

  const displayedPrice = currentColor.colorPrice ?? data.price;
  const displayedOldPrice = currentColor.colorOldPrice ?? data.oldPrice;

  return (
    <div className="product-card">
      <button className="back-button" onClick={() => window.history.back()}>← Назад</button>

      <div className="product-thumbnails mobile-only">
        <ColorSlider allData={data} data={data.colorSlider} changeSlider={changeSlider} colorTitle={colorTitle} />
      </div>

      <div className="product-article desktop-only">
        Артикул: {currentColor.article}
      </div>

      <h1 className="product-title">
        {data.title}{" "}
        {currentColor?.color && (
          <span className="product-color mobile-only">{currentColor.color}</span>
        )}
      </h1>
      <div className="product-color-desktop desktop-only">{currentColor.color}</div>

      <div className="product-article mobile-only">
        Артикул: {currentColor.article}
      </div>

      {isAvailable ? (
        <div id="product-price" ref={priceRef} className="product-price">
          <div className="price-wrapper">
            <span className="current-price">
              {formatNumberWithSpaces(displayedPrice)} грн
            </span>
            {displayedOldPrice && (
              <span className="old-price">
                {formatNumberWithSpaces(displayedOldPrice)} грн
              </span>
            )}
          </div>

          {/* Блок Частинами – тільки мобілка */}
          <div className="credit-box mobile-only">
            <div className="credit-label">Частинами</div>
            <div className="credit-icons">
              <img
                src={monobankIcon}
                alt="Monobank"
                className="credit-icon"
                onClick={() => openModal("monobank")}
              />
              <img
                src={privatbankIcon}
                alt="PrivatBank"
                className="credit-icon"
                onClick={() => openModal("privatbank")}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="product-unavailable" style={{ color: "#EA1206" }}>
          Немає в наявності
        </div>
      )}

      <div className="product-thumbnails desktop-only">
        <ColorSlider allData={data} data={data.colorSlider} changeSlider={changeSlider} colorTitle={colorTitle} />
      </div>

      {isAvailable && <div className="desktop-only"><Installments price={currentColor.colorPrice ?? data.price} /></div>}
      {isAvailable && (
        <div className="desktop-only">
          <CreditButtons openModal={openModal} />
        </div>
      )}

      <ProductActions
        addToBasket={() => addToBasket({ ...data, selectedColor: currentColor }, currentColor.article)}
        currentColor={currentColor}
        data={data}
        isAdded={isAdded}
        showPrice={showMobilePrice}
      />

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