import React from "react";
import "./style.css";

const OrderSummary = ({ cartItems, totalAmount, currentStep = 1 }) => {
  const steps = ["Контакти", "Доставка", "Оплата", "Оформлення"];

  return (
    <div className="order-right">
      {/* Кроки оформлення */}
      <div className="order-steps">
        {steps.map((step, index) => (
          <div className="step-wrapper" key={index}>
            <div
              className={`step-circle ${index + 1 === currentStep ? "active" : ""}`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && <div className="step-line"></div>}
            <div className="step-label">{step}</div>
          </div>
        ))}
      </div>

      <div className="order-summary">
        <h3>Деталі замовлення</h3>

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
          <span className="free">Безкоштовно</span>
        </div>

        <div className="order-summary-total">
          <span>До сплати</span>
          <span>{totalAmount ? totalAmount : 0} грн</span>
        </div>

        <button className="btn-submit full">Надіслати замовлення</button>

        <p className="order-summary-info">
          Про умови повернення дивіться <a href="/conditions">тут</a>. <br />
          Потрібна допомога?{" "}
          <a href="tel:+380961093040">Служба підтримки</a>.
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
