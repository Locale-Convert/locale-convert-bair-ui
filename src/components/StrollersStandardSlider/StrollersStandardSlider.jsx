import React from "react";

import Glider from "react-glider";
import "glider-js/glider.min.css";
import "./slider.css";
import { useId } from "@reach/auto-id";

const StrollersStandardSlider = ({ children }) => {
  const id = useId();
  return (
    <div className={"relative"}>
      <button
        type="button"
        className="glider-prev"
        aria-label="Previous"
        id={`prev-${id}`}
      >
        «
      </button>
      <button
        type="button"
        className="glider-next"
        aria-label="Next"
        id={`next-${id}`}
      >
        «
      </button>
      <Glider
        hasArrows
        draggable
        slidesToShow={1}
        arrows={{
          prev: `#prev-${id}`,
          next: `#next-${id}`,
        }}
        responsive={[
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: "auto",
            },
          },
          {
            breakpoint: 479,
            settings: {
              slidesToShow: 1,
              slidesToScroll: "auto",
            },
          },
          {
            breakpoint: 300,
            settings: {
              slidesToShow: 1,
              slidesToScroll: "auto",
            },
          },
        ]}
      >
        {children}
      </Glider>
    </div>
  );
};

export default StrollersStandardSlider;
