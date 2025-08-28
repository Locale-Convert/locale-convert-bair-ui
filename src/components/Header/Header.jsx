import React, { useEffect, useRef, useState, useMemo } from "react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { graphql, useStaticQuery } from "gatsby";
import CartModal from "./CartModal";
import logo_convert from "../../images/bair-konvert-logo-2024.svg";
import { useCartStore } from "../../store/store";
import phone from "../../images/icons/phone.svg";
import basket from "../../images/icons/basket.svg";

import "../../styles/style.css";
import MobileMenu from "../MobileMenu/MobileMenu";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

import smallStroller from "../../images/smallStroller.png";

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

  const categories = [
    { title: "Коляски", hasArrow: true, url: "/strollers" },
    { title: "Конверти", hasArrow: true, url: "/footmuffs" },
    { title: "Рукавиці", hasArrow: true, url: "/gloves" },
    { title: "Автокрісла", hasArrow: true, url: "/car-seats" },
    { title: "Ліжка", hasArrow: true, url: "/beds" },
    { title: "Аксесуари", hasArrow: false, url: "/accessories" },
  ];
  
  const subCategories = {
    "Коляски": allStrapiProducts.nodes.map(p => ({
      title: p.title,
      image: smallStroller,
      url: `/${p.url}/`
    })),
    "Рукавиці": allStrapiAccessories.nodes.map(p => ({
      title: p.title,
      image: smallStroller,
      url: `/${p.url}/`
    })),
    "Аксесуари": allStrapiAccessories.nodes.map(p => ({
      title: p.title,
      image: smallStroller,
      url: `/${p.url}/`
    })),
  };

  const { cartItems, setCartItems } = useCartStore();

  const getCartItemsFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const cartItems = localStorage.getItem('selectedProducts');
      return cartItems ? JSON.parse(cartItems) : [];
    }
  };

  useEffect(() => {
    setCartItems(getCartItemsFromLocalStorage());
  }, [])

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
          <div>
            <a href="/strollers" className="dropbtn">Коляски</a>
          </div>
          <div>
            <a href="/footmuffs" className="dropbtn">Конверти</a>
          </div>
          <div>
            <a href="/mittens" className="dropbtn">Рукавиці</a>
          </div>
          <div>
            <a href="/car-seats" className="dropbtn">Автокрісла</a>
          </div>
          <div>
            <a href="/beds" className="dropbtn">Ліжка</a>
          </div>
          <div>
            <a href="/accessories" className="dropbtn">Аксесуари</a>
          </div>
        </div>

        {!menuOpen && (
          <div className="box-number-and-basket">
            <div className="box-content-number">
              <a href="tel:+380961093040"><img src={phone} alt="phone" /></a>
            </div>
            <div className="dropbtn open-cart-btn" onClick={() => showCartModal || setShowCartModal(true)}>
              <img
                src={basket}
                alt="Basket"
                style={{ filter: (showCartModal && cartItems.length > 0) ? '' : 'none' }}
              />
              {getTotalItemCount !== 0 ? <div className="cart-total">{getTotalItemCount}</div> : null}
            </div>
          </div>
        )}

        <div className="header__burger-menu-box">
          <BurgerMenu isOpen={menuOpen} toggle={() => setMenuOpen(!menuOpen)} />
        </div>

        {menuOpen && (
          <MobileMenu
            categories={categories}
            subCategories={subCategories}
            onClose={() => setMenuOpen(false)}
          />
        )}

        <CartModal
          allStrapiProducts={allStrapiProducts}
          allStrapiAccessories={allStrapiAccessories}
          showCartModal={showCartModal}
          closeCartModal={() => setShowCartModal(false)}
          isBasketView={isBasketView}
          setIsBasketView={setIsBasketView}
        />
      </header>
    </>
  );
};

export default Header;
