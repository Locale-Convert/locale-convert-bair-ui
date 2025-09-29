import React,
{
  useState,
  useEffect
} from "react"
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import IconColorSlider from "../../components/IconColorSlider/IconColorSlider";

import { useLocation } from "@reach/router";
import relatedProductsHook from "./hooks";
import CoveringImageComponent from "../../components/CoveringImageComponent/CoveringImageComponent";
import ProductSpecs from "../../components/ProductSpecs/ProductSpecs";

import './style.css';
import DownloadLinks from "../../components/DownloadLinks/DownloadLinks";
import Accordion from "../../components/Accordion/Accordion";
import SliderVideo from "../../components/SliderVideo/SliderVideo";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";
import DescriptionBlock from "../../components/DescriptionBlock/DescriptionBlock";
import Seo from "../../components/Seo/Seo";

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
    url, // Додаємо url, certificateUrl, instructionsUrl для передачі в Seo
    certificateUrl,
    instructionsUrl,
    metaTitle, // Додаємо мета-поля
    metaDescription,
    videoUrl,
    // Припускаємо, що інші поля моделі, необхідні для Seo (якщо вони були в data),
    // також доступні тут через проп 'data'
  } = data;

  // 2. Логіка для визначення початкового activeColor (з хешу або першого елемента)
  const getInitialArticle = () => {
    // Ця функція коректно працює лише на клієнті (в useEffect),
    // але ми робимо її тут для ініціалізації useState
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashArticle = window.location.hash.replace('#', '');
      const foundVariant = colorSlider.find(variant => variant.article === hashArticle);
      if (foundVariant) {
        return foundVariant.article;
      }
    }
    return colorSlider?.[0]?.article || '';
  };


  const [isMobileView, setIsMobileView] = useState(null);
  const [isBasketView, setIsBasketView] = useState(false);
  // Ініціалізуємо activeColor
  const [activeColor, setActiveColor] = useState(getInitialArticle);

  useEffect(() => {
    // Логіка для оновлення activeColor при зміні хешу (якщо він є)
    const handleHashChange = () => {
      const newHash = window.location.hash.replace('#', '');
      if (newHash && activeColor !== newHash) {
        const foundVariant = colorSlider.find(variant => variant.article === newHash);
        if (foundVariant) {
          setActiveColor(newHash);
        }
      }
    };

    // Перевіряємо, чи потрібно викликати handleHashChange
    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', handleHashChange);
    }

    // Логіка для визначення розміру екрана
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
      if (typeof window !== 'undefined') {
        window.removeEventListener('hashchange', handleHashChange);
      }
    };
  }, [colorSlider, activeColor]);

  const productModelForSeo = {
    title: metaTitle || title,
    description: metaDescription || description,
    url,
    price,
    oldPrice,
    colorSlider,
    activeColor,
    ...data
  };

  return (
    <>
      <Seo
        title={metaTitle || title}
        description={metaDescription || description}
        productModel={productModelForSeo}
      />
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
        <CoveringImageComponent data={data} colorSlider={colorSlider} activeColor={activeColor} />
        <div className="mobile-video">
          <SliderVideo videoSlider={data.videoUrl} />
        </div>
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


