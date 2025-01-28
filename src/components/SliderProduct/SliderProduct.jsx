import React, {useState, useEffect} from "react";

import Glider from "react-glider";
import "glider-js/glider.min.css";
import "./slider.css";
import { useId } from "@reach/auto-id";

const SliderProduct = ({ children }) => {
  const [slide,setSlide] = useState(1);
  const id = useId();
  const onSlide = (direction,slide) => {
    if (direction && (slide < id)) {
      setSlide(slide + 1)
    }
    if (!direction && (slide > 1)) {
      setSlide(slide - 1)
    }

  }
  return (
    <div className={"slider-product"}>
      <div className={"relative"}>
      <button
        type="button"
        className="glider-prev-vector"
        aria-label="Previous"
        id={`prev-${id}`}
        onClick={() => onSlide(0,slide)}
      >
        «
      </button>
      <button
        type="button"
        className="glider-next-vector"
        aria-label="Next"
        id={`next-${id}`}
        onClick={() => onSlide(1,slide)}
      >
        «
      </button>
      {/*<div className={"number-slide"}>{`${slide}/${length}`}</div>*/}
      <Glider
        hasArrows
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
              duration: 10
            },

          },
          {
            breakpoint: 479,
            settings: {
              slidesToShow: 1,
              slidesToScroll: "auto",
              duration: 10
            },
          },
          {
            breakpoint: 300,
            settings: {
              slidesToShow: 1,
              slidesToScroll: "auto",
              duration: 10
            },
          },
        ]}
      >
        {children}
      </Glider>
    </div>
    </div>
  );
};

export default SliderProduct;
