import React,
{
  useState,
  useEffect
} from "react"
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import BlockBuy from "../../components/BlockBuy/BlockBuy";
import Characteristics from "../../components/Characteristics/Characteristics";
import Accessories from "../../components/Accessories/Accessories";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import IconColorSlider from "../../components/IconColorSlider/IconColorSlider";
import SliderVideoProduct from "../../components/SliderVideoProduct/SliderVideoProduct";
import CommunicationButton from "../../components/CommunicationButton/CommunicationButton";

import { useLocation } from "@reach/router";
import relatedProductsHook from "./hooks";
import CoveringImageComponent from "../../components/CoveringImageComponent/CoveringImageComponent";
import ProductSpecs from "../../components/ProductSpecs/ProductSpecs";

import './style.css';
import DownloadLinks from "../../components/DownloadLinks/DownloadLinks";
import Accordion from "../../components/Accordion/Accordion";
import SliderVideo from "../../components/SliderVideo/SliderVideo";
import example1 from "../../images/example1.png";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";
import DescriptionBlock from "../../components/DescriptionBlock/DescriptionBlock";

const mockVideoSlider = [
  {
    url: "https://player.vimeo.com/video/1017799800",
    title: "Відео 1: Демонстрація продукту"
  },
  {
    url: "https://player.vimeo.com/video/1017799800",
    title: "Відео 2: Огляд функцій"
  },
  {
    url: "https://player.vimeo.com/video/1017799800",
    title: "Відео 3: Відео-відгук клієнта"
  },
  {
    url: "https://player.vimeo.com/video/1017799800",
    title: "Відео 4: Інструкція по використанню"
  },
  {
    url: "https://player.vimeo.com/video/1017799800",
    title: "Відео 5: Презентація продукту"
  }
];

const ProductPage = ({
  data,
  relatedProducts: {
    nodes
  },
  also,
  category
}) => {
  const location = useLocation();
  const relatedProducts = relatedProductsHook(nodes, location);
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
  const [activeColor, setActiveColor] = useState('');

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
        <Header isBasketView={isBasketView} setIsBasketView={setIsBasketView} />
        {!!colorSlider &&
          <IconColorSlider
            type='product'
            price={price}
            oldPrice={oldPrice}
            data={data}
            colorSlider={colorSlider}
            titleRelatedProducts={'Додайте рукавиці для мами'}
            relatedAccessories={also.nodes}
            title={title}
            products={nodes}
            setIsBasketView={setIsBasketView}
            setActiveColor={setActiveColor}
          />
        }
        <DescriptionBlock
          description={description}
          activeColor={activeColor}
        />
        <div className="order-wrapper">
          <DownloadLinks certificateLink={data?.certificateUrl} instructionLink={data?.instructionsUrl} />
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
        <div className="order-wrapper">
          <ProductsSlider
            data={relatedProducts}
            title="Інші моделі"
            sliderSettings={{
              initialCount: 4,        // скільки продуктів показувати спочатку в мобільному списку
              loadMoreCount: 4,       // скільки додаткових продуктів показувати при натисканні "Показати ще"
              breakpoints: {
                320: { slidesPerView: 1.2, spaceBetween: 15 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
                1440: { slidesPerView: 4, spaceBetween: 20 }, // на 1440px показуємо 4 товари
              },
              catalogLink: null, // посилання на каталог відключене
            }}
            showPagination={true}   // точки пагінації не показуються
            showNavigation={false}    // показуємо тільки стрілки
          />


        </div>
        {/* <RelatedProducts data={relatedProducts} title={"Інші моделі"} colorSlider={colorSlider} /> */}
        {/* {
          isMobileView ? <Accessories data={relatedAccessories} title={"Пропонуємо разом з конвертом"} /> : null
        } */}
        {/* <BlockBuy data={data} price={price} oldPrice={oldPrice} setIsBasketView={setIsBasketView}/> */}
        {/* <CommunicationButton /> */}
        <Accordion
          showCategories={false}
          category={category}
        />

        <Footer link={"#top"} />
      </div>

    </>
  )
}

export default ProductPage


