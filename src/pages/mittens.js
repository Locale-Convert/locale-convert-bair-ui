import * as React from "react"
import { graphql } from "gatsby";
import CatalogPage from "../modules/CatalogPage";
import Seo from "../components/Seo/Seo";

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
      MetaInfoMittens {
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

const Mittens = ({ data }) => {
  const { strapiCatalogPageMeta, allStrapiMittens } = data;
  const meta = strapiCatalogPageMeta?.MetaInfoMittens;

  return (
    <>
      <Seo
        title={meta?.metaTitle}
        description={meta?.metaDescription}
      />
      <CatalogPage
        nodes={allStrapiMittens.nodes}
        categoryTitle="Рукавички"
        banner={meta.catalogBanner}
      />
    </>
  );
};

export default Mittens;
