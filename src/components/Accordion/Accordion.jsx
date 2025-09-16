import React, { useState, useMemo, useEffect } from "react";
import AccordionItem from "./AccordionItem";
import FAQ_DATA from "./faqData";
import ShowMoreButton from "../ShowMoreButton/ShowMoreButton";

import "./styles.css";

const Accordion = ({
  title = "Часто запитують",
  showCategories = true,
  category = null
}) => {
  const categories = Object.keys(FAQ_DATA);
  const [activeCategory, setActiveCategory] = useState(category || categories[0]);

  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(8);

  const isProductPage = Boolean(category);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
    setVisibleCount(prev => prev + (isMobile ? 5 : 8));
  };

  const computedTitle = isProductPage ? (
    <div className="title">
      <div>{questionsForActive.length} питань</div>
      <div>про {activeCategory.toLowerCase()}</div>
    </div>
  ) : title;

  return (
    <div className={`accordion-wrapper ${isProductPage ? "product-page" : ""}`}>
      <div className="accordion-header-row">
        <div className="accordion-left">
          <h2 className="accordion-main-title">{computedTitle}</h2>

          {showCategories && !isProductPage && (
            <div className="accordion-categories">
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
          )}
        </div>

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
