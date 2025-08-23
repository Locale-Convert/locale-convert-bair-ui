import React from "react";
import "./style.css";
import certificateIcon from '../../images/documentList.svg';
import { InfoOutlined } from "@mui/icons-material";


const DownloadLinks = ({ certificateLink, instructionLink }) => {
  return (
    <div className="download-links">
      <a
        href={certificateLink}
        target="_blank"
        rel="noreferrer"
        className="download-btn"
      >
        <img src={certificateIcon} alt="Сертифікат" className="download-icon" />
        <span>Сертифікат</span>
      </a>

      <a
        href={instructionLink}
        target="_blank"
        rel="noreferrer"
        className="download-btn"
      >
        <InfoOutlined className="download-icon" />
        <span>Інструкція</span>
      </a>
    </div>
  );
};

export default DownloadLinks;
