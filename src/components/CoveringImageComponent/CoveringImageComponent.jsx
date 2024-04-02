import { useEffect } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { useState } from 'react';

import { getImage } from "gatsby-plugin-image";
import RichSlider from '../RichSlider/RichSlider';
import { useCartStore } from '../../store/store';

import "../../styles/style.css";
import { getLocalizedField } from '../../hooks/localized';

const CoveringImageComponent = ({ colorSlider, activeColor },) => {
  
  const [isMobileView, setIsMobileView] = useState(null);
  const { activeLanguage } = useCartStore();

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

  const layers = getLocalizedField('layer', activeLanguage, activeItem?.richDescriptionTextLayer_all);

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
                  backgroundImage: `url(${layers[index]?.localFile?.url})`, // TODO
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100%'
                }}
              >
              </div>
              <GatsbyImage
                image={getImage(item?.localFile?.childrenImageSharp[0]?.gatsbyImageData)}
                className="covering-image"
                alt="Covering Image"
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
