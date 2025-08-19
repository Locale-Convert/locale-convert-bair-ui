import React, { useEffect, useRef, useState, useMemo } from "react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { graphql, useStaticQuery } from "gatsby";
import CartModal from "./CartModal";
import logo_convert from "../../images/bair-konvert-logo-2024.svg";
import { useCartStore } from "../../store/store";
import phone from "../../images/icons/phone.svg";
import basket from "../../images/icons/basket.svg";

import "../../styles/style.css";

export const query = graphql`
  query Header {
    allStrapiAccessories(sort: { fields: priority, order: DESC }) {
      nodes {
        stickerBlackFriday
        stickerBlackFridayTitle
        stickerNew
        stickerNewTitle
        stickerSale
        stickerSaleTitle
        id
        title
        price
        oldPrice
        url
        colorSlider {
          colorPrice
          colorOldPrice
          article
        }
        updatedAt
        mainImage {
          localFile {
            url
          }
        }
      }
    }
    allStrapiProducts {
      nodes {
        stickerBlackFriday
        stickerBlackFridayTitle
        stickerNew
        stickerNewTitle
        stickerSale
        stickerSaleTitle
        colorSlider {
          colorPrice
          colorOldPrice
          article
        }
        id
        title
        price
        oldPrice
        url
        updatedAt
      }
    }
  }
`;

const Header = ({ isBasketView, setIsBasketView }) => {
  const { allStrapiAccessories, allStrapiProducts } = useStaticQuery(query);

  const dropDownRef = useRef();
  const cartModalRef = useRef();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  

  const { cartItems, setCartItems } = useCartStore();

  const getCartItemsFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const cartItems = localStorage.getItem('selectedProducts');
      return cartItems ? JSON.parse(cartItems) : [];
    }
  };

  const sortedMenuConvert = allStrapiProducts.nodes.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

  const sortedMenuAccessories = allStrapiAccessories.nodes.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

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
            alt="Конверти Bair"
          />
        </a>
        <div className="nav-menu">
          <div className="dropdown">
            <button className="dropbtn-link">Конверти</button>
          </div>
          <div>
            <a href="/strollers" className="dropbtn">
              Коляски
            </a>
          </div>
          <div>
            <a href="/envelopes" className="dropbtn">
              Конверти
            </a>
          </div>
          <div>
            <a href="/mittens" className="dropbtn">
              Рукавиці
            </a>
          </div>
          <div>
            <a href="/car-seats" className="dropbtn">
              Автокрісла
            </a>
          </div>
          <div>
            <a href="/beds" className="dropbtn">
              Ліжка
            </a>
          </div>
          <div>
            <a href="/accessories" className="dropbtn">
              Аксесуари
            </a>
          </div>
        </div>
        <div className="box-number-and-basket">
          <div className="box-content-number">
            <a href="tel:+380961093040"><img src={phone} alt="phone" /></a>
          </div>
          <div className="dropbtn open-cart-btn" onClick={openCartModal}>
            <img 
              src={basket} 
              alt="Basket" 
              style={{ filter: (showCartModal && cartItems.length > 0) ? 'invert(66%) sepia(95%) saturate(507%) hue-rotate(75deg) brightness(100%) contrast(101%)' : 'none' }} 
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
                <div className="stickers-for-accessories-mobile-navbar">
                    {item?.stickerSale ? <div className="sticker yellow">{item.stickerSaleTitle ? item.stickerSaleTitle : 'ЗНИЖКА'}</div> : null}
                </div>
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
                <div className="stickers-for-accessories-mobile-navbar">
                    {item?.stickerSale ? <div className="sticker yellow">{item.stickerSaleTitle ? item.stickerSaleTitle : 'ЗНИЖКА'}</div> : null}
                </div>
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
          allStrapiProducts={allStrapiProducts}
          allStrapiAccessories={allStrapiAccessories}
          showCartModal={showCartModal}
          closeCartModal={closeCartModal}
          isBasketView={isBasketView}
          setIsBasketView={setIsBasketView}
        />
      </header>
    </>
  );
};

export default Header;
