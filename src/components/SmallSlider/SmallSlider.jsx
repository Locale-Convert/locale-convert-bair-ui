import React from "react";

import Glider from "react-glider";
import "glider-js/glider.min.css";
import "../StrollersStandardSlider/slider.css";

const SmallSlider = ({ children }) => {
  return (
    <div className={"relative"}>
      <Glider
        scrollToSlide={3.5}
        responsive={[
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 8,
              slidesToScroll: "auto",
            },
          },
          {
            breakpoint: 479,
            settings: {
              slidesToShow: 8,
              slidesToScroll: "auto",
            },
          },
          {
            breakpoint: 300,
            settings: {
              slidesToShow: 8,
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

export default SmallSlider;
