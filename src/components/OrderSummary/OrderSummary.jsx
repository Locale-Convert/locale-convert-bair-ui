import React from "react";
import "./style.css";
import checkmarkSteps from "../../images/checkmarkSteps.svg";

const OrderSummary = ({ cartItems, totalAmount, currentStep = 1 }) => {
  const steps = ["Контакти", "Доставка", "Оплата", "Оформлення"];

  return (
    <div className="order-right">
      {/* Кроки оформлення */}
      <div className="order-steps">
        {steps.map((step, index) => {
          const isActive = index + 1 === currentStep;
          const isCompleted = index + 1 < currentStep;
          const hasActiveLineAfter = index + 1 === currentStep;

          return (
            <div className="step-wrapper" key={index}>
              <div
                className={`step-circle ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""} ${!isActive && !isCompleted && !hasActiveLineAfter ? "inactive" : ""}`}
              >
                {isActive ? (
                  <img src={checkmarkSteps} alt="check" />
                ) : (
                  <div className="step-dot"></div>
                )}
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`step-line ${hasActiveLineAfter ? "active-line" : ""}`}
                ></div>
              )}

              <div className="step-label">{step}</div>
            </div>
          );
        })}
      </div>

      {/* Деталі замовлення */}
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
