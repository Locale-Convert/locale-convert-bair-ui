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
    colors: ["#f5f5f5", "#e1bee7", "#c8e6c9", "#ffccbc", "#a1887f"],
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
    colors: ["#ffffff", "#cccccc", "#000000"],
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
    colors: ["#d7ccc8", "#90caf9", "#a5d6a7"],
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
    colors: ["#212121", "#fafafa"],
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
    colors: ["#f5f5f5", "#e1bee7", "#c8e6c9", "#ffccbc", "#a1887f"],
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
    colors: ["#ffffff", "#cccccc", "#000000"],
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
    colors: ["#212121", "#fafafa"],
  }
];

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

  console.log('videoUrl', videoUrl);

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
          <ProductSpecs specs={productSpecsFromApi} />
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
        <CoveringImageComponent colorSlider={colorSlider} activeColor={activeColor} />
        <SliderVideo videoSlider={mockVideoSlider}/>
        <div className="order-wrapper">
          <ProductsSlider data={productsData} title='Коляски'/>
        </div>
        <RelatedProducts data={relatedProducts} title={"Інші моделі"} colorSlider={colorSlider} />
        {
          isMobileView ? <Accessories data={relatedAccessories} title={"Пропонуємо разом з конвертом"} /> : null
        }
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


