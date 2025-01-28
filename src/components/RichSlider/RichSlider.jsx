import React from "react"
import { GatsbyImage } from 'gatsby-plugin-image';
import { getImage } from "gatsby-plugin-image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const RichSlider = ({ mobileRichDescription, mobileTextLayer }) => {
    return (
        <>
            {!!mobileRichDescription && (
                <div className={"wrapper-slider"}>
                    <Swiper
                        navigation={true}
                        initialSlide={0}
                        slidesPerView={1}
                        modules={[Pagination, Navigation]}
                        spaceBetween={3}
                        className="slider-instagram"
                    >
                        {mobileRichDescription.map((item, index) => (
                            <SwiperSlide style={{ maxHeight: '100%' }}>
                                <div key={index} className="covering-image-container">
                                    <div
                                        className="main-image"
                                        style={{
                                            backgroundImage: `url(${mobileTextLayer[index]?.url})`,
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
                            </SwiperSlide>
                        ))}

                    </Swiper>
                </div>
            )}

        </>
    )
}

export default RichSlider

