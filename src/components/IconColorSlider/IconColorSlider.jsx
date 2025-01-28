import React, {
  useState,
  useEffect,
  useMemo
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


import "swiper/css";
import "swiper/css/pagination";
import RelatedMittensAccessories from "./RelatedMittensAccessories";

let ReactPixel = null;

const IconColorSlider = ({ type, data, colorSlider, title, price, oldPrice, products, titleRelatedProducts, relatedAccessories = [], setIsBasketView, setActiveColor}) => {

  const filteredColorSlider = colorSlider.filter(item => item.visible === null || item.visible === true);

  const [colorArticle, setColorArticle]       = useState("");
  const [colorTitle, setColorTitle]           = useState("");
  const [currentColor, setCurrentColor]       = useState("");


  const [sliderImage, setSliderImage]         = useState([]);
  const [selectedItemForMainSlider, setSelectedItemForMainSlider] = useState(0);
  const [indexActiveItem, setIndexActiveItem] = useState();
  
  const [isAdded, setIsAdded]                 = useState(false);

  const [isMobileView, setIsMobileView] = useState(null);

  const { cartItems, setCartItems } = useCartStore(); 

  const middle = 0;

  const location = useLocation();

  const loc = location.hash.slice(1);

  let activeItem = filteredColorSlider.filter(item => {
    if (`${item?.article}` === loc) {

      return item
    }
  })
  activeItem = activeItem[0];

  const loadReactPixel = async (article, pathname) => {
    if(ReactPixel) {
      ReactPixel.fbq('track', 'Change color', {
        item_id: article,
        page_path: pathname.href,
      });
    }

    if (!ReactPixel) {
      const { default: pixel } = await import('react-facebook-pixel');
      ReactPixel = pixel;
      ReactPixel.init(`665127785242009`);

      ReactPixel.fbq('track', 'PageView', {
        item_id: article,
        page_path: pathname.href,
      });
    }
  };
  

  const changeSlider = (item) => {
    const currentUrl = new URL(location.href);

    currentUrl.hash = item.article;
  
    const searchParams = new URLSearchParams(currentUrl.search);

    const newUrl = `${currentUrl.pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}${currentUrl.hash}`;
  
    navigate(newUrl);

    loadReactPixel(item.article, currentUrl);

    setCurrentColor(item);
    setColorArticle(!!item?.article && item?.article); // для зміни статті в BlockTitle
    setActiveColor(item.article);
    setColorTitle(!!item?.color && item?.color); // для BlockTitle mobile
    setSliderImage(!!item?.characteristicsSlider && item?.characteristicsSlider); // для зміни основного слайдера
  
    const isInCart = !!cartItems.find(cartItem => cartItem.article === item?.article);
    setIsAdded(isInCart); // для перевірки, чи продукт в кошику
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

  const hasGloves = cartItems.some(item => {
    const foundById = relatedAccessories.some(accessory => accessory.id === item.id);
    
    if (!foundById) {
        return (
          relatedAccessories[0]?.colorSlider.some(colorItem => colorItem.article === item.article) ||
          relatedAccessories[1]?.colorSlider.some(colorItem => colorItem.article === item.article)
        );
    }
    
    return true;
});


  const [accessoriesItemOne, accessoriesItemTwo] = useMemo(() => {
    if (!relatedAccessories || relatedAccessories.length < 2) {
        return [null, null];
    }

    const [firstAccessory, secondAccessory] = relatedAccessories;

    const itemOne = firstAccessory.colorSlider?.find(access => access.color === colorTitle) || null;
    const itemTwo = secondAccessory.colorSlider?.find(access => access.color === colorTitle) || null;

    return [itemOne, itemTwo];
  }, [relatedAccessories, colorTitle]);

  return (
    <>

        {isMobileView ? (
          <BlockTitle
            item={data}
            title={title}
            currentColor={currentColor}
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
              item={data}
              colorArticle={colorArticle}
              currentColor={currentColor}
              title={title}
              colorTitle={colorTitle}
            />
            <ColorSlider
              data={filteredColorSlider}
              changeSlider={changeSlider}
              colorTitle={colorTitle}
            />
            <div className={"product-basket"} id={"block-buy"}>
              <PriceBox price={price} oldPrice={oldPrice} currentColor={currentColor}/>
              {isAdded ? (
                <a href="/order" className={"product-basket-button"}>
                  Перейти до оформлення 
                </a>
              ) : (
                <div className={"product-basket-button"} onClick={() => addToBasket(data, loc)}>
                  Додати в кошик
                </div>
              )}
            </div>
            {relatedAccessories.length !== 0 && type === 'product' && (accessoriesItemOne && accessoriesItemTwo) && !hasGloves
              && <div className="related-accessories-box">
                  <RelatedMittensProduct
                    colorTitle={colorTitle}
                    title={titleRelatedProducts}
                    relatedAccessories={relatedAccessories}
                    addToBasket={addToBasket}
                  />
              </div>
            }
            {relatedAccessories.length !== 0 && type === 'accessories'
              && 
              <div className="related-accessories-box">
                  <RelatedMittensAccessories relatedAccessories={relatedAccessories}/>
              </div>
            }
          </div>

        </div>
    </>
  )
}

export default IconColorSlider

