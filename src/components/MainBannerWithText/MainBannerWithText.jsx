import React from "react"
import "../../styles/style.css"
// import two_banner from "../../images/block_2.jpg"
import { StaticImage } from "gatsby-plugin-image"

const MainBannerWithText = () => {
  return (
    <div className={"main_banner_image-promo image-promo-text"}>
      <div className={"banner-box-2"}>
        <div className={"main_banner_text"}>
          <h2 className={"main-title"}>Підійде для люльки, прогулянкової коляски та санчат</h2>
        </div>
        <div className={"main_banner_image"}>
          <div className={"main_banner_image_text"}>
            <div className={"size-banner-text"}><span className={"size-text"}>81</span> см в довжину і вище</div>
            <p className={"size-banner-subtext"}>Можливість регулювання довжини під обраний спосіб використання</p>
          </div>
          <StaticImage
            src="../../images/block_2.jpg"
            className={"image_banner"}
            alt="This is a picture of my face."
            objectFit="contain"
          />
        </div>
      </div>
    </div>
  )
}

export default MainBannerWithText
