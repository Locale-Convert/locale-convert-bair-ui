import * as React from "react";
import { graphql, useStaticQuery } from "gatsby";
import ToTop from "../ToTop/ToTop";

import './styles.css';
import { ArrowBack } from "@mui/icons-material";

export const query = graphql`
  query Footer {
    allStrapiAccessories(sort: { fields: priority, order: DESC }) {
      nodes {
        id
        title
        url
      }
    }
    allStrapiProducts {
      nodes {
        id
        title
        url
      }
    }
  }
`;

const CATEGORIES = [
  { label: "Коляски", url: "/strollers" },
  { label: "Конверти", url: "/footmuffs" },
  { label: "Рукавиці", url: "/mittens" },
  { label: "Автокрісла", url: "/car-seats" },
  { label: "Ліжка", url: "/beds" },
  { label: "Аксесуари", url: "/accessories" },
  { label: "Контакти", url: "/contacts" },
  { label: "Обслуговування клієнтів", url: "/support" },
  { label: "Privacy Policy", url: "/privacy-policy" },
];

const Footer = () => {
  const { allStrapiAccessories, allStrapiProducts } = useStaticQuery(query);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="footer-wrapper">
      <button className="to-top-button" onClick={scrollToTop}>
        <ArrowBack className="arrow-up" />
      </button>
      <div className="footer-top">
        {/* ФОП */}
        <div className="footer-column footer-column-contact desktop-only">
          <div className="footer-phone">
            <a href="tel:+380961093040">+38(096) 109-30-40</a>
          </div>
          <div>ФОП Парненко Вікторія Юріївна</div>
          <div>м. Харків</div>
        </div>

        {/* Категорії */}
        <div className="footer-column footer-column-categories">
          <h4>Категорії</h4>
          <ul className="footer-menu">
            {CATEGORIES.map((item) => (
              <li key={item.url}>
                <a href={item.url}>{item.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Умови */}
        <div className="footer-column footer-column-conditions">
          <h4>Умови</h4>
          <p className="footer__box-content-conditions">
            З правилами та умовами роботи магазину можна ознайомитись{" "}
            <a className="footer__box-content-links" href="/conditions">тут</a>.
          </p>
          {/* Соцмережі під умовами (для десктопа) */}
          <div className="footer-column footer-column-socials desktop-only">
            <ul className="footer-socials">
              <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">facebook</a></li>
              <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">instagram</a></li>
              <li><a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">youtube</a></li>
            </ul>
          </div>
        </div>

        {/* ФОП для мобайла */}
        <div className="footer-column footer-column-contact mobile-only">
          <div>ФОП Парненко Вікторія Юріївна</div>
          <div>м. Харків</div>
          <div className="footer-phone">
            тел.: <a href="tel:+380961093040">+38(096) 109-30-40</a>
          </div>
        </div>

        {/* Соцмережі для мобайла */}
        <div className="footer-column footer-column-socials mobile-only">
          <ul className="footer-socials">
            <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">facebook</a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">instagram</a></li>
            <li><a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">youtube</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div>Copyright ©2025 Bair</div>
        <div className="footer-privacy">
          <a href="/privacy-policy">Політика конфіденційності</a>
        </div>
      </div>

      {/* <ToTop link={'/'}/> */}
    </footer>
  );
};

export default Footer;
