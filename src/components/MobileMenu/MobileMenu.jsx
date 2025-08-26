import React, { useState, useEffect } from "react";
import { ArrowBackIosRounded, ArrowForwardIosRounded } from "@mui/icons-material";

import "./style.css";

const MobileMenu = ({ categories, subCategories, onClose }) => {
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="mobile-menu">
      {!activeCategory ? (
        <>
          <ul className="mobile-menu__list">
            {categories.map((cat, i) => (
              <li
                key={i}
                className="mobile-menu__item"
                onClick={() => setActiveCategory(cat.title)}
              >
                {cat.title}
                {cat.hasArrow && (
                  <span className="mobile-menu__arrow">
                    <ArrowForwardIosRounded />
                  </span>
                )}
              </li>
            ))}
          </ul>

          <div className="mobile-menu__footer">
            <a href="/contacts">Контакти</a>
            <a href="/conditions">Умови</a>
            <a href="/support">Обслуговування клієнтів</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
        </>
      ) : (
        <div className="mobile-submenu">
          <div
            className="mobile-submenu__back"
            onClick={() => setActiveCategory(null)}
          >
            <span className="mobile-submenu__icon">
              <ArrowBackIosRounded />
            </span>
            Усі категорії
          </div>

          <button className="mobile-submenu__all">
            ВСІ {activeCategory.toUpperCase()}
            <span className="mobile-submenu__icon">
              <ArrowForwardIosRounded />
            </span>
          </button>

        <ul className="mobile-submenu__list">
          {subCategories[activeCategory]?.map((item, i) => (
            <li key={i} className="mobile-submenu__item">
              <a href={item.url} className="mobile-submenu__link">
                <img src={item.image} alt={item.title} />
                {item.title}
              </a>
            </li>
          ))}
        </ul>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
