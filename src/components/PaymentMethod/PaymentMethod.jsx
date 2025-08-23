import React from "react";
import { Field } from "formik";
import "./style.css";

const PaymentMethod = ({ selectedPaymentMethod, setSelectedPaymentMethod, setFieldValue }) => {
  return (
    <div className="order-block">
      <h2 className="order-block-title">Спосіб оплати</h2>
      <div className="order-radios-horizontal">
        <label>
          <Field
            type="radio"
            name="paymentMethod"
            value="Wayforpay"
            checked={selectedPaymentMethod === "Wayforpay"}
            onChange={() => {
              setFieldValue("paymentMethod", "Wayforpay");
              setSelectedPaymentMethod("Wayforpay");
            }}
          />
          Visa / Mastercard
        </label>

        <label>
          <Field
            type="radio"
            name="paymentMethod"
            value="CashOnDelivery"
            checked={selectedPaymentMethod === "CashOnDelivery"}
            onChange={() => {
              setFieldValue("paymentMethod", "CashOnDelivery");
              setSelectedPaymentMethod("CashOnDelivery");
            }}
          />
          Накладеним платежем <span className="payment-fee">(2% комісії)</span>
        </label>
      </div>
    </div>
  );
};

export default PaymentMethod;
