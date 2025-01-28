import { useEffect } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { useState } from 'react';

import { getImage } from "gatsby-plugin-image";
import RichSlider from '../RichSlider/RichSlider';

import "../../styles/style.css";

const CoveringImageComponent = ({ colorSlider, activeColor },) => {
  const [isMobileView, setIsMobileView] = useState(null);

  let activeItem = colorSlider.find(item => `${item?.article}` === activeColor);

  useEffect(() => {
    const determineScreenSize = () => {
      const initialView = window.innerWidth < 600;
      setIsMobileView(initialView);
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

  return (
    <>
      {isMobileView ? (
        <RichSlider mobileRichDescription={activeItem?.mobileRichDescription} mobileTextLayer={activeItem?.mobileRichDescriptionTextLayer} />
      ) : (
        <div className='rich-description-box'>
          {(!!activeItem && !!activeItem.richDescription) && activeItem.richDescription?.map((item, index) => (
            <div key={index} className="covering-image-container">
              <div
                className="main-image"
                style={{
                  backgroundImage: `url(${activeItem?.richDescriptionTextLayer[index]?.url})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100%'
                }}
              >
              </div>
              <GatsbyImage
                image={getImage(item?.localFile?.childrenImageSharp[0]?.gatsbyImageData)}
                className="covering-image"
                alt=""
                objectFit='cover'
              />
            </div>
          )
          )}
        </div>
      )}
    </>
  );
};

export default CoveringImageComponent;
