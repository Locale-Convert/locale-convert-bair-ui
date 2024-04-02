import React, { useState } from "react"

import ReactMarkdown from "react-markdown"

import { graphql, useStaticQuery } from "gatsby";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import CommunicationButton from "../../components/CommunicationButton/CommunicationButton";


export const query = graphql`
    query ConditonsPage{
      strapiConditions {
        text
      }
    }
`

const ConditionsPage = () => {
    const {
      strapiConditions: {
        text
      }
    } = useStaticQuery(query)

    const [isBasketView, setIsBasketView] = useState(false);
  return (
    <div className="condition-wrapper">
      <Header isBasketView={isBasketView} setIsBasketView={setIsBasketView}/>
      <div className="condition-box">
        <div className="condition-content">
          <div className="condition-title">Умови</div>
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </div>
      <CommunicationButton />
      <Footer link={"#top"}/>
    </div>
  )
}

export default ConditionsPage


