import React, { useState } from "react"


import './style.css';

import { graphql, useStaticQuery } from "gatsby";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Accordion from "../../components/Accordion/Accordion";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";

export const query = graphql`
    query strollersPage{
        allStrapiProducts(sort: { fields: priority, order: DESC }) {
            nodes {
                id
                title
                price
                oldPrice
                url
                updatedAt
                mainImage {
                    localFile {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
                mainImg {
                    mobileImage {
                        alternativeText
                        url
                    }
                    desktopImage {
                        alternativeText
                        url
                    }
                }
            }
        }
    }
`

const StrollersPage = () => {
    const {
        allStrapiProducts: {
            nodes
        }
    } = useStaticQuery(query)

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
                category={'Коляски'}
            />
            <Footer link={"#top"} />
        </div>
    )
}

export default StrollersPage


