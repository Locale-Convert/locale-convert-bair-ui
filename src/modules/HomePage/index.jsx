import React, { useState, useEffect } from "react";
import Header from "../../components/Header/Header";
import MainBanner from "../../components/MainBanner/MainBanner";
import MainCatalog from "../../components/MainCatalog/MainCatalog";
import Promo from "../../components/Promo/Promo";
import Footer from "../../components/Footer/Footer";
import PromoTwo from "../../components/PromoTwo/PromoTwo";
import PromoTextBottom from "../../components/PromoTextBottom/PromoTextBottom";
import PromoWithIcon from "../../components/PromoWithIcon/PromoWithIcon";
import Accordion from "../../components/Accordion/Accordion";
import SliderPromoSlider from "../../components/SliderPromoSlider/SliderPromoSlider";
import SliderInstagram from "../../components/SliderInstagram/SliderInstagram";
import CommunicationButton from "../../components/CommunicationButton/CommunicationButton";
import { graphql, useStaticQuery } from "gatsby";
import AccessoriesDesktop from "../../components/AccessoriesDesktop/AccessoriesDesktop";
import MainBannerWithText from "../../components/MainBannerWithText/MainBannerWithText";
import PromoTh from "../../components/PromoTh/PromoTh";
import Accessories from "../../components/Accessories/Accessories";


export const query = graphql`
    query HomePage{
        allStrapiProducts(sort: { fields: priority, order: DESC }) {
            nodes {
                stickerBlackFriday
                stickerBlackFridayTitle
                stickerNew
                stickerNewTitle
                stickerSale
                stickerSaleTitle
                id
                updatedAt
                isPriceFrom
                colorSlider {
                    colorPrice
                    colorOldPrice
                    coloStickerSaleTitle
                    isSale
                    isSaleTitle
                    visible
                    color
                    article
                    mainImageColor {
                        localFile {
                            childImageSharp {
                                gatsbyImageData
                            }
                        }
                    }
                    imageColor {
                        localFile {
                            childImageSharp {
                                gatsbyImageData
                            }
                        }
                    }
                    characteristicsSlider {
                        localFile {
                            childImageSharp {
                                gatsbyImageData
                            }
                        }
                    }
                }
                title
                price
                oldPrice
                url
                mainImage {
                    localFile {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
                mainImg {
                    desktopImage {
                        alternativeText
                        localFile {
                            childImageSharp {
                                gatsbyImageData
                            }
                        }
                    }
                    mobileImage {
                        alternativeText
                        localFile {
                            childImageSharp {
                                gatsbyImageData
                            }
                        }
                    }
                }
            }
        }

        allStrapiAccessories {
            nodes {
                stickerBlackFriday
                stickerBlackFridayTitle
                stickerNew
                stickerNewTitle
                stickerSale
                stickerSaleTitle
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
                isPriceFrom
                colorSlider {
                  colorPrice
                  colorOldPrice
                  coloStickerSaleTitle
                  isSale
                  isSaleTitle
                  color
                  visible
                  article
                  mainImageColor {
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                }
                mainImg {
                  desktopImage {
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  mobileImage {
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                }
            }
        }
        strapiHomePageMeta {
            metaDescription
            metaTitle
        }
        strapiHomePage {
            videoSlider {
                localFile {
                    url
                }
            }
            videoUrl {
                url
            }
            mainPromo {
                desktopImage {
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                mobileImage {
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
            }
            promoOne {
                desktopImage {
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                mobileImage {
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
            }
            promoTwo {
                desktopImage {
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                mobileImage {
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
            }
            promoThree {
                desktopImage {
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                mobileImage {
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
            }
            promoFour {
                desktopImage {
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                mobileImage {
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
            }
            promoFive {
                desktopImage {
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                mobileImage {
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
            }
        }
    }
`


const HomePage = () => {
  const {
    allStrapiProducts,
    allStrapiAccessories: {
      nodes
    },
    strapiHomePage: {
      videoUrl,
      mainPromo,
      promoOne,
      promoTwo,
      promoThree,
      promoFour,
      promoFive
    }
  } = useStaticQuery(query)


  const [isMobileView, setIsMobileView] = useState(null);
  const [isBasketView, setIsBasketView] = useState(false);

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
      {isMobileView ? (
        <div className={"wrapper-mobile"}>
          <Header isBasketView={isBasketView} setIsBasketView={setIsBasketView}/>
          <MainBanner promo={mainPromo} />
          <MainBannerWithText />
          <MainCatalog data={allStrapiProducts} />
          <Promo promo={promoOne} />
          <PromoTwo promo={promoTwo} />
          <PromoTextBottom promo={promoFour} />
          <PromoWithIcon promo={promoThree} />
          <PromoTh />
          <Accessories data={nodes} title={"Рукавички в колір конверту"} />
          <SliderPromoSlider videoSlider={videoUrl} />
          <SliderInstagram />
          <Accordion />
          <CommunicationButton />
          <Footer link={"#top"} />
        </div>
      ) : (
        <div className={"wrapper-mobile"}>
          <Header isBasketView={isBasketView} setIsBasketView={setIsBasketView}/>
          <MainBanner promo={mainPromo} />
          <div className="promo-flex">
            <Promo promo={promoOne} />
            <PromoTwo promo={promoTwo} />
            <PromoWithIcon promo={promoThree} />
            <PromoTextBottom promo={promoFour} />
          </div>
          <MainCatalog data={allStrapiProducts} />
          <AccessoriesDesktop data={nodes} promo={promoFive} />
          <SliderPromoSlider videoSlider={videoUrl} />
          <SliderInstagram />
          <Accordion />
          <CommunicationButton />
          <Footer link={"#top"} />
        </div>

      )}


    </>
  )
}

export default HomePage





