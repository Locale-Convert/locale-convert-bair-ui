// RichDescription.jsx
import { useEffect, useState } from 'react';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import RichSlider from '../RichSlider/RichSlider';
import './style.css';

const RichDescription = ({ colorSlider, activeColor }) => {
  const [isMobileView, setIsMobileView] = useState(null);
  const [showFull, setShowFull] = useState(false);

  let activeItem = colorSlider.find(item => `${item?.article}` === activeColor);

  useEffect(() => {
    const determineScreenSize = () => {
      setIsMobileView(window.innerWidth < 600);
    };
    determineScreenSize();

    const handleWindowResize = () => {
      setIsMobileView(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  if (!activeItem) return null;

  return (
    <div className="rich-description-section">
      <h2 className="rich-description-title">Презентація</h2>

      {isMobileView ? (
        <RichSlider mobileRichDescription={activeItem.mobileRichDescription} />
      ) : (
        <div className={`rich-description-box ${showFull ? 'full' : ''}`}>
          {activeItem.richDescription?.map((item, idx) => (
            <div className='rich-description-item' key={idx}>
              <div className='image-wrapper'>
                <GatsbyImage
                  image={getImage(item?.localFile?.childrenImageSharp[0].gatsbyImageData)}
                  className="rich-image"
                  alt=""
                  objectFit="contain"
                />
                {!showFull && (
                  <div className='gradient-overlay'>
                    <button
                      className='show-full-btn'
                      onClick={() => setShowFull(true)}
                    >
                      Показати повністю
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RichDescription;
