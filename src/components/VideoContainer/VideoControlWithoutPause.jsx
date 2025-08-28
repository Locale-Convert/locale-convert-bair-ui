import React, { useState, useEffect } from "react";
import "./styles.css";

const PlayIcon = () => (
    // <svg width="80" height="80" viewBox="0 0 24 24" fill="rgba(255, 255, 255, 0.8)">
    //     <path d="M8 5v14l11-7z" />
    // </svg>
    <svg width="67" height="67" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M33.3281 66.1025C51.5104 66.1025 66.25 51.3629 66.25 33.1807C66.25 14.9984 51.5104 0.258789 33.3281 0.258789C15.1459 0.258789 0.40625 14.9984 0.40625 33.1807C0.40625 51.3629 15.1459 66.1025 33.3281 66.1025ZM25.2656 46.6534L47.4375 33.8525L25.2656 21.0516L25.2656 46.6534Z" fill="white" />
    </svg>
);

const VideoControlWithoutPause = ({ videoUrl }) => {
    const [showVideo, setShowVideo] = useState(false);
    const [thumbnailUrl, setThumbnailUrl] = useState('');

    useEffect(() => {
        const fetchVimeoThumbnail = async () => {
            try {
                const response = await fetch(`https://vimeo.com/api/oembed.json?url=${videoUrl}`);
                const data = await response.json();

                if (data.thumbnail_url) {
                    // --- НАШ ТРЮК ---
                    // Так как Vimeo отдает маленькое превью, мы "очищаем" URL,
                    // чтобы загрузить оригинальное, полноразмерное изображение.
                    const highQualityUrl = data.thumbnail_url.replace(/_(\d+)x(\d+)/, '');
                    setThumbnailUrl(highQualityUrl);
                }
            } catch (error) {
                console.error("Ошибка при загрузке превью для Vimeo:", error);
            }
        };

        if (videoUrl) {
            fetchVimeoThumbnail();
        }
    }, [videoUrl]);

    const handlePlayClick = () => {
        setShowVideo(true);
    };

    if (showVideo) {
        return (
            <iframe
                src={`${videoUrl}?autoplay=1&chromecast=0`}
                id="myVideo"
                width="100%"
                height="667px"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture"
                className="main_banner_video-promo"
            ></iframe>
        );
    }

    return (
        <div
            className="video-facade"
            onClick={handlePlayClick}
            style={{
                '--background-image': `url(${thumbnailUrl})`
            }}
        >
            <div className="play-button">
                <PlayIcon />
            </div>
        </div>
    );
};

export default VideoControlWithoutPause;
