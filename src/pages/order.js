import * as React from "react";
import { graphql } from "gatsby";
import OrderPage from "../modules/OrderPage";

const Order = ({ data }) => {
  return <OrderPage data={data} />;
};

export default Order;

export const query = graphql`
  query OrderPage {
    allStrapiProducts(sort: { fields: priority, order: DESC }) {
      nodes {
        stickerBlackFriday
        stickerBlackFridayTitle
        stickerNew
        stickerNewTitle
        stickerSale
        stickerSaleTitle
        id
        updatedAt
        isPriceFrom
        colorSlider {
          colorPrice
          colorOldPrice
          coloStickerSaleTitle
          isSale
          isSaleTitle
          visible
          color
          article
          mainImageColor {
            localFile {
              publicURL
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          imageColor {
            localFile {
              publicURL
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          characteristicsSlider {
            localFile {
              publicURL
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
        title
        price
        oldPrice
        url
        mainImage {
          localFile {
            publicURL
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        mainImg {
          desktopImage {
            localFile {
              publicURL
              url
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          mobileImage {
            localFile {
              publicURL
              url
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
    allStrapiAccessories {
      nodes {
        id
        title
        price
        oldPrice
        url
        updatedAt
        mainImage {
          localFile {
            publicURL
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        isPriceFrom
        colorSlider {
          colorPrice
          colorOldPrice
          coloStickerSaleTitle
          isSale
          isSaleTitle
          color
          visible
          article
          mainImageColor {
            localFile {
              publicURL
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          imageColor {
            localFile {
              publicURL
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          characteristicsSlider {
            localFile {
              publicURL
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
        mainImg {
          desktopImage {
            localFile {
              publicURL
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          mobileImage {
            localFile {
              publicURL
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
      }
    }
  }
`;
