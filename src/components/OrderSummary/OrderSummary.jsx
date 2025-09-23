import React, { useState, useRef, useEffect } from "react";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import "./style.css";
import OrderSteps from "../OrderSteps/OrderSteps";
import { GatsbyImage } from "gatsby-plugin-image";
import { getImageHelper } from "../../hooks";

const OrderSummary = ({ cartItems, totalAmount, stepStates, formValues }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(isExpanded ? contentRef.current.scrollHeight : 0);
  }, [isExpanded]);

  // === Доставка ===
  const deliveryMethod = formValues?.deliveryMethod || "—";
  let deliveryText = "—";
  if (deliveryMethod === "Нова Пошта") {
    deliveryText = "У відділенні Нової Пошти";
  } else if (deliveryMethod === "courier") {
    deliveryText = "Привезе кур'єр";
  }

  // === Оплата ===
  const paymentMethod = formValues?.paymentMethod || "—";
  let paymentText = "—";

  if (paymentMethod === "Оплатити зараз") {
    switch (formValues?.onlineMethod) {
      case "card":
        paymentText = "Карткою онлайн";
        break;
      case "apple":
        paymentText = "Apple Pay";
        break;
      case "google":
        paymentText = "Google Pay";
        break;
      default:
        paymentText = "Оплатити зараз";
    }
  } else if (paymentMethod === "При одержанні") {
    paymentText = "При отриманні";
  } else if (paymentMethod === "Кредит") {
    paymentText = "Кредит";
  }

  const discountAmount = cartItems.reduce((acc, item) => {
    if (item.oldPrice && item.price) {
      return acc + (item.oldPrice - item.price);
    }
    return acc;
  }, 0);

  return (
    <div className="order-right">
      {/* Кроки оформлення */}
      <div className="order-steps-wrapper">
        <OrderSteps stepStates={stepStates} />
      </div>

      {/* Деталі замовлення */}
      <div className="order-summary">
        {/* Акордіон з товарами */}
        <div className="order-items">
          <div
            className={`order-items-header ${isExpanded ? "expanded" : ""}`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span>Деталі замовлення</span>
            <span className="arrow">
              {isExpanded ? <KeyboardArrowUpRoundedIcon /> : <KeyboardArrowDownRoundedIcon />}
            </span>
          </div>
          <div
            className="order-items-list"
            ref={contentRef}
            style={{ height: height }}
          >
            {cartItems.map((item, index) => (
              <div className="order-item" key={index}>
                <div className="order-item-image">
                  <GatsbyImage image={getImageHelper(item.mainImage)} alt={item.title} objectFit="cover" />
                </div>
                <div className="item-info">
                  <div className="item-name">{item.title}</div>
                  <div className="item-price">
                    <span className="current-price">{item.price} грн</span>
                    {item.oldPrice && <span className="old-price">{item.oldPrice} грн</span>}
                  </div>
                </div>
                <div className="item-quantity">{item.count} шт.</div>
              </div>
            ))}
          </div>

          {/* Divider під товарами */}
          <div className="order-items-divider"></div>
        </div>

        {/* Підсумки */}
        <div>
          <div className="order-summary-item">
            <span>Товар ({cartItems.length})</span>
            <span>{totalAmount ? totalAmount + " грн" : "—"}</span>
          </div>
          {discountAmount > 0 ? (
            <div className="order-summary-item">
              <span>Знижка</span>
              <span className="discount">- {discountAmount} грн</span>
            </div>
          ) : null}
          <div className="order-summary-item">
            <span>Вартість доставки</span>
            <span className="free">безкоштовно</span>
          </div>
        </div>

        {/* Виділення "До сплати" */}
        <div className="order-summary-total">
          <div>До сплати</div>
          <div>{totalAmount ? totalAmount + " грн" : "—"}</div>
        </div>

        {/* Опції отримання та оплати */}
        <div className="order-summary-options">
          <div className="option">
            <span>Спосіб отримання</span>
            <span>{deliveryText}</span>
          </div>
          <div className="option">
            <span>Спосіб оплати</span>
            <span>{paymentText}</span>
          </div>
        </div>

        {/* 🔑 кнопка тепер відправляє форму */}
        <button
          className="btn-submit full"
          form="order-form"
          type="submit"
        >
          НАДІСЛАТИ ЗАМОВЛЕННЯ
        </button>

        <div className="order-summary-info">
          <p>
            Про умови повернення, доставки та відшкодування дивіться{" "}
            <a href="/conditions">тут</a>.
          </p>
          <p>
            Потрібна допомога? Телефонуйте до{" "}
            <a href="tel:+380961093040">служби підтримки клієнтів</a>.
          </p>
          <p>
            Ми обробляємо ваші особисті дані для керування вашим замовленням
            відповідно до Політики конфіденційності.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
