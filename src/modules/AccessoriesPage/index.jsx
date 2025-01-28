import React, { useState } from "react"
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BlockBuy from "../../components/BlockBuy/BlockBuy";
import Characteristics from "../../components/Characteristics/Characteristics";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import IconColorSlider from "../../components/IconColorSlider/IconColorSlider";
import SliderVideoProduct from "../../components/SliderVideoProduct/SliderVideoProduct";
import CommunicationButton from "../../components/CommunicationButton/CommunicationButton";
import { useLocation } from "@reach/router";
import relatedProductsHook from "../ProductPage/hooks";
import CoveringImageComponent from "../../components/CoveringImageComponent/CoveringImageComponent";


const AccessoriesPage = ({
  data,
  relatedProducts: {
    nodes
  },
  also
}) => {
  const {
    title,
    price,
    description,
    colorSlider,
    oldPrice,
    videoUrl
  } = data;
  const location = useLocation();
  const relatedProducts = relatedProductsHook(nodes, location);
  const relatedAccessories = relatedProductsHook(also.nodes, location);
  const [isBasketView, setIsBasketView] = useState(false);
  const [activeColor, setActiveColor]   = useState('');

  return (
    <div className={"wrapper-mobile"}>
      <Header isBasketView={isBasketView} setIsBasketView={setIsBasketView}/>
      {!!colorSlider &&
        <IconColorSlider
          type               = 'accessories' 
          price={price}
          oldPrice = {oldPrice}
          data={data}
          colorSlider={colorSlider}
          titleRelatedProducts={'Разом з рукавичками'}
          relatedAccessories = {relatedAccessories}
          title={title}
          setIsBasketView={setIsBasketView}
          setActiveColor={setActiveColor}
        />
      }

      <div className="description-box description-box-wrapper">
        <div className="desc-characteristics">
          <Characteristics
            desription={description}
          />
        </div>
        <div className="desc-video wrapper">
          <SliderVideoProduct
            videoSlider={videoUrl}
            title={'Відео'}
            classTitle={'product-video-title'}
            classSlider={'slide-margin'}
            breakpoints={{
              1440: {
                slidesPerView: 1.8,
              },
              1350: {
                slidesPerView: 2,
              },
              1260: {
                slidesPerView: 1.5,
              },
              1200: {
                slidesPerView: 1.6,
              },
              1100: {
                slidesPerView: 1.6,
              },
              1024: {
                slidesPerView: 1.4,
              },
            }}
          />
        </div>
      </div>
      {/* <Accessories data={nodes} title={"Iншi моделi"}/> */}
      {/* <RichDescription colorSlider={colorSlider} activeColor={activeColor}/> */}
      <CoveringImageComponent colorSlider={colorSlider} activeColor={activeColor} />
      <RelatedProducts data={relatedProducts} title={"Пропонуємо разом з рукавичками"} />
      <BlockBuy price={price} oldPrice={oldPrice} data={data} setIsBasketView={setIsBasketView}/>
      <CommunicationButton />
      <Footer link={"#top"} />
    </div>
  )
}

export default AccessoriesPage

