import * as React from "react"
import { graphql } from "gatsby";
import StrollersPage from "../modules/StrollersPage";

export const query = graphql`
  query strollers {
    allStrapiProducts(sort: { fields: priority, order: DESC }) {
      nodes {
        id
        title
        price
        oldPrice
        smallDescription
        productTabTitle
        stickerBlackFriday
        stickerBlackFridayTitle
        stickerNew
        stickerNewTitle
        stickerSale
        stickerSaleTitle
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
  }
`

const Strollers = ({ data }) => {
  return (
    <StrollersPage nodes={data.allStrapiProducts.nodes} />
  )
}

export default Strollers
