import React, { useRef, useState } from "react"
import "./styles.css"

const AccordionItem = ({title, description}) => {
  const accordionContentRef = useRef(null)

  const [open, setOpen] = useState(false)

  const triggerOpen = () => setOpen(!open)
  return (
      <div className={`two-storelist__item ${open ? "active" : ""}`}>
        <div
          className={`accordion-title ${open ? "active" : ""}`}
          id="city-1"
          onClick={triggerOpen}
        >
          {title}
        </div>
        <div
          className="accordion-content"
          style={{
            height: open ? accordionContentRef?.current?.offsetHeight + 35 : 0,
          }}
        >
          <div className="content-box" ref={accordionContentRef}>
            {description}
          </div>
        </div>
      </div>
  )
}

export default AccordionItem
