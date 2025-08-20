import React, { useState, useMemo, useEffect } from "react";
import AccordionItem from "./AccordionItem";
import FAQ_DATA from "./faqData";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";

import "./styles.css";

const Accordion = () => {
  const categories = Object.keys(FAQ_DATA);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  // визначаємо моб/десктоп
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // оновлюємо кількість при зміні категорії або брейкпоінта
  useEffect(() => {
    setVisibleCount(isMobile ? 5 : 8);
  }, [isMobile, activeCategory]);

  const questionsForActive = useMemo(
    () => FAQ_DATA[activeCategory] || [],
    [activeCategory]
  );

  const visibleQuestions = questionsForActive.slice(0, visibleCount);
  const hasMore = visibleCount < questionsForActive.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + (isMobile ? 5 : 8));
  };

  return (
    <div className="accordion-wrapper">
      {/* Мобільний заголовок */}
      <h2 className="accordion-main-title mobile">Часто запитують</h2>

      <div className="accordion-content">
        {/* Ліва панель з категоріями */}
        <div className="accordion-categories">
          {/* Десктопний заголовок */}
          <h2 className="accordion-main-title desktop">Часто запитують</h2>

          {categories.map((cat) => (
            <div
              key={cat}
              className={`accordion-category ${
                cat === activeCategory ? "active" : ""
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              <span className="category-text">{cat}</span>
              <span className="category-count">{FAQ_DATA[cat].length}</span>
            </div>
          ))}
        </div>

        {/* Права панель з питаннями */}
        <div className="accordion-questions">
          {visibleQuestions.map((q, idx) => (
            <AccordionItem
              key={idx}
              title={q.title}
              description={q.description}
            />
          ))}

          {hasMore && <ShowMoreButton onClick={handleShowMore} text="Показати ще" />}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
