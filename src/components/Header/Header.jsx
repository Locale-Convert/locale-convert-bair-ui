import React, { useEffect, useRef, useState, useMemo } from "react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { graphql, useStaticQuery } from "gatsby";
import CartModal from "./CartModal";
import logo_convert from "../../images/bair-konvert-logo-2024.svg";
import { useCartStore } from "../../store/store";
import phone from "../../images/phone.svg";

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
        <div className="nav-menu">
          <div className="dropdown">
            <button className="dropbtn-link">Конверти</button>
            <div className="dropdown-content">
              {sortedMenuConvert.map((item, index) => (
                <>
                  <a  className='dropdown-menu-item' key={index} href={`/${item.url}/`}>
                    <div>{item.title}</div>
                    <div className="stickers-for-accessories-descktop-navbar">
                      {item?.stickerSale ? <div className="sticker yellow">{item.stickerSaleTitle ? item.stickerSaleTitle : 'ЗНИЖКА'}</div> : null}
                    </div>
                  </a>
                </>
              ))}
            </div>
          </div>
          <div>
            <a href="/#reviews" className="dropbtn">
              Відгуки
            </a>
          </div>
          <div>
            <a href="/#faq" className="dropbtn">
              FAQ
            </a>
          </div>
          <div className="btn-margin">
            <a href="/conditions" className="dropbtn">
              Умови
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
