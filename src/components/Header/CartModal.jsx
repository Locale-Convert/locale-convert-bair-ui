import React, { useEffect } from 'react';
import { GatsbyImage } from "gatsby-plugin-image";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import { getImageHelper } from "../../hooks";
import close from "../../images/close.svg";
import { useCartStore } from "../../store/store";
import { useTranslation } from 'react-i18next';
import '../../../i18n';

const CartModal = ({ showCartModal, setShowCartModal, closeCartModal, isBasketView, setIsBasketView }) => {
    const {  t } = useTranslation();

    const { cartItems, setCartItems } = useCartStore();
    const displayedItems = cartItems?.slice(0, 2);

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

    const handleCountChange = (index, change) => {
        const updatedCartItems = [...cartItems];
        const updatedItem = { ...updatedCartItems[index] };


        updatedItem.count += change;

        if (updatedItem.count < 1) {
            updatedItem.count = 1;
        }

        updatedCartItems[index] = updatedItem;

        setCartItems(updatedCartItems);

        localStorage.setItem('selectedProducts', JSON.stringify(updatedCartItems));

        let newTotalAmount = 0;
        updatedCartItems.forEach((item) => {
            newTotalAmount += Number(item.price) * (item.count || 1);
        });

        localStorage.setItem('totalAmount', newTotalAmount);
    };

    const closeBasket = () => {
        setIsBasketView(false);
    }

    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.key === 'Escape') {
                closeBasket();
                closeCartModal();
            }
        };

        const handleClickOutside = (e) => {
            if (showCartModal && !e.target.closest('.modal')) {
                closeBasket();
                closeCartModal();
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showCartModal, closeBasket, closeCartModal]);

    return (
        <>
            <div className={((showCartModal || isBasketView) && cartItems?.length > 0) ? "modal-overlay open" : "modal-overlay"}>
                <div className={((showCartModal || isBasketView) && cartItems?.length > 0) ? 'modal open' : 'modal'}>
                    <div className="modal-header">
                        <div className='cart-modal-title'>{t('product.addCountPosition')} {cartItems.length} {t(cartItems.length === 1 ? 'product.positionOne' : 'product.positionTwo')}</div>
                        <span className="cart-modal-close-btn" onClick={() => {
                            closeBasket();
                            closeCartModal();
                        }}>
                            <img src={close} alt="button-close" />
                        </span>
                    </div>
                    <div className="modal-content" style={{ overflowY: cartItems.length > 2 ? 'auto' : 'hidden'}}>
                        {cartItems.length !== 0 ? cartItems.map((item, index) => (
                            <div className='cart-modal-content' key={index}>
                                <div className="product-in-cart">
                                    <a href={`/${item.url}/#${item.article}`} className="product-image">
                                        <GatsbyImage
                                            image={getImageHelper(item.mainImage)}
                                            alt="This is a picture of my face."
                                            objectFit="contain"
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                    </a>
                                    <a href={`/${item.url}/#${item.article}`} className="product-titles">
                                        <div className={"article-desktop-basket"}>{t('product.article')}: {item.article}</div>
                                        <div className={"product-title-basket"}>{item.title}</div>
                                        <div className={"product-color-basket"}>{t('product.color')}: {item.color}</div>
                                        <div className={"product-price-basket"}>{item.price} грн</div>
                                    </a>
                                    <div className="product-count">
                                        <div className="product-delete" onClick={() => removeItem(index)}>
                                            <DeleteOutlineOutlinedIcon style={{ color: 'rgba(50, 50, 56, 0.50)' }} />
                                        </div>
                                        <div className="counter">
                                            <div className="minus" onClick={() => handleCountChange(index, -1)}>-</div>
                                            <div className="number">{item.count}</div>
                                            <div className="plus" onClick={() => handleCountChange(index, 1)}>+</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <div className='empty-basket'>
                                {t('product.emptyBasket')}
                            </div>
                        )}
                    </div>
                    <div className="modal-footer">
                        <div className="cart-btn">
                            <a href={displayedItems.length !== 0 ? "/order" : null} className="order-btn">
                                {t('product.placingAnOrderTwo')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartModal;
