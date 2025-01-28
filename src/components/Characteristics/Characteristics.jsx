import React from "react"
import "../../styles/style.css"
import ReactMarkdown from "react-markdown"


function LinkRenderer(props) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

const Characteristics = ({desription=""}) => {
  return (
    <div className={"characteristics-block description-box-wrapper"}>
      <ReactMarkdown components={{ a: LinkRenderer }}>{desription}</ReactMarkdown>
    </div>
  )
}

export default Characteristics









