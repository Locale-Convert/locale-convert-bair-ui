import React from "react"
import ProductPage from "../modules/ProductPage"
import {graphql} from "gatsby";
import Seo from "../components/Seo/Seo";


const StrapiProductUrl = ({ data }) => {

  return (
    <ProductPage
      data={data.strapiProducts}
      relatedProducts={data.allStrapiProducts}
      also={data.allStrapiAccessories}
    />
  )
}

export default StrapiProductUrl


export const Head = ({data}) => {
  const metaTitle = data.strapiProducts.metaTitle;
  const metaDescription = data.strapiProducts.metaDescription;
  return (
    <Seo title={metaTitle} description={metaDescription} />
  )}

export const query = graphql`
  query ProductPage($url: String!) {
    strapiProducts(url: { eq: $url }) {
      id
      url
      title
      price
      description
      description_all {
        description_en
        description_ua
        description_pl
      }

      oldPrice
      mainImage {
        localFile {
            childImageSharp {
                gatsbyImageData
            }
        }
      }
      videoSlider {
          localFile {
              url
          }
      }
        videoUrl {
            url
        }
        colorSlider {
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
            richDescriptionTextLayer_all {
              layer_en {
                localFile {
                  url
                }
              }
              layer_pl {
                localFile {
                  url
                }
              }
              layer_ua {
                localFile {
                  url
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
            richDescriptionTextLayer {
              url
            }
            mobileRichDescription {
              localFile {
                childrenImageSharp {
                  gatsbyImageData
                }
              }
            }
            mobileRichDescriptionTextLayer {
              url
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
            id
            colorSlider {
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
            id
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
      allStrapiAccessories {
          nodes {
              id
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
              colorSlider {
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



