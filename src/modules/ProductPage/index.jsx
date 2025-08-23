import React,
  { useState,
    useEffect
  }                        from "react"
import Header              from "../../components/Header/Header";
import Footer              from "../../components/Footer/Footer";
import BlockBuy            from "../../components/BlockBuy/BlockBuy";
import Characteristics     from "../../components/Characteristics/Characteristics";
import Accessories         from "../../components/Accessories/Accessories";
import RelatedProducts     from "../../components/RelatedProducts/RelatedProducts";
import IconColorSlider     from "../../components/IconColorSlider/IconColorSlider";
import SliderVideoProduct  from "../../components/SliderVideoProduct/SliderVideoProduct";
import CommunicationButton from "../../components/CommunicationButton/CommunicationButton";

import { useLocation }     from "@reach/router";
import relatedProductsHook from "./hooks";
import CoveringImageComponent from "../../components/CoveringImageComponent/CoveringImageComponent";
import ProductSpecs from "../../components/ProductSpecs/ProductSpecs";

import './style.css';
import DownloadLinks from "../../components/DownloadLinks/DownloadLinks";

const productSpecsFromApi = [
  { name: "Процесор", value: "Intel i7" },
  { name: "ОЗП", value: "16 ГБ" },
  { name: "Диск", value: "512 ГБ SSD" },
  { name: "Операційна система", value: "Windows 11" },
    { name: "Процесор", value: "Intel i7" },
  { name: "ОЗП", value: "16 ГБ" },
  { name: "Диск", value: "512 ГБ SSD" },
  { name: "Операційна система", value: "Windows 11" },
    { name: "Процесор", value: "Intel i7" },
  { name: "ОЗП", value: "16 ГБ" },
  { name: "Диск", value: "512 ГБ SSD" },
  { name: "Операційна система", value: "Windows 11" },
    { name: "Процесор", value: "Intel i7" },
  { name: "ОЗП", value: "16 ГБ" },
  { name: "Диск", value: "512 ГБ SSD" },
  { name: "Операційна система", value: "Windows 11" }
]

const ProductPage = ({
  data,
  relatedProducts: {
    nodes
  },
  also
}) => {
  const location           = useLocation();
  const relatedProducts    = relatedProductsHook(nodes, location);
  const relatedAccessories = relatedProductsHook(also.nodes, location);

  const {
    title,
    price,
    oldPrice,
    description,
    colorSlider,
    // metaTitle,
    // metaDescription,
    // videoSlider,
    videoUrl
  } = data;

  const [isMobileView, setIsMobileView] = useState(null);
  const [isBasketView, setIsBasketView] = useState(false);
  const [activeColor, setActiveColor]   = useState('');

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

  return (
    <>

      <div className={"wrapper-mobile"}>
        <Header isBasketView={isBasketView} setIsBasketView={setIsBasketView}/>
        {!!colorSlider &&
          <IconColorSlider
            type               = 'product'
            price              = {price}
            oldPrice           = {oldPrice}
            data               = {data}
            colorSlider        = {colorSlider}
            titleRelatedProducts={'Додайте рукавиці для мами'}
            relatedAccessories = {also.nodes}
            title              = {title}
            products           = {nodes}
            setIsBasketView    = {setIsBasketView}
            setActiveColor     = {setActiveColor}
          />
        }
        <div className="desc-characteristics">
          <Characteristics description={description} />
          <ProductSpecs specs={productSpecsFromApi} />
        </div>
        <div className="order-wrapper">
          <DownloadLinks/>
        </div>
          {/* <div className="desc-video">
            <SliderVideoProduct
              videoSlider={videoUrl}
              title={'Відео:'}
              classTitle={'product-video-title'}
              breakpoints={{
                1440: {
                  slidesPerView: 2,
                },
                1350: {
                  slidesPerView: 2,
                },
                1260: {
                  slidesPerView: 2,
                },
                1200: {
                  slidesPerView: 1.5,
                },
                1100: {
                  slidesPerView: 1.5,
                },
                1024: {
                  slidesPerView: 2,
                },
                912: {
                  slidesPerView: 1.1,
                },
                768: {
                  slidesPerView: 1.7,
                },
              }}
            />
          </div> */}
        {/* <RichDescription colorSlider={colorSlider} activeColor={activeColor}/> */}
        <CoveringImageComponent colorSlider={colorSlider} activeColor={activeColor} />
        <RelatedProducts data={relatedProducts} title={"Інші моделі"} colorSlider={colorSlider}/>
        {
          isMobileView ? <Accessories data={relatedAccessories} title={"Пропонуємо разом з конвертом"} /> : null
        }
        {/* <BlockBuy data={data} price={price} oldPrice={oldPrice} setIsBasketView={setIsBasketView}/> */}
        {/* <CommunicationButton /> */}
        <Footer link={"#top"} />
      </div>

    </>
  )
}

export default ProductPage


