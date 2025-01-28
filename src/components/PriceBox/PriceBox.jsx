import React from "react";


const PriceBox = ({ price, oldPrice, currentColor}) => {
    return (
        <>
            {currentColor?.colorOldPrice || oldPrice
                ? <div className={"block-buy-price-old-box-web"}>
                    <div className={"block-buy-price-old"}>{currentColor?.colorOldPrice ? currentColor?.colorOldPrice : oldPrice}грн</div>
                    <div className={"block-buy-price-web"}>{currentColor?.colorPrice ? currentColor?.colorPrice : price} грн</div>
                </div>
                : <div className={"block-buy-price-web"}>
                    {currentColor?.colorPrice ? currentColor?.colorPrice : price} грн
                </div>
            }
        </>
    )
}

export default PriceBox;

