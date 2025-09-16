import React, { useRef, useEffect, useState } from "react";
import "../../styles/style.css";
import ReactMarkdown from "react-markdown";
import "./style.css";

function LinkRenderer(props) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

const Characteristics = ({ description = "", onHeightChange }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new ResizeObserver(() => {
      const newHeight = contentRef.current.scrollHeight;
      setHeight(newHeight);
      onHeightChange?.(newHeight); // передаємо висоту у батьківський
    });

    observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, [description]);

  return (
    <div className="characteristics-block description-box-wrapper">
      <h3 className="specs-title">Опис</h3>
      <div className="characteristics-content" ref={contentRef}>
        <ReactMarkdown components={{ a: LinkRenderer }}>
          {description}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Characteristics;
