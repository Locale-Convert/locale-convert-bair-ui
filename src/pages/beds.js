import * as React from "react"
import { graphql } from "gatsby";
import CatalogPage from "../modules/CatalogPage";
import Seo from "../components/Seo/Seo";

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
      MetaInfoBeds {
        metaDescription
        metaTitle
        catalogBanner {
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
      }
    }
  }
`


const Beds = ({ data }) => {
  const { strapiCatalogPageMeta, allStrapiBeds } = data;
  const meta = strapiCatalogPageMeta?.MetaInfoBeds;

  return (
    <>
      <Seo
        title={meta?.metaTitle}
        description={meta?.metaDescription}
      />
      <CatalogPage
        nodes={allStrapiBeds.nodes}
        categoryTitle="Ліжка"
        banner={meta.catalogBanner}
      />
    </>
  );
};

export default Beds;
