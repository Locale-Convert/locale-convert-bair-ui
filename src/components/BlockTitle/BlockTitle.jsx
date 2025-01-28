import React from "react";
import "../../styles/style.css";

const BlockTitle = ({ item, title, article, colorTitle, currentColor }) => {
    const activeStickers = [
        item.stickerNew ? 'green' : null,
        item.stickerBlackFriday ? 'black' : null,
        item.stickerSale || currentColor.coloStickerSaleTitle ? 'yellow' : null,
    ].filter(Boolean);

    const stickerCount = activeStickers.length;

    const stickerWidth = stickerCount === 3 ? '33.33%' : stickerCount === 2 ? '50%' : '33.33%';

    return (
        <>
            <div className={"block-title-box wrapper"} id={"block-title"}>
                <h1 className={"big-title"}>{title}</h1>
                <div>
                    <div className={"article"}>Артикул: {article}</div>
                    <div className={"color-item"}>{colorTitle}</div>
                </div>
            </div>
            <div className="title-with-stickers-mobile">
                <div className="stickers stickers-flex">
                    {activeStickers.map((color, index) => (
                        <div key={index} className={`sticker ${color}`} style={{ width: stickerWidth }}>
                            {color === 'green' ? (item.stickerNewTitle || 'НОВИНКА 2025') :
                             color === 'black' ? (item.stickerBlackFridayTitle || 'ЧОРНА П\'ЯТНИЦЯ') :
                             color === 'yellow' ? (currentColor.coloStickerSaleTitle ? currentColor.coloStickerSaleTitle : item.stickerSaleTitle) : null}
                        </div>
                    ))}
                    {stickerCount === 1 && (
                        <>
                            <div className={`sticker ${activeStickers[0]}`} style={{ width: stickerWidth }}>
                                {activeStickers[0] === 'green' ? (item.stickerNewTitle || 'НОВИНКА 2025') :
                                 activeStickers[0] === 'black' ? (item.stickerBlackFridayTitle || 'ЧОРНА П\'ЯТНИЦЯ') :
                                 activeStickers[0] === 'yellow' ? (currentColor.coloStickerSaleTitle ? currentColor.coloStickerSaleTitle : item.stickerSaleTitle) : null}
                            </div>
                            <div className={`sticker ${activeStickers[0]}`} style={{ width: stickerWidth }}>
                                {activeStickers[0] === 'green' ? (item.stickerNewTitle || 'НОВИНКА 2025') :
                                 activeStickers[0] === 'black' ? (item.stickerBlackFridayTitle || 'ЧОРНА П\'ЯТНИЦЯ') :
                                 activeStickers[0] === 'yellow' ? (currentColor.coloStickerSaleTitle ? currentColor.coloStickerSaleTitle : item.stickerSaleTitle) : null}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default BlockTitle;
