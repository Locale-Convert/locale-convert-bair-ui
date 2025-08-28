import React, { useState, useEffect } from 'react';
import { GatsbyImage } from "gatsby-plugin-image";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { isAfter } from 'date-fns';
import { getImageHelper } from "../../hooks";
import close from "../../images/close-grey.svg";

import { useCartStore } from "../../store/store";

import './style.css';

const CartModal = ({ allStrapiProducts, allStrapiAccessories, showCartModal, closeCartModal, isBasketView, setIsBasketView }) => {
    const { cartItems, setCartItems } = useCartStore();
    const [isMobileView, setIsMobileView] = useState(null);

    useEffect(() => {
        const determineScreenSize = () => setIsMobileView(window.innerWidth < 600);
        determineScreenSize();
        const handleResize = () => setIsMobileView(window.innerWidth < 600);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => { checkForUpdates(); }, [showCartModal]);

    const removeItem = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
        localStorage.setItem('selectedProducts', JSON.stringify(updatedCartItems));
        const total = updatedCartItems.reduce((sum, i) => sum + Number(i.price) * (i.count || 1), 0);
        localStorage.setItem('totalAmount', total);
    };

    const checkForUpdates = () => {
        const updatedCartItems = cartItems.map((item) => {
            const updatedProduct = allStrapiProducts?.nodes.find(p => p.id === item.id) ||
                                   allStrapiAccessories?.nodes.find(a => a.id === item.id);
            if (!updatedProduct) return item;

            const isProductUpdated = isAfter(new Date(updatedProduct.updatedAt), new Date(item.updatedAt));
            const isPriceUpdated = updatedProduct.price !== item.price;

            if (isProductUpdated || isPriceUpdated) {
                let updatedPrice = updatedProduct.price;

                if (updatedProduct.colorSlider?.length) {
                    const selectedColor = updatedProduct.colorSlider.find(c => c.article === item.article);
                    if (selectedColor) updatedPrice = selectedColor.colorPrice || updatedProduct.price;
                }

                return {
                    ...item,
                    price: updatedPrice,
                    oldPrice: updatedProduct.oldPrice,
                    updatedAt: updatedProduct.updatedAt
                };
            }
            return item;
        });

        setCartItems(updatedCartItems);
        if(updatedCartItems.length !== 0) localStorage.setItem('selectedProducts', JSON.stringify(updatedCartItems));

        const total = updatedCartItems.reduce((sum, i) => sum + Number(i.price) * (i.count || 1), 0);
        localStorage.setItem('totalAmount', total);
    };

    const closeBasket = () => setIsBasketView(false);

    useEffect(() => {
        const handleKeyPress = (e) => { if (e.key === 'Escape') { closeBasket(); closeCartModal(); } };
        const handleClickOutside = (e) => { if (showCartModal && !e.target.closest('.modal')) { closeBasket(); closeCartModal(); } };
        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showCartModal, closeBasket, closeCartModal]);

    const totalAmount = cartItems.reduce((sum, item) => sum + Number(item.price) * (item.count || 1), 0);

    const suggestedItems = cartItems.length > 0 ? [
        { title: "Alaska Thermo", price: 2889, image: close },
        { title: "Bair Northmuff", price: 999, image: close },
        { title: "Alaska Thermo", price: 2889, image: close },
        { title: "Bair Northmuff", price: 999, image: close },
        { title: "Alaska Thermo", price: 2889, image: close },
        { title: "Bair Northmuff", price: 999, image: close },
    ] : [];

    const renderSuggestionsSlider = () => {
        if (!suggestedItems.length || isMobileView) return null;

        return (
            <div className={`cart-suggestions ${isMobileView ? 'mobile' : 'desktop'}`}>
                <div className="suggestions-title">З цим товаром купляють</div>
                <div className="suggestions-sliders">
                    <Swiper
                        direction="horizontal"
                        slidesPerView={1}
                        spaceBetween={10}
                        pagination={{ clickable: true }}
                        navigation
                        modules={[Pagination, Navigation]}
                        className="suggestions-swiper"
                    >
                        {suggestedItems.map((item, i) => (
                            <SwiperSlide key={`left-${i}`}>
                                <div className="suggestion-item">
                                    <div className="suggestion-image">
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div className="suggestion-info">
                                        <div className="suggestion-title">{item.title}</div>
                                        <div className="suggestion-price">{item.price} грн</div>
                                        <button className="suggestion-add-btn">ДОДАТИ</button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <Swiper
                        direction="horizontal"
                        slidesPerView={1}
                        spaceBetween={10}
                        pagination={{ clickable: true }}
                        navigation
                        modules={[Pagination, Navigation]}
                        className="suggestions-swiper"
                    >
                        {suggestedItems.map((item, i) => (
                            <SwiperSlide key={`right-${i}`}>
                                <div className="suggestion-item">
                                    <div className="suggestion-image">
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div className="suggestion-info">
                                        <div className="suggestion-title">{item.title}</div>
                                        <div className="suggestion-price">{item.price} грн</div>
                                        <button className="suggestion-add-btn">ДОДАТИ</button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        );
    };

    return (
        <div className={((showCartModal || isBasketView) && cartItems?.length > 0) ? "modal-overlay open" : "modal-overlay"}>
            <div className={((showCartModal || isBasketView) && cartItems?.length > 0) ? 'modal open' : 'modal'}>
                <div className="modal-header">
                    <div className='cart-modal-title'>Кошик</div>
                    <span className="cart-modal-close-btn" onClick={() => { closeBasket(); closeCartModal(); }}>
                        <img src={close} alt="button-close" />
                    </span>
                </div>

                <div className="modal-content">
                    {cartItems.length !== 0 ? cartItems.map((item, index) => (
                        <div className='cart-item' key={index}>
                            <div className="cart-item-image">
                                <GatsbyImage image={getImageHelper(item.mainImage)} alt="" objectFit="contain" />
                            </div>
                            <div className="cart-item-info">
                                <div className="article">Артикул: {item.article}</div>
                                <div className="title">{item.title}</div>
                                <div className="price">
                                    {item.price} грн
                                    {item.oldPrice && <span className="old-price">{item.oldPrice} грн</span>}
                                </div>
                                <div className="color">Колір: <span className="color-value">{item.color}</span></div>
                            </div>
                            <div className="cart-item-actions">
                                <div className="delete" onClick={() => removeItem(index)}><DeleteOutlineOutlinedIcon /></div>
                            </div>
                        </div>
                    )) : <div className='empty-basket'>Кошик пустий</div>}
                </div>

                {cartItems.length > 0 && (
                    <div className="cart-total-section">
                        <div className="total-label">Разом</div>
                        <div className="total-amount">{totalAmount} грн</div>
                        <a href="/order" className="checkout-btn">ОФОРМИТИ ЗАМОВЛЕННЯ</a>
                    </div>
                )}

                {renderSuggestionsSlider()}

            </div>
        </div>
    );
};

export default CartModal;
