import React, { useState, useMemo } from "react";
import "./styles.css";
import AccordionItem from "./AccordionItem";
import FAQ_DATA from "./faqData";

const Accordion = () => {
  const categories = Object.keys(FAQ_DATA);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const questionsForActive = useMemo(() => FAQ_DATA[activeCategory] || [], [activeCategory]);

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
              className={`accordion-category ${cat === activeCategory ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              <span className="category-text">{cat}</span>
              <span className="category-count">{FAQ_DATA[cat].length}</span>
            </div>
          ))}
        </div>

        {/* Права панель з питаннями */}
        <div className="accordion-questions">
          {questionsForActive.map((q, idx) => (
            <AccordionItem key={idx} title={q.title} description={q.description} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
