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
import SaleBanner from "../../components/SaleBanner/SaleBanner";
import BannerWithText from "../../components/BannerWithText/BannerWithText";
import fisrtBanner from "../../images/firstBanner.png";
import secondBanner from "../../images/secondBanner.png";
import ProductsSlider from "../../components/ProductsSlider/ProductsSlider";
import example1 from "../../images/example1.png";

import './style.css';
import SliderVideo from "../../components/SliderVideo/SliderVideo";

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
                smallDescription
                colorsHashes {
                  hash
                }
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
                text
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
                text
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
      // mainPromo,
      promoOne,
      promoTwo,
      // promoThree,
      // promoFour,
      // promoFive
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
          <Header isBasketView={isBasketView} setIsBasketView={setIsBasketView} />
          <SaleBanner />
          <div className="padding-top-bottom">
            <ProductsSlider
              data={allStrapiProducts.nodes}
              title="Коляски"
              sliderSettings={{
                breakpoints: {
                  320: { slidesPerView: 1.2, spaceBetween: 15 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 2, spaceBetween: 20 },
                  1440: { slidesPerView: 2, spaceBetween: 20 },
                },
                catalogLink: "/strollers",
                showPagination: true,
                showNavigation: false,
                mobileAsGrid: true,   // грід тільки на мобайлі
                desktopAsGrid: false, // на десктопі слайдер
              }}
              navigationOnDesktop={false}
            />
          </div>
            <BannerWithText data={promoOne} />
            <div className="padding-top-bottom">
            <ProductsSlider
              data={allStrapiProducts.nodes}
              title="Конверти"
              sliderSettings={{
                breakpoints: {
                  320: { slidesPerView: 1.2, spaceBetween: 15 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 2, spaceBetween: 20 },
                  1440: { slidesPerView: 2, spaceBetween: 20 },
                },
                catalogLink: "/strollers",
                showPagination: true,
                showNavigation: false,
                mobileAsGrid: true,   // грід тільки на мобайлі
                desktopAsGrid: false, // на десктопі слайдер
              }}
              navigationOnDesktop={false}
            />
            </div>
            <BannerWithText data={promoTwo} textStyle={{ maxWidth: '250px' }} />
          <SliderVideo videoSlider={videoUrl} />
          {/* <MainBanner promo={mainPromo} />
          <MainBannerWithText />
          <MainCatalog data={allStrapiProducts} />
          <Promo promo={promoOne} />
          <PromoTwo promo={promoTwo} />
          <PromoTextBottom promo={promoFour} />
          <PromoWithIcon promo={promoThree} />
          <PromoTh />
          <SliderVideo videoSlider={videoUrl}/> */}
          <SliderInstagram />
          <Accordion />
          {/* <CommunicationButton /> */}
          <Footer link={"#top"} />
        </div>
      ) : (
        <div className={"wrapper-mobile"}>
          <Header isBasketView={isBasketView} setIsBasketView={setIsBasketView} />
          <SaleBanner />
          <div className="banner-wrapper">
            <ProductsSlider
              data={allStrapiProducts.nodes}
              title="Коляски"
              sliderSettings={{
                breakpoints: {
                  320: { slidesPerView: 1.2, spaceBetween: 15 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 2, spaceBetween: 20 },
                  1440: { slidesPerView: 2, spaceBetween: 20 },
                },
                catalogLink: "/strollers",
                showPagination: true,
                showNavigation: false,
                mobileAsGrid: true,   // грід тільки на мобайлі
                desktopAsGrid: false, // на десктопі слайдер
              }}
              navigationOnDesktop={false}
            />
            <BannerWithText data={promoOne} />
          </div>
          <div className="banner-wrapper">
            <BannerWithText data={promoTwo} textStyle={{ maxWidth: '250px' }} />
            <ProductsSlider
              data={allStrapiProducts.nodes}
              title="Конверти"
              sliderSettings={{
                breakpoints: {
                  320: { slidesPerView: 1.2, spaceBetween: 15 },
                  768: { slidesPerView: 2, spaceBetween: 20 },
                  1024: { slidesPerView: 2, spaceBetween: 20 },
                  1440: { slidesPerView: 2, spaceBetween: 20 },
                },
                catalogLink: "/strollers",
                showPagination: true,
                showNavigation: false,
                mobileAsGrid: true,   // грід тільки на мобайлі
                desktopAsGrid: false, // на десктопі слайдер
              }}
              navigationOnDesktop={false}
            />
          </div>
          {/* <MainBanner promo={mainPromo} />
          <div className="promo-flex">
            <Promo promo={promoOne} />
            <PromoTwo promo={promoTwo} />
            <PromoWithIcon promo={promoThree} />
            <PromoTextBottom promo={promoFour} />
          </div>
          <MainCatalog data={allStrapiProducts} />
          <AccessoriesDesktop data={nodes} promo={promoFive} /> */}
          {/* <SliderPromoSlider videoSlider={videoUrl} /> */}
          <SliderVideo videoSlider={videoUrl} />
          <SliderInstagram />
          <Accordion />
          {/* <CommunicationButton /> */}
          <Footer link={"#top"} />
        </div>

      )}


    </>
  )
}

export default HomePage





