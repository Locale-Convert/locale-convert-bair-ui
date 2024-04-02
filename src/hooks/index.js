import { useRef, useState,useEffect } from "react"
import { getImage } from "gatsby-plugin-image";


export const useVideoControl = (startFromPause = true) => {
  const [isPaused, setIsPaused] = useState(startFromPause)
  const [progress, setProgress] = useState(0)
  const [isViewed, setIsViewed] = useState(!startFromPause)

  const videoRef = useRef(null)
  const toggleVideoPlay = () => {
    if (!isViewed) return setIsViewed(true)
    if (!videoRef.current) return

    isPaused ? videoRef.current.play() : videoRef.current.pause()
    setIsPaused(!isPaused)
  }

  useEffect(() => {
    if (!isViewed) return setIsPaused(startFromPause)
    if (!videoRef.current) return setIsPaused(true)
    videoRef.current.play()
    setIsPaused(false)
  }, [isViewed, startFromPause])

  useEffect(() => {
    const onProgress = () => {
      if (!videoRef.current) {
        return setProgress(0)
      }
      const {
        current: { duration, currentTime },
      } = videoRef
      const currentProgress = (currentTime / duration) * 100
      if (progress === currentProgress) return

      setProgress(currentProgress)
    }

    const interval = setInterval(onProgress, 100)

    return () => clearInterval(interval)
  }, [])

  return [videoRef, isPaused, toggleVideoPlay, progress, isViewed]
}

export const getImageHelper = (data) => {
  if (data?.localFile?.childImageSharp?.gatsbyImageData?.backgroundColor) {
    data.localFile.childImageSharp.gatsbyImageData.backgroundColor =
      "transparent";
  }


  return getImage(data?.localFile?.childImageSharp?.gatsbyImageData);
};
