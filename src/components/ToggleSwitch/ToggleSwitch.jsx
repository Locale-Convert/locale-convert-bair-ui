import React, { useEffect, useState } from 'react';
import './styles.css';
import { useCartStore } from '../../store/store';

const ToggleSwitch = () => {
    const { isCybex, toggleCybex } = useCartStore();
    const [isChecked, setIsChecked] = useState(isCybex);

    useEffect(() => {
        toggleCybex(isChecked);
    }, []);

    const handleToggle = () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        toggleCybex(newChecked);
    };

    return (
        <div className="toggle-switch-container">
            <div className='toggle'>
                <label className="switch">
                    <input type="checkbox" checked={isChecked} onChange={handleToggle} />
                    <span className="slider"></span>
                </label>
            </div>
            <div className='text-box'>
                <span className="text">У мене коляска Cybex</span>
                <p className="description">
                    Для колясок Cybex підберемо конверт зі спеціальними прорізями для ременів безпеки - вам не потрібно турбуватися про сумісність (не стосується моделі Polar - вона не адаптована до Cybex).
                </p>
            </div>
        </div>
    );
};

export default ToggleSwitch;
