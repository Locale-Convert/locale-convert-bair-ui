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
      MetaTitleCarSeats {
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
