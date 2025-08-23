import React, { useState, useRef, useEffect } from "react";
import "./style.css";
import checkmarkSteps from "../../images/checkmarkSteps.svg";

  const steps = ["Контакти", "Доставка", "Оплата", "Оформлення"];

const OrderSummary = ({ cartItems, totalAmount, currentStep = 1 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(isExpanded ? contentRef.current.scrollHeight : 0);
  }, [isExpanded]);

  return (
    <div className="order-right">
      {/* Кроки оформлення */}
      <div className="order-steps">
        {steps.map((step, index) => {
          const isActive = index + 1 === currentStep;
          const isCompleted = index + 1 < currentStep;
          const isNextAfterActive = index === currentStep;

          return (
            <div className="step-wrapper" key={index}>
              <div
                className={`step-circle 
                  ${isActive ? "active" : ""} 
                  ${isCompleted ? "completed" : ""} 
                  ${isNextAfterActive ? "next" : ""} 
                  ${!isActive && !isCompleted && !isNextAfterActive ? "inactive" : ""}`}
              >
                {isCompleted ? (
                  <img src={checkmarkSteps} alt="check" />
                ) : (
                  <div className="step-dot"></div>
                )}
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`step-line ${isActive || isNextAfterActive ? "active-line" : ""}`}
                ></div>
              )}

              <div className="step-label">{step}</div>
            </div>
          );
        })}
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
            <span className="arrow">{isExpanded ? "▲" : "▼"}</span>
          </div>
          <div
            className="order-items-list"
            ref={contentRef}
            style={{ height: height }}
          >
            {cartItems.map((item, index) => (
              <div className="order-item" key={index}>
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <div className="item-name">{item.name}</div>
                  <div className="item-price">
                    <span className="current-price">{item.price} грн</span>
                    {item.oldPrice && <span className="old-price">{item.oldPrice} грн</span>}
                  </div>
                </div>
                <div className="item-quantity">{item.quantity} шт.</div>
              </div>
            ))}
          </div>
        </div>

        {/* Підсумки */}
        <div className="order-summary-item">
          <span>Товар ({cartItems.length})</span>
          <span>{totalAmount ? totalAmount : 0} грн</span>
        </div>
        <div className="order-summary-item">
          <span>Знижка</span>
          <span className="discount">- 2 000 грн</span>
        </div>
        <div className="order-summary-item">
          <span>Вартість доставки</span>
          <span className="free">безкоштовно</span>
        </div>
        <div className="order-summary-total">
          <span>До сплати</span>
          <span>{totalAmount ? totalAmount : 0} грн</span>
        </div>

        {/* Опції отримання та оплати */}
        <div className="order-summary-options">
          <div className="option">
            <span>Спосіб отримання</span>
            <span>У відділенні Нової Пошти</span>
          </div>
          <div className="option">
            <span>Спосіб оплати</span>
            <span>Apple Pay</span>
          </div>
        </div>

        <button className="btn-submit full">НАДІСЛАТИ ЗАМОВЛЕННЯ</button>

        <p className="order-summary-info">
          Про умови повернення, доставки та відшкодування дивіться <a href="/conditions">тут</a>.<br />
          Потрібна допомога? Телефонуйте до <a href="tel:+380961093040">служби підтримки клієнтів</a>.<br />
          Ми обробляємо ваші особисті дані для керування вашим замовленням відповідно до Політики конфіденційності.
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
