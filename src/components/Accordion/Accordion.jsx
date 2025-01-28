import React from "react"
import "./styles.css"
import { dataOne, dataTwo } from "./data"
import AccordionItem from "./AccordionItem";

const Accordion = () => {
  return (
    <div className={"accordion-box accordion-wrapper"} id={"faq"}>
      <h2 className={"main-title accordion-main-title"}>Часто запитують</h2>
    <div className={"accordion-border-top"}>
      {
        dataOne.map((item,index) => (
          <AccordionItem  key={index} title={item.title} description={item.description}/>
        ))
      }
      {
        dataTwo.map((item,index) => (
          <AccordionItem  key={index} title={item.title} description={item.description}/>
        ))
      }
    </div>
    <div className={"accordion-flex"}>
      <div className="accordion-item">
        {
          dataOne.map((item,index) => (
            <AccordionItem  key={index} title={item.title} description={item.description}/>
          ))
        }
      </div>
      <div>
        {
          dataTwo.map((item,index) => (
            <AccordionItem  key={index} title={item.title} description={item.description}/>
          ))
        }
      </div>
    </div>
    </div>
  )
}

export default Accordion
