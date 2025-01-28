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
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          imageColor {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          characteristicsSlider {
            localFile {
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
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        mainImg {
          desktopImage {
            alternativeText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          mobileImage {
            alternativeText
            localFile {
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
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          imageColor {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          characteristicsSlider {
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
        }
        mainImg {
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
`;
