import React from "react"
import ProductPage from "../modules/ProductPage"
import {graphql} from "gatsby";
import Seo from "../components/Seo/Seo";


const StrapiFootmuffsUrl = ({ data }) => {

  return (
    <ProductPage
      data={data.strapiFootmuffs}
      relatedProducts={data.allStrapiProducts}
      also={data.allStrapiAccessories}
      category={'Конверти'}
    />
  )
}

export default StrapiFootmuffsUrl;


export const Head = ({ data }) => {
  const metaTitle = data.strapiFootmuffs.metaTitle;
  const metaDescription = data.strapiFootmuffs.metaDescription;
  return (
    <Seo title={metaTitle} description={metaDescription} />
  )}

export const query = graphql`
  query FootmuffsPage($url: String!) {
    strapiFootmuffs(url: { eq: $url }) {
      id
      url
      title
      price
      description
      oldPrice
      updatedAt
      stickerBlackFriday
      stickerBlackFridayTitle
      stickerNew
      stickerNewTitle
      stickerSale
      stickerSaleTitle
      mainImage {
        localFile {
            childImageSharp {
                gatsbyImageData
            }
        }
      }
        videoUrl {
            url
        }
        colorSlider {
            colorPrice
            colorOldPrice
            coloStickerSaleTitle
            isSale
            isSaleTitle
            color
            visible
            article
            specifications {
              attribute
              value
            }
            mainImageColor {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            richDescription {
              localFile {
                childrenImageSharp {
                  gatsbyImageData
                }
              }
            }
            mobileRichDescription {
              localFile {
                childrenImageSharp {
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
        metaTitle
        metaDescription
    }
    allStrapiProducts {
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
          }
      }
  }
`



