import * as React from "react"
import HomePage from "../modules/HomePage";
import {graphql,useStaticQuery} from "gatsby";

import Seo from "../components/Seo/Seo";

export const query = graphql`
    query IndexPage{
        allStrapiProducts(sort: { fields: priority, order: DESC }) {
            nodes {
                id
                title
                price
                oldPrice
                url
                updatedAt
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
        allStrapiAccessories {
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

const IndexPage = () => {
  return (
      <HomePage />
  )
}

export default IndexPage

export const Head = () => {
    const {
        strapiHomePageMeta: {
            metaDescription,
            metaTitle
        }
    } = useStaticQuery(query)
  return (
    <Seo title={metaTitle} description={metaDescription} />
)}



