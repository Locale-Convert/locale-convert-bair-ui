import React from "react"
import "./styles.css"
import VideoControlWithoutPause from "./VideoControlWithoutPause"

const VideoContainer = ({videoURL, poster }) => {
  return (
    <>
      <VideoControlWithoutPause videoUrl={videoURL} poster={poster} />
    </>
  )
}

export default VideoContainer
