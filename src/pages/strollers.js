import * as React from "react"
import { graphql } from "gatsby";
import CatalogPage from "../modules/CatalogPage";

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
  return (
    <CatalogPage
      nodes={data.allStrapiProducts.nodes} 
      categoryTitle="Коляски"
      banner={data.strapiHomePage.promoOne}
    />
  )
}

export default Strollers;
