import React, { useState, useMemo } from "react";
import './style.css';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Accordion from "../../components/Accordion/Accordion";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";
import Tabs from "../../components/Tabs/Tabs";
import FullWidthBanner from "../../components/FullWidthBanner/FullWidthBanner";

const CatalogPage = ({ nodes, categoryTitle, banner }) => {
    const [isBasketView, setIsBasketView] = useState(false);
    const [activeTab, setActiveTab] = useState("Всі");

    const tabList = useMemo(() => {
        const tabs = Array.from(new Set(nodes.map(item => item.productTabTitle).filter(Boolean)));
        return ["Всі", ...tabs];
    }, [nodes]);

    const filteredNodes = useMemo(() => {
        if (activeTab === "Всі") return nodes;
        return nodes.filter(item => item.productTabTitle === activeTab);
    }, [activeTab, nodes]);

    const sliderTitle = useMemo(() => {
        return activeTab === "Всі" ? categoryTitle : `${activeTab}`;
    }, [activeTab, categoryTitle]);

    return (
        <>
            <Header isBasketView={isBasketView} setIsBasketView={setIsBasketView} />
            <FullWidthBanner data={banner}/>
            <div className="catalog-wrapper">

                <div className="catalog-content">
                    <div className="catalog-title">{sliderTitle}</div>
                    <Tabs items={tabList} onChange={setActiveTab} defaultActive="Всі" />
                    <ProductsSlider
                        data={filteredNodes}
                        sliderSettings={{
                            mobileAsGrid: true,
                            desktopAsGrid: true,
                            initialCount: 8,
                            loadMoreCount: 4
                        }}
                    />
                </div>
            </div>
            <Accordion showCategories={false} category={categoryTitle} />
            <Footer link="#top" />
        </>
    );
};

export default CatalogPage;
