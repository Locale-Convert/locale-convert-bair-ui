import React, { useState } from "react";
import { Link } from "gatsby";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import CommunicationButton from "../components/CommunicationButton/CommunicationButton";
import Seo from "../components/Seo/Seo";

const NotFoundPage = () => {
  const [isBasketView, setIsBasketView] = useState(false);

  return (
    <>
      <Seo
        title="404: Сторінку не знайдено"
        description="На жаль, сторінка, яку ви шукали, не існує."
      />
      <div className="condition-wrapper">
        <Header isBasketView={isBasketView} setIsBasketView={setIsBasketView} />
        <div className="condition-box">
          <div className="condition-content">
            <div
              style={{
                fontSize: "10rem",
                fontWeight: "bold",
                textAlign: "center",
                lineHeight: "1",
                marginBottom: "10%",
              }}
            >
              404
            </div>
            <h1 className="condition-title">Ой, такої сторінки не існує</h1>
            <p>
              Здається, ви потрапили за невірною адресою. Можливо, посилання, за
              яким ви перейшли, застаріло, ви допустили помилку в адресі, або ж
              ми перемістили цю сторінку.
            </p>
            <p>
              Але не хвилюйтеся! Пропонуємо повернутися на головну сторінку або
              переглянути наші популярні товари.
            </p>
            <br />
            <Link
              to="/"
              className="modal-page-button"
              style={{ maxWidth: "200px", textDecoration: "none" }}
            >
              На головну
            </Link>
          </div>
        </div>
        <CommunicationButton />
        <Footer />
      </div>
    </>
  );
};

export default NotFoundPage;

