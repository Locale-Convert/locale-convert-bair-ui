import React from "react"
import AccessoriesPage from "../modules/AccessoriesPage";
import Seo from "../components/Seo/Seo";
import {graphql} from "gatsby";


const StrapiProductUrl = ({ data }) => {
  return (
    <AccessoriesPage
      data={data.strapiAccessories}
      relatedProducts={data.allStrapiProducts}
      also={data.allStrapiAccessories}
    />
  )
}

export default StrapiProductUrl

export const Head = ({data}) => {
  const metaTitle = data.strapiAccessories.metaTitle;
  const metaDescription = data.strapiAccessories.metaDescription;
  return (
    <Seo title={metaTitle} description={metaDescription} />
  )}

export const query = graphql`
    query PageAccessoriesItem($url: String!){
        strapiAccessories(url: { eq: $url }) {
            url
            title
            price
            description
            oldPrice
            videoSlider {
                localFile {
                    url
                }
            }
            videoUrl {
                url
            }
            mainImage {
              localFile {
                  childImageSharp {
                      gatsbyImageData
                  }
              }
          }
            colorSlider {
                color
                visible
                article
                imageColor {
                    localFile {
                        childImageSharp {
                            gatsbyImageData
                        }
                    }
                }
                mainImageColor {
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
            }
            metaDescription
            metaTitle
        }
        allStrapiAccessories {
            nodes {
                id
                title
                price
                oldPrice
                url
                colorSlider {
                  color
                  visible
                  article
              }
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
        allStrapiProducts(sort: { fields: priority, order: DESC }) {
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
            }
        }
    }
`
