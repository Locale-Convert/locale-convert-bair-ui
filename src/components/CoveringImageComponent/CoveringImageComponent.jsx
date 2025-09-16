import React, { useEffect, useState } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import RichSlider from '../RichSlider/RichSlider';
import closeIcon from '../../images/close-grey.svg';

import "./style.css";

const CoveringImageComponent = ({ colorSlider, activeColor }) => {
  const [isMobileView, setIsMobileView] = useState(null);
  const [isFullModalOpen, setIsFullModalOpen] = useState(false);

  let activeItem = colorSlider[0];

  useEffect(() => {
    const determineScreenSize = () => {
      setIsMobileView(window.innerWidth < 600);
    };
    determineScreenSize();
    const handleWindowResize = () => {
      setIsMobileView(window.innerWidth < 600);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  if (!activeItem?.richDescription || activeItem.richDescription.length === 0) return null;

  return (
    <>
      <h2 className="covering-block-title">Презентація</h2>
      <div className="covering-block">
        <div className="covering-banner">
          {activeItem?.richDescription?.[0] && (
            <div className="covering-layer">
              <div
                className="covering-text-layer"
                style={{
                  backgroundImage: `url(${activeItem?.richDescriptionTextLayer?.[0]?.url})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              />
              <GatsbyImage
                image={getImage(activeItem?.richDescription?.[0]?.localFile?.childrenImageSharp[0]?.gatsbyImageData)}
                className="covering-image"
                alt=""
                objectFit="cover"
              />
            </div>
          )}
          <div className="covering-gradient-overlay">
            <button className="show-full-btn" onClick={() => setIsFullModalOpen(true)}>
              Показати повністю
            </button>
          </div>
        </div>
      </div>

      {isFullModalOpen && (
        <div className="full-covering-modal">
          <div className="full-modal-header">
            <button className="full-modal-close-btn" onClick={() => setIsFullModalOpen(false)}>
              <img src={closeIcon} alt="close" />
            </button>
          </div>
          <div className="full-modal-content">
            {activeItem?.richDescription?.map((item, index) => (
              <div key={index} className="full-modal-banner-layer">
                <div
                  className="full-modal-text-layer"
                  style={{
                    backgroundImage: `url(${activeItem?.richDescriptionTextLayer?.[index]?.url})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                  }}
                />
                <GatsbyImage
                  image={getImage(item?.localFile?.childrenImageSharp[0]?.gatsbyImageData)}
                  className="full-modal-covering-image"
                  alt=""
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default CoveringImageComponent;
