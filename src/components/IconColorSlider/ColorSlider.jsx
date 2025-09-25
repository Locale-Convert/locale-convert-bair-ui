import React from "react";
import { GatsbyImage } from "gatsby-plugin-image";
import { getImageHelper } from "../../hooks";

import "./style.css";

const ColorSlider = ({ allData, data, changeSlider, colorTitle }) => {
    return (
        <div className={"icons-box"} id={"icon-slider"}>
            {data.length > 0 && (
                <div className="icon-slider">
                    {data.map((item, index) => {
                        const altText = `Bair ${allData.title || ""}, колір: ${item.color || ""}${
                            item.article ? ` (артикул: ${item.article})` : ""
                        }, фото ${index + 1}`;

                        return (
                            <div
                                key={index}
                                className={`icon-item ${colorTitle === item.color ? "icon-select-item" : ""}`}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    changeSlider(item);
                                }}
                            >
                                <div className={"icon-image"} style={{ position: 'relative' }}>
                                    <GatsbyImage
                                        image={getImageHelper(item.imageColor)}
                                        className={"three-itempage__max-item-img border-image"}
                                        alt={altText}
                                        objectFit="contain"
                                        imgStyle={{ borderRadius: "100%" }}
                                    />
                                    {item.isSale && (
                                        <div className="sale-icon">
                                            {item.isSaleTitle || 'SALE'}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ColorSlider;
