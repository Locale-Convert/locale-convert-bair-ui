import React from "react"
import "../../styles/style.css"
import arrow from "../../images/arrow-white.png"

const ToTop = ({link}) => {
  return (
    <div className="back-to-top-wrapper">
      <a href={link} className="back-to-top-link" aria-label="Scroll to Top">
        <img className={"back-arrow-image"} src={arrow} alt={""}/>
      </a>
    </div>
  )
}

export default ToTop
