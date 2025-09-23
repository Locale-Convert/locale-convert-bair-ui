import React from "react";
import "./style.css";
import checkmarkSteps from "../../images/checkmarkSteps.svg";

// три стани: inactive | active | completed
const steps = ["Контакти", "Доставка", "Оплата", "Оформлення"];

const OrderSteps = ({ stepStates = [] }) => {
  return (
    <div className="order-steps">
      {steps.map((step, index) => {
        const state = stepStates[index] || "inactive";
        const isCompleted = state === "completed";

        // логіка лінії: активна тільки якщо поточний step completed
        let lineClass = "inactive-line";
        if (isCompleted) {
          lineClass = "active-line";
        }

        return (
          <div className="step-wrapper" key={index}>
            <div className={`step-circle ${state}`}>
              {isCompleted ? (
                <img src={checkmarkSteps} alt="check" />
              ) : (
                <div className="step-dot"></div>
              )}
            </div>

            {index < steps.length - 1 && (
              <div className={`step-line ${lineClass}`}></div>
            )}

            <div className="step-label">{step}</div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderSteps;
