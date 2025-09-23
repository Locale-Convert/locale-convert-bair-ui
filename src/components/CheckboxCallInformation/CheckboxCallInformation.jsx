import React from "react";
import "./style.css";

const CheckboxCallConfirmation = ({ checked, onChange }) => {
  return (
    <label className="custom-checkbox-wrapper">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="custom-checkbox"
      />
      <span className="custom-checkbox-label">
        Мені можна не телефонувати для підтвердження замовлення
      </span>
    </label>
  );
};

export default CheckboxCallConfirmation;
