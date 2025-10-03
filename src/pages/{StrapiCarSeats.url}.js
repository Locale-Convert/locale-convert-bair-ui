import React from "react"
import ProductPage from "../modules/ProductPage"
import {graphql} from "gatsby";


const StrapiCarSeatsUrl = ({ data }) => {

  return (
    <ProductPage
      data={data.strapiCarSeats}
      relatedProducts={data.allStrapiCarSeats}
      also={data.allStrapiAccessories}
      category={'Автокрісла'}
    />
  )
}

export default StrapiCarSeatsUrl;

export const query = graphql`
  query CarSeatPage($url: String!) {
    strapiCarSeats(url: { eq: $url }) {
      id
      url
      title
      price
      description
      certificateUrl
      instructionsUrl
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
    allStrapiCarSeats {
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



