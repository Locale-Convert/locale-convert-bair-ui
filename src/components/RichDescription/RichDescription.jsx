
import { useEffect } from 'react';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { useState } from 'react';

import { getImage } from "gatsby-plugin-image";
import RichSlider from '../RichSlider/RichSlider';

const RichDescription = ({ colorSlider, activeColor }) => {
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
        <RichSlider mobileRichDescription={activeItem.mobileRichDescription} />
      ) : (
        <div className='rich-description-box'>
          {(!!activeItem && !!activeItem.richDescription) && activeItem.richDescription?.map((item) => (
            <div className='rich-description-item'>
              <GatsbyImage
                image={getImage(item?.localFile?.childrenImageSharp[0].gatsbyImageData)}
                className={"image__promo_banner image__promo_banner-min-height"}
                alt=""
                objectFit="contain"
              />
            </div>
          )
          )}

        </div>
      )}

    </>
  );
};

export default RichDescription;
