import React, { useState, useRef, useEffect } from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import "./style.css";

const ProductSpecs = ({ specs = {}, compareHeight = 0 }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  const specsArray = Array.isArray(specs)
    ? specs.filter(item => item?.value != null && item?.value !== "")
    : Object.entries(specs)
        .filter(([_, value]) => value != null && value !== "")
        .map(([key, value]) => ({ attribute: key, value }));

  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new ResizeObserver(() => {
      const specsHeight = contentRef.current.scrollHeight;
      setIsOverflowing(specsHeight > compareHeight); // приховуємо, якщо більше опису
    });

    observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, [specsArray, compareHeight]);

  const renderValue = (value) => {
    if (value == null || value === "") return "";
    if (typeof value === "object") {
      if (Array.isArray(value)) return value.join(", ");
      return Object.entries(value)
        .map(([k, v]) => `${k}: ${v}`)
        .join(", ");
    }
    return value;
  };

  if (specsArray.length === 0) return null;

  return (
    <div className="product-specs">
      <h3 className="specs-title">Характеристика</h3>

      <div
        className={`specs-content ${expanded ? "expanded" : ""}`}
        ref={contentRef}
        style={{
          maxHeight: expanded ? contentRef.current?.scrollHeight : compareHeight
        }}
      >
        {specsArray.map((item, index) => (
          <div className="spec-item" key={index}>
            <span className="spec-name">{item.attribute}</span>
            <span className="spec-value">{renderValue(item.value)}</span>
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
          <ArrowDownwardIcon
            className={`arrow-icon ${expanded ? "rotated" : ""}`}
          />
        </button>
      )}
    </div>
  );
};

export default ProductSpecs;
