import * as React from "react"
import { graphql } from "gatsby";
import CatalogPage from "../modules/CatalogPage";
import Seo from "../components/Seo/Seo";

export const query = graphql`
  query strollers {
    allStrapiProducts(
      sort: { fields: priority, order: DESC }
    ) {
      nodes {
        id
        title
        price
        oldPrice
        smallDescription
        productTabTitle
        url
        colorsHashes {
          hash
        }
        mainImage {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
      }
    }
    strapiCatalogPageMeta {
      MetaInfoStrollers {
        metaDescription
        metaTitle
        catalogBanner {
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
    strapiHomePage {
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
          
        }
  }
`

const Strollers = ({ data }) => {
  const { strapiCatalogPageMeta, allStrapiProducts, strapiHomePage } = data;
  const meta = strapiCatalogPageMeta?.MetaInfoStrollers;

  return (
    <>
      <Seo
        title={meta?.metaTitle}
        description={meta?.metaDescription}
      />
      <CatalogPage
        nodes={allStrapiProducts.nodes}
        categoryTitle="Коляски"
        banner={meta.catalogBanner}
      />
    </>
  );
};

export default Strollers;
