import React, { useState, useMemo } from "react";
import './style.css';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Accordion from "../../components/Accordion/Accordion";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";
import Tabs from "../../components/Tabs/Tabs";

const StrollersPage = ({ nodes }) => {
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
        return activeTab === "Всі" ? "Коляски" : `${activeTab}`;
    }, [activeTab]);

    return (
        <div className="strollers-wrapper">
            <Header isBasketView={isBasketView} setIsBasketView={setIsBasketView} />

            <div className="catalog-wrapper">
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

            <Accordion showCategories={false} category="Коляски" />

            <Footer link="#top" />
        </div>
    )
}

export default StrollersPage;
