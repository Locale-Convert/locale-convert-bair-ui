import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import "./style.css";

const CreditModal = ({ isOpen, onClose, title, icon, description, onButtonClick }) => {
    if (!isOpen) return null;

    return (
        <div className="cm-overlay" onClick={onClose}>
            <div className="cm-content" onClick={(e) => e.stopPropagation()}>
                <div className="cm-header-top">
                    <span className="cm-header-title">Кредит</span>
                    <CloseIcon className="cm-close-icon" onClick={onClose} />
                </div>

                <div className="cm-header">
                    {icon && <img src={icon} alt="Icon" className="cm-icon" />}
                    <h2 className="cm-title">{title}</h2>
                </div>

                <button className="cm-button" onClick={onButtonClick}>
                    ОФОРМИТИ
                </button>

                <div className="cm-body">
                    {description}
                </div>
            </div>
        </div>
    );
};

export default CreditModal;
