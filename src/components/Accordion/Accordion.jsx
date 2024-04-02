import React from "react"
import "./styles.css"
import { dataOne, dataTwo } from "./data"
import AccordionItem from "./AccordionItem";
import { useTranslation } from 'react-i18next';
import '../../../i18n';

const Accordion = () => {
  const { i18n, t } = useTranslation();
  return (
    <div className={"accordion-box accordion-wrapper"} id={"faq"}>
      <h2 className={"main-title accordion-main-title"}>{t('homepage.feedback.title')}</h2>
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
