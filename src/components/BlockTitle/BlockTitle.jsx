import React from "react"
import "../../styles/style.css"

const BlockTitle = ({title, article, colorTitle}) => {
  return (
    <div className={"block-title-box wrapper"} id={"block-title"}>
      <h1 className={"big-title"}>{title}</h1>
      <div>
        <div className={"article"}>Артикул: {article}</div>
        <div className={"color-item"}>{colorTitle}</div>
      </div>
    </div>

  )
}

export default BlockTitle
