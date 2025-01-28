import React from "react"
import "../../styles/style.css"
import promoTh from "../../images/block_7.jpg";
import { StaticImage } from "gatsby-plugin-image"


const PromoTh = () => {
  return (
    <div className={"main_banner_image-promo banner-padding-right"}>
      <div className={"promoTh_image_text"}>
        <h2 className={"promo-text"}>Доповніть коляску теплим і стильним аксесуаром
        </h2>
      </div>
      <StaticImage
        src="../../images/block_7.jpg"
        className={"image__promo_banner"}
        alt=""
        objectFit="cover"
      />
    </div>
  )
}

export default PromoTh
