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

const productsData = [
  {
    title: "Alaska Thermo",
    description: "Найкомпактніша і найлегша в лінійці. Ідеальна для міста.",
    image: example1,
    price: "2 889",
    oldPrice: "3 499",
    discount: 20,
    isNew: true,
    // warning: "Не сумісно з Balios S",
    colorsHashes: [
      { hash: "#f5f5f5" },
      { hash: "#e1bee7" },
      { hash: "#c8e6c9" },
      { hash: "#ffccbc" },
      { hash: "#a1887f" },
    ],
  },
  {
    title: "Bair Nordie",
    description: "Найкомпактніша і найлегша в лінійці. Ідеальна для міста.",
    image: example1,
    price: "3 299",
    oldPrice: null,
    discount: 20,
    isNew: false,
    warning: null,
    colorsHashes: [
      { hash: "#f5f5f5" },
      { hash: "#e1bee7" },
      { hash: "#c8e6c9" },
      { hash: "#ffccbc" },
      { hash: "#a1887f" },
    ],
  },
  {
    title: "Urban Comfort",
    description: "Зручний конверт для прогулянок у місті.",
    image: example1,
    price: "2 499",
    oldPrice: "2 899",
    discount: 15,
    isNew: false,
    warning: null,
    colorsHashes: [
      { hash: "#f5f5f5" },
      { hash: "#e1bee7" },
      { hash: "#c8e6c9" },
      { hash: "#ffccbc" },
      { hash: "#a1887f" },
    ],
  },
  {
    title: "Winter Pro",
    description: "Теплий варіант для холодної погоди.",
    image: example1,
    price: "3 599",
    oldPrice: null,
    discount: null,
    isNew: true,
    warning: null,
    colorsHashes: [
      { hash: "#f5f5f5" },
      { hash: "#e1bee7" },
      { hash: "#c8e6c9" },
      { hash: "#ffccbc" },
      { hash: "#a1887f" },
    ],
  },
  {
    title: "Alaska Thermo",
    description: "Найкомпактніша і найлегша в лінійці. Ідеальна для міста.",
    image: example1,
    price: "2 889",
    oldPrice: "3 499",
    discount: 20,
    isNew: true,
    // warning: "Не сумісно з Balios S",
    colorsHashes: [
      { hash: "#f5f5f5" },
      { hash: "#e1bee7" },
      { hash: "#c8e6c9" },
      { hash: "#ffccbc" },
      { hash: "#a1887f" },
    ],
  },
  {
    title: "Bair Nordie",
    description: "Найкомпактніша і найлегша в лінійці. Ідеальна для міста.",
    image: example1,
    price: "3 299",
    oldPrice: null,
    discount: 20,
    isNew: false,
    warning: null,
    colorsHashes: [
      { hash: "#f5f5f5" },
      { hash: "#e1bee7" },
      { hash: "#c8e6c9" },
      { hash: "#ffccbc" },
      { hash: "#a1887f" },
    ],
  },
  {
    title: "Winter Pro",
    description: "Теплий варіант для холодної погоди.",
    image: example1,
    price: "3 599",
    oldPrice: null,
    discount: null,
    isNew: true,
    warning: null,
    colorsHashes: [
      { hash: "#f5f5f5" },
      { hash: "#e1bee7" },
      { hash: "#c8e6c9" },
      { hash: "#ffccbc" },
      { hash: "#a1887f" },
    ],
  }
];

const productSpecsFromApi = [
  { attribute: "Процесор", value: "Intel i7" },
  { attribute: "ОЗП", value: "16 ГБ" },
  { attribute: "Диск", value: "512 ГБ SSD" },
  { attribute: "Операційна система", value: "Windows 11" },
  { attribute: "Процесор", value: "Intel i7" },
  { attribute: "ОЗП", value: "16 ГБ" },
  { attribute: "Диск", value: "512 ГБ SSD" },
  { attribute: "Операційна система", value: "Windows 11" },
  { attribute: "Процесор", value: "Intel i7" },
  { attribute: "ОЗП", value: "16 ГБ" },
  { attribute: "Диск", value: "512 ГБ SSD" },
  { attribute: "Операційна система", value: "Windows 11" },
  { attribute: "Процесор", value: "Intel i7" },
  { attribute: "ОЗП", value: "16 ГБ" },
  { attribute: "Диск", value: "512 ГБ SSD" },
  { attribute: "Операційна система", value: "Windows 11" }
]

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
  also
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
        <div className="desc-characteristics">
          <Characteristics description={description} />
          <ProductSpecs specs={activeColor.specifications} />
        </div>
        <div className="order-wrapper">
          <DownloadLinks />
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
        {/* <CoveringImageComponent colorSlider={colorSlider} activeColor={activeColor} /> */}
        <SliderVideo videoSlider={mockVideoSlider} />
        <div className="order-wrapper">
          <ProductsSlider
            data={productsData}
            title="Купляють разом"
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
          category={'Коляски'}
        />

        <Footer link={"#top"} />
      </div>

    </>
  )
}

export default ProductPage


