import * as React from "react";
import HomePage from "../modules/HomePage";
import { graphql } from "gatsby";
import Seo from "../components/Seo/Seo";

export const query = graphql`
    query IndexPage{
        allStrapiProducts(sort: { fields: priority, order: DESC }) {
            nodes {
                id
                title
                price
                oldPrice
                smallDescription
                productTabTitle
                colorsHashes {
                  hash
                }
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
                id
                title
                price
                oldPrice
                smallDescription
                productTabTitle
                colorsHashes {
                  hash
                }
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
                id
                title
                price
                oldPrice
                smallDescription
                productTabTitle
                colorsHashes {
                  hash
                }
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
                id
                title
                price
                oldPrice
                smallDescription
                productTabTitle
                colorsHashes {
                  hash
                }
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
                id
                title
                price
                oldPrice
                smallDescription
                productTabTitle
                colorsHashes {
                  hash
                }
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
                id
                title
                price
                oldPrice
                smallDescription
                productTabTitle
                colorsHashes {
                  hash
                }
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
                text
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
                text
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
