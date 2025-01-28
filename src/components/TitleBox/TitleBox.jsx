import React from "react";


const TitleBox = ({ item, colorArticle, title, colorTitle, currentColor }) => {
    const activeStickers = [
        item.stickerNew ? 'green' : null,
        item.stickerBlackFriday ? 'black' : null,
        item.stickerSale || currentColor.coloStickerSaleTitle ? 'yellow' : null,
    ].filter(Boolean);

    const showSingleSticker = activeStickers.length === 1 || currentColor.coloStickerSaleTitle;

    return (
        <div className={"titles-desktop"} id={"block-title"}>
            <div className={"article-desktop"}>Aртикул: {colorArticle}</div>
            <div className="title-with-stickers">
                <h1 className={"title-desktop"}>{title}</h1>
                <div className="stickers">
                    {item.stickerNew ? <div className="sticker green">{item.stickerNewTitle ? item.stickerNewTitle : 'НОВИНКА 2025'}</div> : null}
                    {item.stickerBlackFriday ? <div className="sticker black">{item.stickerBlackFridayTitle ? item.stickerBlackFridayTitle : 'ЧОРНА П\'ЯТНИЦЯ'}</div> : null}
                    {(item.stickerSale || currentColor?.coloStickerSaleTitle) ? <div className="sticker yellow">{currentColor?.coloStickerSaleTitle ? currentColor?.coloStickerSaleTitle : item.stickerSaleTitle}</div> : null}
                </div>
            </div>
            <div className={"color-desktop"}>{colorTitle}</div>
        </div>
    )
}

export default TitleBox;

