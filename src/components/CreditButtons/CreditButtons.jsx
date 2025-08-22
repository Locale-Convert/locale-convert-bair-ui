import React from "react";
import monobankIcon from "../../images/monobank.svg";
import privatbankIcon from "../../images/privatbank.svg";
import "./style.css";

const CreditButtons = ({ openModal }) => {
    return (
        <div className="credit-buttons">
            <button className="credit-button monobank" onClick={() => openModal("monobank")}>
                <img src={monobankIcon} alt="Monobank" className="credit-bank-icon" /> Monobank
            </button>
            <button className="credit-button privatbank" onClick={() => openModal("privatbank")}>
                <img src={privatbankIcon} alt="Privatbank" className="credit-bank-icon" /> Privatbank
            </button>
        </div>
    );
};

export default CreditButtons;
