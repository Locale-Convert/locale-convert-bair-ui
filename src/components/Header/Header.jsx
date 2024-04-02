import React, { useEffect, useRef, useState, useMemo } from "react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { graphql, useStaticQuery } from "gatsby";
import CartModal from "./CartModal";
import logo_convert from "../../images/logo-convert.svg";
import { useCartStore } from "../../store/store";
import phone from "../../images/phone.svg";
import LanguageSwitcher from "../LangSwitcher/LangSwitcher";
import { useTranslation } from 'react-i18next';
import '../../../i18n';

import "../../styles/style.css";


export const query = graphql`
  query Header {
    allStrapiAccessories(sort: { fields: priority, order: DESC }) {
      nodes {
        id
        title
        price
        url
        mainImage {
          localFile {
            url
          }
        }
      }
    }
    allStrapiProducts {
      nodes {
        id
        title
        price
        url
      }
    }
  }
`;

const Header = ({ isBasketView, setIsBasketView }) => {
  const { t } = useTranslation();
  const dropDownRef = useRef();
  const cartModalRef = useRef();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const { allStrapiAccessories, allStrapiProducts } = useStaticQuery(query);

  const { cartItems, setCartItems } = useCartStore(); 

  const getCartItemsFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const cartItems = localStorage.getItem('selectedProducts');
      return cartItems ? JSON.parse(cartItems) : [];
    }
  };

  useEffect(() => {
    setCartItems(getCartItemsFromLocalStorage());
  },[])

  const getTotalItemCount = useMemo(() => {
    return cartItems && cartItems.reduce((total, item) => total + (item.count || 1), 0);
  }, [cartItems]);

  useEffect(() => {
    const closeMenu = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        menuOpen && setMenuOpen(false);
      }

      if (cartModalRef.current && !cartModalRef.current.contains(e.target)) {
        showCartModal && setShowCartModal(false);
      }
    };

    document.addEventListener("click", closeMenu);

    if (showCartModal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, [menuOpen, showCartModal]);

  const openMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const openCartModal = () => {
    if(cartItems.length > 0) setShowCartModal(true);
  };

  const closeCartModal = () => {
    setShowCartModal(false);
  };

  const updateCartItems = (newCartItems) => {
    setCartItems(newCartItems);
  };

  return (
    <>
      <div id={"top"}></div>
      <header
        className={"header header-block wrapper"}
        id={"header"}
      >
        <a href="/">
          <img
            className="header__logo"
            src={logo_convert}
            alt="A Gatsby astronaut"
          />
        </a>
        <div className="box-content-number">
          <a href="tel:+380961093040"><img src={phone} alt="phone" /></a>
          <a href="tel:+380961093040" className="footer__box-content-number">+38 (096) 109-30-40</a>
        </div>
        <div className="dropbtn open-cart-btn hide-basket" onClick={openCartModal}>
          <ShoppingCartOutlinedIcon
            fontSize="medium"
            sx={{ color: (showCartModal && cartItems.length > 0)  ? '#A0E312' : '#000' }}
          />
          <div>{getTotalItemCount !== 0 ? getTotalItemCount : null}</div>
        </div>
        <LanguageSwitcher/>
        <div className="nav-menu">
          <div className="dropdown">
            <button className="dropbtn-link">{t('menu.convert')}</button>
            <div className="dropdown-content">
              {allStrapiProducts.nodes.map((item, index) => (
                <a key={index} href={`/${item.url}/`}>
                  {item.title}
                </a>
              ))}
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn-link">{t('menu.gloves')}</button>
            <div className="dropdown-content">
              {allStrapiAccessories.nodes.map((item, index) => (
                <a key={index} href={`/${item.url}/`}>
                  {item.title}
                </a>
              ))}
            </div>
          </div>
          <div>
            <a href="/#reviews" className="dropbtn">
            {t('menu.feedback')}
            </a>
          </div>
          <div>
            <a href="/#faq" className="dropbtn">
              FAQ
            </a>
          </div>
          <div className="btn-margin">
            <a href="/conditions" className="dropbtn">
            {t('menu.conditions')}
            </a>
          </div>
          <div className="dropbtn open-cart-btn" onClick={openCartModal}>
            <ShoppingCartOutlinedIcon
              fontSize="large"
              sx={{ color: (showCartModal && cartItems.length > 0) ? '#A0E312' : '#000' }}
            />
            <div>{getTotalItemCount !== 0 ? getTotalItemCount : null}</div>
          </div>
        </div>
        <nav className="header__menu">
          {menuOpen ? <div className={"overlay"}></div> : ""}
          <ul className={`header__nav-list ${menuOpen ? "active" : ""}`}>
            <div className={"promo-banner-text"}>Конверти</div>
            {allStrapiProducts.nodes.map((item, index) => (
              <li key={index} className="header__nav-item">
                <a
                  className={"header__nav-link"}
                  href={`/${item.url}/`}
                >
                  {item.title}
                </a>
              </li>
            ))}
            <div className={"promo-banner-text-2"}>Рукавички</div>
            {allStrapiAccessories.nodes.map((item, index) => (
              <li key={index} className="header__nav-item">
                <a
                  className={"header__nav-link"}
                  href={`/${item.url}/`}
                >
                  {item.title}
                </a>
              </li>
            ))}
            <div className={"menu-margin"}>
              <li className="header__nav-item">
                <a
                  className={"header__nav-link"}
                  href="/#reviews"
                  onClick={openMenu}
                >
                  Вiдгуки
                </a>
              </li>
              <li className="header__nav-item">
                <a
                  className={"header__nav-link"}
                  href="/#faq"
                  onClick={openMenu}
                >
                  FAQ
                </a>
              </li>
              <li className="header__nav-item">
                <a
                  className={"header__nav-link"}
                  href="/conditions"
                  onClick={openMenu}
                >
                  Умови
                </a>
              </li>
            </div>
          </ul>
        </nav>
        <div className="header__burger-menu-box">
          <div
            className={`header__burger-menu ${menuOpen ? "active" : ""}`}
            onClick={openMenu}
          >
            <span></span>
          </div>
        </div>
        <CartModal
          showCartModal={showCartModal}
          setShowCartModal={setShowCartModal}
          closeCartModal={closeCartModal}
          cartItems={cartItems}
          updateCartItems={updateCartItems}
          isBasketView={isBasketView}
          setIsBasketView={setIsBasketView}
        />
      </header>
    </>
  );
};

export default Header;
