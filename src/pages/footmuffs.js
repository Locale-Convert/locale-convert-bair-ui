import * as React from "react"
import { graphql } from "gatsby";
import CatalogPage from "../modules/CatalogPage";

export const query = graphql`
  query footmuffs{
    allStrapiFootmuffs(
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

const CarSeats = ({ data }) => {
  return (
    <CatalogPage
      nodes={data.allStrapiFootmuffs.nodes} 
      categoryTitle="Конверти"
    />
  )
}

export default CarSeats;
