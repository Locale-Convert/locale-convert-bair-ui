import React from "react"
import ProductPage from "../modules/ProductPage"
import {graphql} from "gatsby";
import Seo from "../components/Seo/Seo";


const StrapiAccessoriesUrl = ({ data }) => {

  return (
    <ProductPage
      data={data.strapiAccessories}
      relatedProducts={data.allStrapiAccessories}
      also={data.allStrapiAccessories}
      category={'Аксесуари'}
    />
  )
}

export default StrapiAccessoriesUrl

export const query = graphql`
  query AccessoryPage($url: String!) {
    strapiAccessories(url: { eq: $url }) {
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
      certificateUrl
      instructionsUrl
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
            hash
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
                publicURL
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            richDescription {
              localFile {
                publicURL
                childrenImageSharp {
                  gatsbyImageData
                }
              }
            }
            mobileRichDescription {
              localFile {
                publicURL
                childrenImageSharp {
                  gatsbyImageData
                }
              }
            }
            imageColor {
                localFile {
                    publicURL
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
            characteristicsSlider {
                localFile {
                    publicURL
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
        }
        metaTitle
        metaDescription
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
            updatedAt
            isPriceFrom
            colorSlider {
              hash
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
                  publicURL
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
              imageColor {
                  localFile {
                      publicURL
                      childImageSharp {
                          gatsbyImageData
                      }
                  }
              }
              characteristicsSlider {
                  localFile {
                      publicURL
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
                    publicURL
                    childImageSharp {
                        gatsbyImageData
                    }
                }
            }
            mainImg {
                desktopImage {
                  localFile {
                    publicURL
                    url
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                mobileImage {
                  localFile {
                    publicURL
                    url
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
                      publicURL
                      childImageSharp {
                          gatsbyImageData
                      }
                  }
              }
              mainImg {
                desktopImage {
                  localFile {
                    publicURL
                    url
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                mobileImage {
                  localFile {
                    publicURL
                    url
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
                    publicURL
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                imageColor {
                    localFile {
                        publicURL
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
                characteristicsSlider {
                    localFile {
                        publicURL
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



