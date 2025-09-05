import * as React from "react"
import { graphql } from "gatsby";
import CatalogPage from "../modules/CatalogPage";
import Seo from "../components/Seo/Seo";

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
    strapiCatalogPageMeta {
      MetaTitleFootmufs {
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
  const { strapiCatalogPageMeta, allStrapiFootmuffs } = data;
  const meta = strapiCatalogPageMeta?.MetaTitleFootmufs;

  return (
    <>
      <Seo
        title={meta?.metaTitle}
        description={meta?.metaDescription}
      />
      <CatalogPage
        nodes={allStrapiFootmuffs.nodes}
        categoryTitle="Конверти"
        banner={meta.catalogBanner}
      />
    </>
  );
};

export default CarSeats;
