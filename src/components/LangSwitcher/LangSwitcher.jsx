import React, { useEffect } from 'react';
import { useCartStore } from '../../store/store';
import { useTranslation } from 'react-i18next';
import '../../../i18n';

import "../../styles/style.css";

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { activeLanguage, setActiveLanguage } = useCartStore();

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
      setActiveLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setActiveLanguage(lng);
    localStorage.setItem('language', lng);
  };

  console.log('');
  return (
    <div className="language-switcher">
      <select value={activeLanguage} onChange={(e) => changeLanguage(e.target.value)}>
        <option value="ua" disabled={activeLanguage === 'ua'}>Українська</option>
        <option value="en" disabled={activeLanguage === 'en'}>English</option>
        <option value="pl" disabled={activeLanguage === 'pl'}>Polish</option>
      </select>
    </div>
  );
}

export default LanguageSwitcher;
