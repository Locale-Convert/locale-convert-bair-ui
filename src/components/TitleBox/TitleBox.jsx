import React from "react";
import '../../../i18n';
import { useTranslation } from 'react-i18next';

const TitleBox = ({ colorArticle, title, colorTitle }) => {
    const {  t } = useTranslation();
return (
    <div className={"titles-desktop"} id={"block-title"}>
        <div className={"article-desktop"}>{t('product.article')}: {colorArticle}</div>
        <h1 className={"title-desktop"}>{title}</h1>
        <div className={"color-desktop"}>{colorTitle}</div>
    </div>
)
}

export default TitleBox;
  
  