import React, { useState, useEffect } from "react";
import { Field } from "formik";
import visaIcon from "../../images/visa.svg";
import mastercardIcon from "../../images/mastercard.svg";
import applePayIcon from "../../images/applePay.svg";
import googlePayIcon from "../../images/googlePay.svg";
import creditIcon from "../../images/privatbank.svg";
import "./style.css";

const PaymentMethod = ({ selectedPaymentMethod, setSelectedPaymentMethod, setFieldValue }) => {
    const [selectedOnline, setSelectedOnline] = useState("card");

    const handleMainChange = (method) => {
        setSelectedPaymentMethod(method);
        setFieldValue("paymentMethod", method);
    };

    const handleOnlineChange = (method) => {
        setSelectedOnline(method);
        setFieldValue("onlineMethod", method);
    };

    return (
        <div className="payment-method-wrapper">
            <h2 className="payment-method-title">Спосіб оплати</h2>

            <div className="payment-method-container">
                {/* Оплатити зараз */}
                <div className={`payment-block ${selectedPaymentMethod === "Оплатити зараз" ? "active" : ""}`}>
                    <label className="order-radios-horizontal">
                        <Field
                            type="radio"
                            name="paymentMethod"
                            value="Оплатити зараз"
                            checked={selectedPaymentMethod === "Оплатити зараз"}
                            onChange={() => handleMainChange("Оплатити зараз")}
                        />
                        Оплатити зараз
                    </label>

                    <div className={`payment-subblock-wrapper ${selectedPaymentMethod === "Оплатити зараз" ? "open" : ""}`}>
                        <div className="payment-subblock">
                            <label className="order-radios-horizontal">
                                <div className="radio-input">
                                    <Field
                                        type="radio"
                                        name="onlineMethod"
                                        value="card"
                                        checked={selectedOnline === "card"}
                                        onChange={() => handleOnlineChange("card")}
                                    />
                                    Карткою онлайн
                                </div>
                                <div className="icons-block">
                                <div className="icon-block"><img src={visaIcon} alt="Visa" className="payment-icon" /></div>
                                <div className="icon-block"><img src={mastercardIcon} alt="Mastercard" className="payment-icon" /></div>
                                </div>
                            </label>

                            <label className="order-radios-horizontal">
                                <div className="radio-input">
                                    <Field
                                        type="radio"
                                        name="onlineMethod"
                                        value="apple"
                                        checked={selectedOnline === "apple"}
                                        onChange={() => handleOnlineChange("apple")}
                                    />
                                    Apple Pay
                                </div>
                               <div className="icon-block"><img src={applePayIcon} alt="Apple Pay" className="payment-icon" /></div>
                            </label>

                            <label className="order-radios-horizontal">
                                <div className="radio-input">
                                    <Field
                                        type="radio"
                                        name="onlineMethod"
                                        value="google"
                                        checked={selectedOnline === "google"}
                                        onChange={() => handleOnlineChange("google")}
                                    />
                                    Google Pay
                                </div>
                                <div className="icon-block"><img src={googlePayIcon} alt="Google Pay" className="payment-icon" /></div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* При одержанні */}
                <div className={`payment-block ${selectedPaymentMethod === "При одержанні" ? "active" : ""}`}>
                    <label className="order-radios-horizontal">
                        <Field
                            type="radio"
                            name="paymentMethod"
                            value="При одержанні"
                            checked={selectedPaymentMethod === "При одержанні"}
                            onChange={() => handleMainChange("При одержанні")}
                        />
                        При одержанні (готівкою або карткою)
                    </label>

                    <div className={`payment-subblock-wrapper ${selectedPaymentMethod === "При одержанні" ? "open" : ""}`}>
                        <div className="payment-subblock cash-info">
                            <span className="bold-text">380 грн</span> комісія Нової Пошти за післяплату
                        </div>
                    </div>
                </div>

                {/* Кредит */}
                <div className={`payment-block ${selectedPaymentMethod === "Кредит" ? "active" : ""}`}>
                    <label className="order-radios-horizontal">
                        <Field
                            type="radio"
                            name="paymentMethod"
                            value="Кредит"
                            checked={selectedPaymentMethod === "Кредит"}
                            onChange={() => handleMainChange("Кредит")}
                        />
                        Кредит та оплата частинами
                    </label>
                    <div className="payment-block-subtext">Оформлення кредитів у банках партнерів</div>
                    <div className={`payment-subblock-wrapper ${selectedPaymentMethod === "Кредит" ? "open" : ""}`}>
                        <div className="payment-subblock credit-info">

                            {selectedPaymentMethod === "Кредит" && (
                                <div className="credit-details">
                                    <div className="credit-row credit-row-bank">
                                        <img src={creditIcon} alt="Кредит" className="payment-icon" />
                                        Оплата частинами від ПриватБанк
                                    </div>
                                    <div className="credit-conditions">
                                        <div className="credit-row small-text">7 платежів / 6 місяців</div>
                                        <div className="credit-row">
                                            <span className="bold-text">5 100 грн</span> / місяць
                                        </div>
                                        <div className="credit-row credit-field">
                                            <label>Фінансовий номер</label>
                                            <input type="text" className="credit-input" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;
