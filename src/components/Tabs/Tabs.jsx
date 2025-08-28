import React, { useState } from "react";
import './style.css';

const Tabs = ({ items, onChange, defaultActive = "Всі" }) => {
    const [activeTab, setActiveTab] = useState(defaultActive);

    const handleClick = (tab) => {
        setActiveTab(tab);
        onChange(tab);
    };

    return (
        <div className="tabs-wrapper">
            {items.map(tab => (
                <div
                    key={tab}
                    className={`tab-item ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => handleClick(tab)}
                >
                    {tab}
                </div>
            ))}
        </div>
    );
};

export default Tabs;
