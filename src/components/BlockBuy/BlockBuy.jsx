import React, { 
  useState,
  useEffect,
  useRef      
}                            from "react";
import { useLocation }       from "@reach/router";

import "react-toastify/dist/ReactToastify.css";

import { addToLocalStorage } from "../../hooks/localstorage";
import { useCartStore }      from "../../store/store";

import "../../styles/style.css";


const BlockBuy = ({ data, price, oldPrice = "", setIsBasketView}) => {
  const [isView, setIsView]   = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const { cartItems, setCartItems } = useCartStore(); 

  function getCoords(block) {
    let box = block?.getBoundingClientRect();
    return {
      top: box.top + window.pageYOffset,
    };
  }

  const form = useRef();
  const location = useLocation();

  let hash = location.hash;
  const articleProduct = hash.split("").splice(1).join('');

  const selectedItem = data.colorSlider.find(item => item.article === articleProduct);

  useEffect(() => {
    let bottomOfScreen = window?.scrollY + window?.innerHeight;
    const checkScroll = () => {
      const blockBuy = document.getElementById("block-buy");
      let heightOfBlock = blockBuy?.offsetHeight;
      const blockSlider = document.getElementById("icon-slider");
      const footer = document.getElementById("footer");

      let topOfSlider = getCoords(blockSlider).top;
      let topOfFooter = getCoords(footer).top;


      let bottomOfSlider = topOfSlider + blockSlider?.offsetHeight + heightOfBlock + 15;
      let bottomOfScreen = window?.scrollY + window?.innerHeight;

      if (bottomOfScreen > bottomOfSlider && (bottomOfScreen < topOfFooter)) {
        setIsView(true);
      }
      if (bottomOfScreen < bottomOfSlider || (bottomOfScreen > topOfFooter)) {
        setIsView(false);
      }

    }
    if (bottomOfScreen > 700) {
      checkScroll();
    }


    document.addEventListener('scroll', checkScroll, false);

    return () => {
      document.removeEventListener("scroll", checkScroll, false);
    };
  }, []);

  useEffect(() => {
    return () => {
      document.body.style.removeProperty("overflow")
    }
  }, []);

  const addToBasket = (data, articleProduct) => {
    const updatedCartItems = addToLocalStorage(data, articleProduct);
    setCartItems(updatedCartItems);
    setIsAdded(true);
    setIsBasketView(true);
  };

  useEffect(() => {
    if(cartItems) {
      const isInCart = !!cartItems.find(cartItem => cartItem.article === articleProduct);
      setIsAdded(isInCart);
    }
  },[])

  useEffect(() => {
    if(cartItems) {
      const isInCart = !!cartItems.find(cartItem => cartItem.article === articleProduct);
      setIsAdded(isInCart);
    }
  },[articleProduct, cartItems])

  return (
    <>
      <div className={`block-buy-box ${isView ? "is-view-block-buy active" : "is-view-block-buy"}`} id={"block-buy"}>
        {!!selectedItem?.colorOldPrice || oldPrice ? (
          <div className={"block-buy-price-old-box"}>
            <div className={"block-buy-price-old"}>{selectedItem?.colorOldPrice ? selectedItem?.colorOldPrice : oldPrice}грн</div>
            <div className={"block-buy-price"}>{selectedItem?.colorPrice ? selectedItem?.colorPrice : price} грн</div>
          </div>
        ) : (
          <div className={"block-buy-price"}>
            {selectedItem?.colorPrice ? selectedItem?.colorPrice : price} грн
          </div>
        )
        }
        {isAdded ? (
          <div className={"block-buy-button"}>
            Додано
          </div>
        ) : (
          <div className={"block-buy-button"} onClick={() => addToBasket(data, articleProduct)}>
            Додати в кошик
          </div>
        )}
      </div>
    </>
  )
}

export default BlockBuy
