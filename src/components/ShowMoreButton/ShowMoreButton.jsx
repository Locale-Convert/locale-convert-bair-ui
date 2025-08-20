import React from "react";
import "./style.css";
import showMore from '../../images/showMore.svg';

const ShowMoreButton = ({ onClick, text = "Показати ще" }) => {
  return (
    <button className="show-more-button" onClick={onClick}>
      <img src={showMore} alt="" className="show-more-icon" />
      <span>{text}</span>
    </button>
  );
};

export default ShowMoreButton;
