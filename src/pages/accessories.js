import * as React from "react"
import { graphql } from "gatsby";
import CatalogPage from "../modules/CatalogPage";
import Seo from "../components/Seo/Seo";

export const query = graphql`
  query accessories{
    allStrapiAccessories(
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
      MetaTitleAccessories {
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
  }
`


const Accessories = ({ data }) => {
  const { strapiCatalogPageMeta, allStrapiAccessories } = data;
  const meta = strapiCatalogPageMeta?.MetaTitleAccessories;

  return (
    <>
      <Seo
        title={meta?.metaTitle}
        description={meta?.metaDescription}
      />
      <CatalogPage
        nodes={allStrapiAccessories.nodes}
        categoryTitle="Аксесуари"
        banner={meta?.catalogBanner}
      />
    </>
  );
};

export default Accessories;
