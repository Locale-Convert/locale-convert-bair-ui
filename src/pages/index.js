import * as React from "react";
import HomePage from "../modules/HomePage";
import { graphql } from "gatsby";
import Seo from "../components/Seo/Seo";

export const query = graphql`
    query IndexPage{
        allStrapiProducts(sort: { fields: priority, order: DESC }) {
            nodes {
                colorSlider {
                  colorPrice
                  colorOldPrice
                  hash
                }
                id
                title
                price
                oldPrice
                smallDescription
                productTabTitle
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
        allStrapiBeds(sort: { fields: priority, order: DESC }) {
            nodes {
                colorSlider {
                  colorPrice
                  colorOldPrice
                  hash
                }
                id
                title
                price
                oldPrice
                smallDescription
                productTabTitle
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
        allStrapiAccessories(sort: { fields: priority, order: DESC }) {
            nodes {
                colorSlider {
                  colorPrice
                  colorOldPrice
                  hash
                }
                id
                title
                price
                oldPrice
                smallDescription
                productTabTitle
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
        allStrapiCarSeats(sort: { fields: priority, order: DESC }) {
            nodes {
                colorSlider {
                  colorPrice
                  colorOldPrice
                  hash
                }
                id
                title
                price
                oldPrice
                smallDescription
                productTabTitle
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
        allStrapiFootmuffs(sort: { fields: priority, order: DESC }) {
            nodes {
                colorSlider {
                  colorPrice
                  colorOldPrice
                  hash
                }
                id
                title
                price
                oldPrice
                smallDescription
                productTabTitle
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
        allStrapiMittens(sort: { fields: priority, order: DESC }) {
            nodes {
                colorSlider {
                  colorPrice
                  colorOldPrice
                  hash
                }
                id
                title
                price
                oldPrice
                smallDescription
                productTabTitle
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
                    url
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                mobileImage {
                  localFile {
                    url
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
            }
            promoOne {
                desktopImage {
                  localFile {
                    url
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                mobileImage {
                  localFile {
                    url
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
                    url
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                mobileImage {
                  localFile {
                    url
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
                    url
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                mobileImage {
                  localFile {
                    url
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                text
            }
            promoFour {
                desktopImage {
                  localFile {
                    url
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                mobileImage {
                  localFile {
                    url
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                text
            }
            promoFive {
                desktopImage {
                  localFile {
                    url
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                mobileImage {
                  localFile {
                    url
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                text
            }
            promoSix {
                desktopImage {
                  localFile {
                    url
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                mobileImage {
                  localFile {
                    url
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                text
            }
        }
    }
`

const IndexPage = ({ data }) => {
  const { strapiHomePageMeta } = data;
  return (
    <>
      <Seo title={strapiHomePageMeta.metaTitle} description={strapiHomePageMeta.metaDescription} />
      <HomePage data={data} />
    </>
  );
};

export default IndexPage;
