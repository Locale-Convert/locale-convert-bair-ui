import * as React from "react"
import { graphql } from "gatsby";
import StrollersPage from "../modules/StrollersPage";

export const query = graphql`
    query strollers{
        allStrapiProducts(sort: { fields: priority, order: DESC }) {
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

const Conditions = () => {
  return (
      <StrollersPage />
  )
}

export default Conditions;



