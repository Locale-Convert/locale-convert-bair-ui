import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import ToTop from "../ToTop/ToTop";
import { useTranslation } from 'react-i18next';
import '../../../i18n';

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
      }
    }
    allStrapiProducts {
      nodes {
        id
        title
        price
        url
      }
    }
  }
`;

const Footer = ({link}) => {
  const { t } = useTranslation();
  const { allStrapiAccessories, allStrapiProducts } = useStaticQuery(query);

  return (
    <footer className="footer wrapper" id={"footer"}>
      <div className="footer__container">
        <div className="footer__box">
          <div className="footer__box-title">{t('menu.convert')}</div>
          <div className="footer__box-list">
            {allStrapiProducts.nodes.map((item, index) => (
              <a className="footer__box-list-item" key={index} href={`/${item.url}/`}>
                {item.title}
              </a>
            ))}
          </div>
        </div>
        <div className="footer__box">
          <div className="footer__box-title">{t('menu.gloves')}</div>
          <div className="footer__box-list">
            {allStrapiAccessories.nodes.map((item, index) => (
              <a className="footer__box-list-item" key={index} href={`/${item.url}/`}>
                {item.title}
              </a>
            ))}
          </div>
        </div>
        <div className="footer__box">
          <div className="footer__box-title">{t('menu.conditions')}</div>
          <div className="footer__box-content-conditions">{t('footer.conditions.text')}</div>

          {/* <div className="footer__box-content-conditions">З правилами та умовами роботи магазину можна ознайомитись <a href="/conditions" className="footer__box-content-links">тут</a>.</div> */}
        </div>
        <div className="footer__box">
          <div className="footer__box-title">{t('menu.contacts')}</div>
          <div className="footer__box-content">
            <div className="footer__box-content-address">{t('contactsInfo.firstLine')}</div>
            <div className="footer__box-content-address">{t('contactsInfo.secondLine')}</div>
            <div className="footer__box-content-address">{t('contactsInfo.thirdLine')}</div>
          </div>
        </div>
      </div>
      <p className="footer__copyright">Copyright ©2021 Bair</p>
      <ToTop link={link}/>
    </footer>
  )
}

export default Footer
