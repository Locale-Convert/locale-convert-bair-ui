import React, { useState, useRef, useEffect } from "react";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import "./style.css";
import OrderSteps from "../OrderSteps/OrderSteps";

const OrderSummary = ({ cartItems, totalAmount }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(isExpanded ? contentRef.current.scrollHeight : 0);
  }, [isExpanded]);

  return (
    <div className="order-right">
      {/* Кроки оформлення */}
      <div className="order-steps-wrapper">
        <OrderSteps stepStates={["completed", "active", "inactive", "inactive"]} />
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
