import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { GatsbyImage } from "gatsby-plugin-image";
import { getImageHelper } from "../../hooks";

const ColorSlider = ({ data, changeSlider, colorTitle }) => {
    return (
        <div className={"icons-box"} id={"icon-slider"}>
            {data.length > 0 && (
                <div
                    className="icon-slider"
                >
                    {data.map((item, index) => (
                        <div
                            key={index}
                            className={`icon-item ${colorTitle === item.color ? "icon-select-item" : ""}`}
                            // style={{ minWidth: "63px" }}
                            onClick={(event) => {
                                event.stopPropagation();
                                changeSlider(item);
                            }}
                        >
                            <div className={"icon-image"}>
                                <GatsbyImage
                                    image={getImageHelper(item.imageColor)}
                                    className={"three-itempage__max-item-img border-image"}
                                    alt="This is a picture of my face."
                                    objectFit="contain"
                                    imgStyle={{ borderRadius: "100%" }}
                                />
                            </div>
                            <div className={"icon-title"}>{item.color}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ColorSlider;
