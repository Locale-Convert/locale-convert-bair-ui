import React, { useState } from "react";
import "./style.css";

const MobileMenu = ({ categories, subCategories, onClose }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="mobile-menu">
      {!activeCategory ? (
        <ul className="mobile-menu__list">
          {categories.map((cat, i) => (
            <li
              key={i}
              className="mobile-menu__item"
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
              <span className="mobile-menu__arrow">›</span>
            </li>
          ))}

          <div className="mobile-menu__footer">
            <a href="/contacts">Контакти</a>
            <a href="/conditions">Умови</a>
            <a href="/support">Обслуговування клієнтів</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
        </ul>
      ) : (
        <div className="mobile-submenu">
          <div className="mobile-submenu__back" onClick={() => setActiveCategory(null)}>
            ‹ Усі категорії
          </div>

          <button className="mobile-submenu__all">ВСІ {activeCategory.toUpperCase()}</button>

          <ul className="mobile-submenu__list">
            {subCategories[activeCategory]?.map((item, i) => (
              <li key={i} className="mobile-submenu__item">
                <img src={item.image} alt={item.title} />
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
