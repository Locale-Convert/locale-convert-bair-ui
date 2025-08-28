import * as React from "react"
import { graphql } from "gatsby";
import CatalogPage from "../modules/CatalogPage";

export const query = graphql`
  query mittens {
    allStrapiMittens(
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
  }
`

const Mittens = ({ data }) => {
  return (
    <CatalogPage
      nodes={data.allStrapiMittens.nodes} 
      categoryTitle="Рукавички"
    />
  )
}

export default Mittens;
