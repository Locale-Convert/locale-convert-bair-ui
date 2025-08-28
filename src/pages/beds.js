import * as React from "react"
import { graphql } from "gatsby";
import CatalogPage from "../modules/CatalogPage";

export const query = graphql`
  query beds {
    allStrapiBeds(
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

const Beds = ({ data }) => {
  return (
    <CatalogPage
      nodes={data.allStrapiBeds.nodes} 
      categoryTitle="Ліжка"
    />
  )
}

export default Beds;
