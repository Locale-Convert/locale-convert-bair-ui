import * as React from "react"
import { graphql } from "gatsby";
import CatalogPage from "../modules/CatalogPage";
import Seo from "../components/Seo/Seo";

export const query = graphql`
  query carSeats {
    allStrapiCarSeats(
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
      MetaTitleCarSeats {
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

const CarSeats = ({ data }) => {
  const { strapiCatalogPageMeta, allStrapiCarSeats } = data;
  const meta = strapiCatalogPageMeta?.MetaTitleCarSeats;

  return (
    <>
      <Seo
        title={meta?.metaTitle}
        description={meta?.metaDescription}
      />
      <CatalogPage
        nodes={allStrapiCarSeats.nodes}
        categoryTitle="Автокрісла"
        banner={meta.catalogBanner}
      />
    </>
  );
};

export default CarSeats;
