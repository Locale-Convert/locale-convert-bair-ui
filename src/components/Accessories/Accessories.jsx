import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { getImageHelper } from "../../hooks"

const Accessories = ({data, title}) => {
  return (
      <div className={"main_catalog-box main_catalog-box-margin wrapper "}>
        <div className={"main-title"}>{title}</div>
        <div className={"accessories-block-box"}>
          {!!data && data.map((item,index) => (
            <a href={`/${item.url}/`} key={index} className={"accessories-block-box-item"}>
              <div className={"accessories-block-box-item-image"}>
                <GatsbyImage
                  image={getImageHelper(item.mainImage)}
                  className={"image-width-accessories"}
                  alt="This is a picture of my face."
                  objectFit="contain"
                />
              </div>
              <div className={"main_catalog-box-item-text"}>
                <div className={"main_catalog-box-item-title"}>{item.title}</div>
                <div className={"main_catalog-box-item-price-box"}>
                  {
                    !!item.oldPrice ? (
                      <>
                        <div className={"main_catalog-box-item-old-price"}>{item.oldPrice} грн</div>
                        <div className={"main_catalog-box-item-price"}>{item.price} грн</div>
                      </>
                    ) : (
                      <div className={"main_catalog-box-item-price"}>{item.price} грн</div>
                    )
                  }
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
  )
}

export default Accessories
