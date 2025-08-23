import React, { useState, useRef, useEffect } from "react";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
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

  console.log('cartItems', cartItems)

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
            <span className="arrow">
              {isExpanded ? (
                <KeyboardArrowUpRoundedIcon />
              ) : (
                <KeyboardArrowDownRoundedIcon />
              )}
            </span>
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
                  <div className="item-name">Bair City ECO</div>
                  <div className="item-price">
                    <span className="current-price">{item.price} грн</span>
                    {item.oldPrice && (
                      <span className="old-price">{item.oldPrice} грн</span>
                    )}
                  </div>
                </div>
                <div className="item-quantity">1 шт.</div>
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
        </div>

        {/* Виділення "До сплати" */}
        <div className="order-summary-total">
          <div>До сплати</div>
          <div>{totalAmount ? totalAmount : 0} грн</div>
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
          <p>Про умови повернення, доставки та відшкодування дивіться <a href="/conditions">тут</a>.<br /></p>
          <p>Потрібна допомога?<br /> Телефонуйте до <a href="tel:+380961093040">служби підтримки клієнтів</a>.<br /></p>
          <p>Ми обробляємо ваші особисті дані для керування вашим замовленням відповідно до Політики конфіденційності.</p>
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
