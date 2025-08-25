import React, { useState, useEffect } from 'react';
import { GatsbyImage } from "gatsby-plugin-image";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { isAfter } from 'date-fns';
import { getImageHelper } from "../../hooks";
import close from "../../images/close-grey.svg";


import { useCartStore } from "../../store/store";

import './style.css';

const CartModal = ({ allStrapiProducts, allStrapiAccessories, showCartModal, closeCartModal, isBasketView, setIsBasketView }) => {
    const { cartItems, setCartItems } = useCartStore();
    const displayedItems = cartItems?.slice(0, 2);

    useEffect(() => {
        checkForUpdates();
    },[showCartModal])

    const removeItem = (index) => {
        const updatedCartItems = [...cartItems];
        const removedItem = updatedCartItems.splice(index, 1)[0];
        setCartItems(updatedCartItems);

        localStorage.setItem('selectedProducts', JSON.stringify(updatedCartItems));

        let newTotalAmount = 0;
        updatedCartItems.forEach((item) => {
            newTotalAmount += Number(item.price) * (item.count || 1);
        });

        localStorage.setItem('totalAmount', newTotalAmount);
    };

    const checkForUpdates = () => {
        const updatedCartItems = cartItems.map((item) => {
            const updatedProduct = allStrapiProducts?.nodes.find((product) => product.id === item.id) || 
                                   allStrapiAccessories?.nodes.find((accessory) => accessory.id === item.id);
        
            if (updatedProduct) {
                const currentUpdatedAt = new Date(updatedProduct.updatedAt);
                const cartUpdatedAt = new Date(item.updatedAt);

                const isProductUpdated = isAfter(currentUpdatedAt, cartUpdatedAt);
    
                const isPriceUpdated = updatedProduct.price !== item.price;
    
                if (isProductUpdated || isPriceUpdated) {
                    let updatedPrice = updatedProduct.price;
        
                    if (updatedProduct.colorSlider && updatedProduct.colorSlider.length > 0) {
                        const selectedColor = updatedProduct.colorSlider.find(color => color.article === item.article);
                        
                        if (selectedColor) {
                            updatedPrice = selectedColor.colorPrice || updatedProduct.price;
                        }
                    }
        
                    if (updatedProduct.colorSlider && updatedProduct.colorSlider.length === 0) {
                        updatedPrice = updatedProduct.price || updatedPrice;
                    }
        
                    return {
                        ...item,
                        price: updatedPrice,
                        oldPrice: updatedProduct.oldPrice,
                        updatedAt: updatedProduct.updatedAt,
                    };
                }
            }
        
            return item;
        });

        setCartItems(updatedCartItems);
        if(updatedCartItems.length !== 0) {
            localStorage.setItem('selectedProducts', JSON.stringify(updatedCartItems));
        }

        let newTotalAmount = 0;
        updatedCartItems.forEach((item) => {
            newTotalAmount += Number(item.price) * (item.count || 1);
        });
        
        localStorage.setItem('totalAmount', newTotalAmount);
    };
    
    const handleCountChange = (index, change) => {
        const updatedCartItems = [...cartItems];
        const updatedItem = { ...updatedCartItems[index] };

        updatedItem.count += change;
        if (updatedItem.count < 1) updatedItem.count = 1;

        updatedCartItems[index] = updatedItem;

        setCartItems(updatedCartItems);
        localStorage.setItem('selectedProducts', JSON.stringify(updatedCartItems));

        let newTotalAmount = 0;
        updatedCartItems.forEach((item) => {
            newTotalAmount += Number(item.price) * (item.count || 1);
        });

        localStorage.setItem('totalAmount', newTotalAmount);
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

    // Товари «З цим товаром купують» – можна тут просто як приклад
    const suggestedItems = cartItems.length > 0 ? [
        // { title: "Alaska Thermo", price: 2889, image: close },
        // { title: "Bair Northmuff", price: 999, image: close },
    ] : [];

    console.log('cartItems', cartItems);

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

                {suggestedItems.length > 0 && (
                    <div className="cart-suggestions">
                        <div className="suggestions-title">З цим товаром купляють</div>
                        <div className="suggestions-list">
                            {suggestedItems.map((item, i) => (
                                <div className="suggestion-item" key={i}>
                                    <div className="suggestion-image">
                                        <img src={item.image} alt={item.title} />
                                    </div>
                                    <div className="suggestion-info">
                                        <div className="suggestion-title">{item.title}</div>
                                        <div className="suggestion-price">{item.price} грн</div>
                                        <button className="suggestion-add-btn">ДОДАТИ</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default CartModal;
