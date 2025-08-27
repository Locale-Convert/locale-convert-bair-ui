import React, { useState } from "react"
import './style.css';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Accordion from "../../components/Accordion/Accordion";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";

const StrollersPage = ({ nodes }) => {
  const [isBasketView, setIsBasketView] = useState(false);

  return (
    <div className="strollers-wrapper">
      <Header isBasketView={isBasketView} setIsBasketView={setIsBasketView} />
      
      <div className="catalog-wrapper">
        <ProductsSlider
          data={nodes}
          title="Коляски"
          sliderSettings={{
            mobileAsGrid: true,
            desktopAsGrid: true, 
            initialCount: 8,
            loadMoreCount: 4  
          }}
        />
      </div>

      <Accordion
        showCategories={false}
        category="Коляски"
      />

      <Footer link="#top" />
    </div>
  )
}

export default StrollersPage
