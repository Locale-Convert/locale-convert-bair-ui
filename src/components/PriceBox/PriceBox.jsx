import React from "react";


const PriceBox = ({ price, oldPrice}) => {
    return (
        <>
            {!!oldPrice
                ? <div className={"block-buy-price-old-box-web"}>
                    <div className={"block-buy-price-old"}>{oldPrice}грн</div>
                    <div className={"block-buy-price-web"}>{price} грн</div>
                </div>
                : <div className={"block-buy-price-web"}>
                    {price} грн
                </div>
            }
        </>
    )
}

export default PriceBox;

