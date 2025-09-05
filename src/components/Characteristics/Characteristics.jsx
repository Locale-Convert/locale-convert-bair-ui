import React, { useState, useRef, useEffect } from "react";
import "../../styles/style.css";
import ReactMarkdown from "react-markdown";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

import "./style.css";

function LinkRenderer(props) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

const Characteristics = ({ description = "" }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(contentRef.current.scrollHeight > 500);
    }
  }, [description]);

  return (
    <div className="characteristics-block description-box-wrapper">
      <h3 className="specs-title">Опис</h3>
      <div
        className={`characteristics-content ${expanded ? "expanded" : ""}`}
        ref={contentRef}
        style={{ maxHeight: expanded ? contentRef.current?.scrollHeight : 455 }}
      >
        <ReactMarkdown components={{ a: LinkRenderer }}>
          {description}
        </ReactMarkdown>
      </div>
      {isOverflowing && (
        <button
          className="show-more-btn"
          onClick={() => setExpanded(!expanded)}
        >
          <span className="show-more-text">
            {expanded ? "Показати менше" : "Показати більше"}
          </span>
          <ArrowDownwardIcon
            className={`arrow-icon ${expanded ? "rotated" : ""}`}
          />
        </button>
      )}
    </div>
  );
};

export default Characteristics;
