import React from "react";

const ProductColors = ({ colors = [], maxVisible = 5 }) => {
  const visibleColors = colors.slice(0, maxVisible);
  const hiddenCount = colors.length - maxVisible;

  return (
    <div className="product-colors">
      {visibleColors.map((c, i) => (
        <span
          key={i}
          className="color-dot"
          style={{ backgroundColor: c.hash }}
        ></span>
      ))}
      {hiddenCount > 0 && (
        <span className="more-colors">+{hiddenCount}</span>
      )}
    </div>
  );
};

export default ProductColors;
