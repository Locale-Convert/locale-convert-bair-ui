import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import { getImageHelper } from "../../hooks"

const Accessories = ({ data, title }) => {
  const getLowestPrice = (colorSlider) => {
    if (!colorSlider || colorSlider.length === 0) return null;

    const prices = colorSlider.map(item => parseFloat(item.colorPrice)).filter(price => !isNaN(price));
    return prices.length ? Math.min(...prices) : null;
  };

  return (
    <div className={"main_catalog-box main_catalog-box-margin wrapper "}>
      <div className={"main-title"}>{title}</div>
      <div className={"accessories-block-box"}>
        {!!data && data.map((item, index) => {

              const lowestPrice = getLowestPrice(item.colorSlider);
            
              const finalPrice = lowestPrice !== null ? lowestPrice : item.price;

          return (
            <a href={`/${item.url}/`} key={index} className={"accessories-block-box-item"}>
              <div className="stickers-for-accessories-mobile">
                {item?.stickerNew ? <div className="sticker green">{item.stickerNewTitle ? item.stickerNewTitle : 'НОВИНКА 2025'}</div> : null}
                {item?.stickerBlackFriday ? <div className="sticker black">{item.stickerBlackFridayTitle ? item.stickerBlackFridayTitle : 'ЧОРНА П\'ЯТНИЦЯ'}</div> : null}
                {item?.stickerSale ? <div className="sticker yellow">{item.stickerSaleTitle ? item.stickerSaleTitle : 'ЗНИЖКА'}</div> : null}
              </div>
              <div className={"accessories-block-box-item-image"}>
                <GatsbyImage
                  image={getImageHelper(item.mainImage)}
                  className={"image-width-accessories"}
                  alt="Рукавиці на коляску Bair"
                  objectFit="contain"
                />
              </div>
              <div className={"main_catalog-box-item-text"}>
                <div className={"main_catalog-box-item-title"}>{item.title}</div>
                <div className={"main_catalog-box-item-price-box"}>
                  {
                    !!item.oldPrice && !item.isPriceFrom ? (
                      <>
                        <div className={"main_catalog-box-item-old-price"}>{item.oldPrice} грн</div>
                        <div className={"main_catalog-box-item-price"}>{item.price} грн</div>
                      </>
                    ) : (
                      <div className={"main_catalog-box-item-price"}>{item.isPriceFrom ? 'від' : ''} {finalPrice && item.isPriceFrom ? finalPrice : item.price} грн</div>
                    )
                  }
                </div>
              </div>
            </a>
          )
        } )}
      </div>
    </div>
  )
}

export default Accessories
