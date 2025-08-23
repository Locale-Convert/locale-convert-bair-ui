import React, { useState, useRef, useEffect } from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import "./style.css";

const ProductSpecs = ({ specs = [] }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(contentRef.current.scrollHeight > 200);
    }
  }, [specs]);

  return (
    <div className="product-specs">
      <h3 className="specs-title">Характеристика</h3>

      <div
        className={`specs-content ${expanded ? "expanded" : ""}`}
        ref={contentRef}
        style={{ maxHeight: expanded ? contentRef.current?.scrollHeight : 400 }}
      >
        {specs.map((item, index) => (
          <div className="spec-item" key={index}>
            <span className="spec-name">{item.name}</span>
            <span className="spec-value">{item.value}</span>
          </div>
        ))}
      </div>

      {isOverflowing && (
        <button
        className="show-more-btn"
        onClick={() => setExpanded(!expanded)}
        >
        <span className="show-more-text">
            {expanded ? "Показати менше" : "Показати більше"}
        </span>
        <ArrowDownwardIcon className={`arrow-icon ${expanded ? "rotated" : ""}`} />
        </button>
      )}
    </div>
  );
};

export default ProductSpecs;
