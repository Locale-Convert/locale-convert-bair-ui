import play from "../../images/play.svg";
import pause from "../../images/pause-button.svg";
import React from "react";
import "./styles.css";

const VideoControl = ({ isPaused, toggleVideoPlay}) => {
  return (
    <div className="video-box-play" onClick={toggleVideoPlay}>
      {isPaused ? (
        <img src={play} alt="play-button" className={"play-button"} />
      ) : (
        <div className={"pause-wrapper"}>
          <img className="image-pause" src={pause} alt="" />
        </div>
      )}
    </div>
  );
};

export default VideoControl;
