import React from "react";
import "./style.css";

const Installments = ({ price }) => {
    if(!price) return null;
    
    const installment = Math.min((price / 4).toFixed(2));

    return (
        <div className="installments">
            Розбий на платежі <span className="bold-text">від {installment} грн</span> / місяць
        </div>
    );
};

export default Installments;
