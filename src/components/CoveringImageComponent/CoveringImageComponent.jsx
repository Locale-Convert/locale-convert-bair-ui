import React, { useState } from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import closeIcon from '../../images/close-grey.svg';

import "./style.css";

const CoveringImageComponent = ({ data, colorSlider, activeColor, productTitle, productArticle }) => {
  const [isFullModalOpen, setIsFullModalOpen] = useState(false);

  const activeItem = colorSlider[0];

  if (
    (!activeItem?.richDescription || activeItem.richDescription.length === 0) &&
    (!activeItem?.mobileRichDescription || activeItem.mobileRichDescription.length === 0)
  ) return null;

  const renderImageLayer = (item, index, isMobile = false) => {
    const colorName = activeItem?.color || '';
    const article = productArticle || '';

    const altText = `Bair ${data.title}, колір: ${colorName} (артикул: ${article}), фото ${index + 1}`;

    return (
      <div key={index} className={isMobile ? 'mobile-only full-modal-banner-layer' : 'desktop-only full-modal-banner-layer'}>
        <div
          className={isMobile ? 'mobile-modal-text-layer' : 'full-modal-text-layer'}
          style={{
            backgroundImage: `url(${
              isMobile
                ? activeItem?.mobileRichDescriptionTextLayer?.[index]?.url
                : activeItem?.richDescriptionTextLayer?.[index]?.url
            })`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        />
        <GatsbyImage
          image={getImage(
            isMobile
              ? item?.localFile?.childrenImageSharp[0]?.gatsbyImageData
              : item?.localFile?.childrenImageSharp[0]?.gatsbyImageData
          )}
          className={isMobile ? 'mobile-modal-covering-image' : 'full-modal-covering-image'}
          alt={altText}
          objectFit="cover"
        />
      </div>
    );
  };

  return (
    <>
      <h2 className="covering-block-title">Презентація</h2>
      <div className="covering-block">
        <div className="covering-banner">
          {activeItem?.richDescription?.[0] && (
            <div className="covering-layer desktop-only">
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
                alt={`Bair ${data.title}, колір: ${activeItem.color} (артикул: ${productArticle}), фото 1`}
                objectFit="cover"
              />
            </div>
          )}

          {activeItem?.mobileRichDescription?.[0] && (
            <div className="covering-layer mobile-only">
              <div
                className="covering-text-layer"
                style={{
                  backgroundImage: `url(${activeItem?.mobileRichDescriptionTextLayer?.[0]?.url})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              />
              <GatsbyImage
                image={getImage(activeItem?.mobileRichDescription?.[0]?.localFile?.childrenImageSharp[0]?.gatsbyImageData)}
                className="covering-image"
                alt={`Bair ${data.title}}, колір: ${activeItem.color} (артикул: ${productArticle}), фото 1`}
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
            {/* Desktop */}
            {activeItem?.richDescription?.map((item, index) => renderImageLayer(item, index, false))}
            {/* Mobile */}
            {activeItem?.mobileRichDescription?.map((item, index) => renderImageLayer(item, index, true))}
          </div>
        </div>
      )}
    </>
  );
};

export default CoveringImageComponent;
