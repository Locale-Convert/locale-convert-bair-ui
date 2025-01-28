import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import ToTop from "../ToTop/ToTop";

export const query = graphql`
  query Footer {
    allStrapiAccessories(sort: { fields: priority, order: DESC }) {
      nodes {
        id
        title
        price
        url
        mainImage {
          localFile {
            url
          }
        }
        updatedAt
      }
    }
    allStrapiProducts {
      nodes {
        id
        title
        price
        url
        updatedAt
      }
    }
  }
`;

const Footer = ({link}) => {
  const { allStrapiAccessories, allStrapiProducts } = useStaticQuery(query);

  const sortedMenuConvert = allStrapiProducts.nodes.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

  const sortedMenuAccessories = allStrapiAccessories.nodes.sort((a, b) => {
    return a.title.localeCompare(b.title);
  });

  return (
    <footer className="footer wrapper" id={"footer"}>
      <div className="footer__container">
        <div className="footer__box">
          <div className="footer__box-title">Конверти</div>
          <div className="footer__box-list">
            {sortedMenuConvert.map((item, index) => (
              <a className="footer__box-list-item" key={index} href={`/${item.url}/`}>
                {item.title}
              </a>
            ))}
          </div>
        </div>
        <div className="footer__box">
          <div className="footer__box-title">Умови</div>
          <div className="footer__box-content-conditions">З правилами та умовами роботи магазину можна ознайомитись <a href="/conditions" className="footer__box-content-links">тут</a>.</div>
        </div>
        <div className="footer__box">
          <div className="footer__box-title">Контакти</div>
          <div className="footer__box-content">
            <div className="footer__box-content-address">ФОП Парненко Вікторія Юріївна</div>
            <div className="footer__box-content-address">м. Харків</div>
            <div className="footer__box-content-address">тел.: +38 (096) 109-30-40</div>
          </div>
        </div>
      </div>
      <p className="footer__copyright">Copyright ©2021 Bair</p>
      <ToTop link={link}/>
    </footer>
  )
}

export default Footer
