import React, {
  useState,
  useEffect
}                            from "react";
import { useLocation }       from "@reach/router";
import { navigate }          from "gatsby";

import "react-toastify/dist/ReactToastify.css";

import ColorSlider           from "./ColorSlider";
import RelatedMittensProduct from "./RelatedMittensProduct";
import TitleBox              from "../TitleBox/TitleBox";

import { addToLocalStorage } from "../../hooks/localstorage";
import { useCartStore }      from "../../store/store";

import BlockTitle            from "../BlockTitle/BlockTitle";

import PriceBox from "../PriceBox/PriceBox";
import MainSlider from "../SliderCharacteristics/SliderNew";
import SliderMiniature from "../SliderCharacteristics/SliderMiniature";

import { useTranslation } from 'react-i18next';
import '../../../i18n';


import "swiper/css";
import "swiper/css/pagination";
import RelatedMittensAccessories from "./RelatedMittensAccessories";



const IconColorSlider = ({ type, data, colorSlider, title, price, oldPrice, products, titleRelatedProducts, relatedAccessories = [], setIsBasketView, setActiveColor}) => {
  const {  t } = useTranslation();

  const filteredColorSlider = colorSlider.filter(item => item.visible === null || item.visible === true);

  const [colorArticle, setColorArticle]       = useState("");
  const [colorTitle, setColorTitle]           = useState("");

  const [sliderImage, setSliderImage]         = useState([]);
  const [selectedItemForMainSlider, setSelectedItemForMainSlider] = useState(0);
  const [indexActiveItem, setIndexActiveItem] = useState();

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
  const [isAdded, setIsAdded]                 = useState(false);

  const [isMobileView, setIsMobileView] = useState(null);

  const { cartItems, setCartItems } = useCartStore(); 

  const middle = 0;

  const location = useLocation();
  const loc = location.hash.split("").splice(1).join('');



  let activeItem = filteredColorSlider.filter(item => {
    if (`${item?.article}` === loc) {

      return item
    }
  })
  activeItem = activeItem[0];

  const changeSlider = (item) => {
    navigate(`#${item.article}`);
    setColorArticle(!!item?.article && item?.article); // for change article in BlockTitle

    setActiveColor(item.article);

    setColorTitle(!!item?.color && item?.color); // for BlockTitle mobile
    setSliderImage(!!item?.characteristicsSlider && item?.characteristicsSlider); // for change main Slider

    const isInCart = !!cartItems.find(cartItem => cartItem.article === item?.article);
    setIsAdded(isInCart); // for check product in cart
  };

  const changeItemSlider = (index) => {
    setSelectedItemForMainSlider(index);
  };

  useEffect(() => {
    let number = filteredColorSlider.findIndex(item => item.article === loc);

    if (location.hash) {
      setIndexActiveItem(
        number === -1 ? middle : number
      )
      return changeSlider(!!activeItem ? activeItem : filteredColorSlider[middle])
    }

    if (filteredColorSlider.length !== 1) {
      setIndexActiveItem(middle);
      return !!filteredColorSlider && changeSlider(!!filteredColorSlider && filteredColorSlider[middle]);
    } else {
      setIndexActiveItem(0)
      return !!filteredColorSlider && changeSlider(!!filteredColorSlider && filteredColorSlider[0]);
    }

  }, [cartItems]);

  useEffect(() => {
  const determineScreenSize = () => {
      const initialView = window.innerWidth < 600;
      setIsMobileView(initialView);
    };

    determineScreenSize();

    const handleWindowResize = () => {
      setIsMobileView(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const addToBasket = (data, loc) => {
    const updatedCartItems = addToLocalStorage(data, loc);
    setCartItems(updatedCartItems);
    setIsAdded(true);
    setIsBasketView(true);
  };

  return (
    <>

        {isMobileView ? (
          <BlockTitle
            title={title}
            article={colorArticle}
            colorTitle={colorTitle}
          />
        ) : null}

        <div className="characteristics-box">
          <div className="vertical-slider-wrapper">
            <SliderMiniature 
              sliderImage={sliderImage}
              selectedIndex={selectedItemForMainSlider}
              changeItemSlider={changeItemSlider}
            />
          </div>
          <div className="main-slider-wrapper">
            <MainSlider
              sliderImage={sliderImage}
              selectedIndex={selectedItemForMainSlider}
              changeItemSlider={changeItemSlider}
            />
          </div>
          
          <div className="colors-box">
            <TitleBox
              colorArticle={colorArticle}
              title={title}
              colorTitle={colorTitle}
            />
            <ColorSlider
              data={filteredColorSlider}
              changeSlider={changeSlider}
              colorTitle={colorTitle}
            />
            <div className={"product-basket"} id={"block-buy"}>
              <PriceBox price={price} oldPrice={oldPrice}/>
              {isAdded ? (
                <a href="/order" className={"product-basket-button"}>
                  {t('product.placingAnOrder')}
                </a>
              ) : (
                <div className={"product-basket-button"} onClick={() => addToBasket(data, loc)}>
                  {t('product.addToBasket')}
                </div>
              )}
            </div>
            {relatedAccessories.length !== 0 && type === 'product'
              && <RelatedMittensProduct
                products={products}
                colorArticle={colorArticle}
                colorTitle={colorTitle}
                title={titleRelatedProducts}
                colorSlider={filteredColorSlider}
                relatedAccessories={relatedAccessories}
              />
            }
            {relatedAccessories.length !== 0 && type === 'accessories'
              && <RelatedMittensAccessories
                  relatedAccessories={relatedAccessories}
              />
            }
          </div>

        </div>
    </>
  )
}

export default IconColorSlider

