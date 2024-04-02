import React, { useState } from "react";

import "./styles.css";


const VideoControlWithoutPause = ({ videoUrl }) => {
  const [playVideo, setPlayVideo] = useState(false);


  const handlePlay = () => {
    setPlayVideo(true);
  };
    return (
      <>
        <iframe
          src={videoUrl}
          id="myVideo"
          width="100%"
          height="667px"
          controls={false}
          muted={false}
          loop={true}
          autopause="true"
          playsInline={false}
          autoPlay={playVideo ? 1 : 0}
          className="main_banner_video-promo"
          playing={"false"}
        ></iframe>
      </>
    )
  }


export default VideoControlWithoutPause