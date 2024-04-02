import
React, {
    useState,
    useEffect,
    useRef
} from "react";
import { Formik, Form, Field } from "formik";
import { GatsbyImage } from "gatsby-plugin-image";
import InputMask from "react-input-mask";

import { getImageHelper } from "../../hooks";
import validationSchemaOrderForm from "./schema";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useCartStore } from "../../store/store";
import onFormSubmit, { emailJsFunc, onFormSubmitWithoutNavigate } from "../../hooks/emailJs";
import wayForPay from "../../components/WayForPayComponent/WayForPayComponent";
import CitySearchAutocomplete from "../../components/CitySearchAutocomplete/CitySearchAutocomplete";
import CommunicationButton from "../../components/CommunicationButton/CommunicationButton";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { formatData } from "./utils";
import { useTranslation } from 'react-i18next';
import '../../../i18n';

const OrderPage = () => {
    const { t } = useTranslation();
    const [isSubmit, setIsSubmitting] = useState(false);
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState("Нова Пошта");
    const [isBasketView, setIsBasketView]       = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod]   = useState("Wayforpay");
    const [error, setError] = useState(false);
    const form = useRef();

    let totalAmount = 0;

    const getCartItemsFromLocalStorage = () => {
        if (typeof window !== 'undefined') {
            const items = localStorage.getItem('selectedProducts');
            return items ? JSON.parse(items) : [];
        }
    };

    const { cartItems, setCartItems } = useCartStore();

    useEffect(() => {
        setCartItems(getCartItemsFromLocalStorage());
    }, [])

    if (typeof window !== 'undefined') {
        totalAmount = localStorage.getItem('totalAmount');
    }

    const filteredCartItems = cartItems.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        oldPrice: item.oldPrice,
        article: item.article,
        color: item.color,
        count: item.count
    }));

    const handlerOrderSubmit = async (values) => {
        
        if(selectedPaymentMethod === 'CashOnDelivery') {
            setIsSubmitting(true);
            try {
                onFormSubmit('service_mwsw4n4', 'template_493nfyk', form.current, 'Dtntig-pRWw1ON0vO');
            } catch (error) {
                console.error('Помилка під час створення замовлення:', error);
            }
        } else if(selectedPaymentMethod === 'Wayforpay') {
            setIsSubmitting(true);
            try {
                const merch = {
                    name: values.name,
                    surname: values.surname,
                    email: values.email,
                    phone: values.phone
                };
                wayForPay(filteredCartItems, merch);
                onFormSubmitWithoutNavigate('service_mwsw4n4', 'template_493nfyk', form.current, 'Dtntig-pRWw1ON0vO');
            } catch (error) {
                setError(true);
                console.error('Помилка під час створення замовлення:', error);
            }
        }
    }

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
    };


    return (
        <>
            <div className={"wrapper-mobile"}>
                <Header isBasketView={isBasketView} setIsBasketView={setIsBasketView}/>
                <div className="basket-box">
                    <h1 className="main-title product-main-title">{t('orderPage.placingAnOrder')}</h1>
                    <div className="product-box">
                        <div className="product-box-item">
                            {cartItems && cartItems?.length !== 0 ? cartItems.map((item, index) => (
                                <div key={index} className="product-item">
                                    <a href={`/${item.url}`} className="product-descriptions">
                                        <div className="product-image">
                                            <GatsbyImage
                                                image={getImageHelper(item.mainImage)}
                                                alt="This is a picture of my face."
                                                objectFit="contain"
                                                style={{ width: '100%', height: '100%' }}
                                            />
                                        </div>
                                        <div className="product-titles-order">
                                            <div className={"article-desktop"}>{t('product.article')}: {item.article}</div>
                                            <div className={"product-title"}>{item.title}</div>
                                            <div className={"product-color"}>{t('product.color')}: {item.color}</div>
                                            <div className="product-price">{item.price} грн</div>
                                        </div>
                                    </a>
                                        <div className="product-count-order">
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
                            )) : (
                                <div className="empty-basket">
                                    {t('orderPage.emptyBasket')}
                                </div>
                            )}

                        </div>
                        <div className="contacts-data-box">
                            <Formik
                                initialValues={{
                                    name: "",
                                    surname: "",
                                    email: "",
                                    phone: "",
                                    city: "",
                                    department: "",
                                    deliveryMethod: "Нова Пошта",
                                    address: "",
                                    comment: "",
                                    paymentMethod:'Wayforpay'
                                }}
                                validationSchema={validationSchemaOrderForm}
                                onSubmit={(values) => handlerOrderSubmit(values)}
                            >
                                {(props, isSubmitting, handleBlur) => (
                                    <Form ref={form}>
                                        <div className="contacts-data">
                                            <div className="contacts-label">{t('orderPage.contactInfoTitle')}</div>
                                            <div className="">
                                                <Field 
                                                    type="text" 
                                                    name="name" 
                                                    className="contacts-input" 
                                                    placeholder={t('orderPage.name')}
                                                    style={{ border: props.errors.name && props.touched.name ? '1px solid red' : 'none'}}
                                                />
                                            </div>
                                            <div className="">
                                                <Field type="text" name="surname" className="contacts-input" placeholder={t('orderPage.surname')} style={{ border: props.errors.surname && props.touched.surname ? '1px solid red' : 'none'}}/>
                                            </div>
                                            <div className="">
                                                <Field type="email" name="email" className="contacts-input" placeholder="Email"/>
                                            </div>
                                            <div className="">
                                                <InputMask
                                                    mask="+38(999)-999-99-99"
                                                    maskChar={null}
                                                    className={"contacts-input"}
                                                    placeholder={t('orderPage.contactNumber')}
                                                    name={"phone"}
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    value={props.values.phone}
                                                    style={{ border: props.errors.phone && props.touched.phone ? '1px solid red' : 'none'}}
                                                />
                                            </div>
                                        </div>
                                        <div className="delivery-data">
                                            <div >
                                                <div className="contacts-label">{t('orderPage.deliveryTitle')}</div>
                                                <div className="contacts-input-radio-block">
                                                    <div className="radio-block">
                                                        <Field
                                                            type="radio"
                                                            name="deliveryMethod"
                                                            value="Нова Пошта"
                                                            className="contacts-input-radio"
                                                            checked={selectedDeliveryMethod === "Нова Пошта"}
                                                            onChange={() => {
                                                                props.setFieldValue('deliveryMethod', "Нова Пошта");
                                                                setSelectedDeliveryMethod("Нова Пошта");
                                                            }}
                                                        />
                                                        <div className="radio-label">{t('orderPage.novaPost')}</div>
                                                    </div>
                                                    <div className="radio-block">
                                                        <Field
                                                            type="radio"
                                                            name="deliveryMethod"
                                                            value="Кур'єром Нової Пошти"
                                                            className="contacts-input-radio"
                                                            checked={selectedDeliveryMethod === "courier"}
                                                            onChange={() => {
                                                                props.setFieldValue('deliveryMethod', "courier");
                                                                setSelectedDeliveryMethod("courier");
                                                            }}
                                                        />
                                                        <div className="radio-label">{t('orderPage.courier')}</div>
                                                    </div>
                                                </div>
                                                <CitySearchAutocomplete setCity={props.setFieldValue} setDepartment={props.setFieldValue} selectedDeliveryMethod={selectedDeliveryMethod}/>
                                                {selectedDeliveryMethod === "courier" && (
                                                    <Field name="address" className="contacts-input contacts-input-address" placeholder={t('orderPage.address')} />
                                                )}
                                                <Field name="products" style={ {display: 'none'} } value={formatData(filteredCartItems)} onChange={props.handleChange}
                                                    onBlur={props.handleBlur}/>
                                            </div>
                                        </div>
                                        <div className="delivery-data">
                                            <div>
                                                <div className="contacts-label-pay">{t('orderPage.payTitle')}</div>
                                                <div className="contacts-input-radio-block">
                                                    <div className="radio-block">
                                                        <Field
                                                            type="radio"
                                                            name="paymentMethod"
                                                            value="Wayforpay"
                                                            className="contacts-input-radio"
                                                            checked={selectedPaymentMethod === "Wayforpay"}
                                                            onChange={() => {
                                                                props.setFieldValue('paymentMethod', "Wayforpay");
                                                                setSelectedPaymentMethod("Wayforpay")
                                                            }}
                                                        />
                                                        <div className="radio-label">Visa / Mastercard</div>
                                                    </div>
                                                    <div className="radio-block">
                                                        <Field type="radio"
                                                            name="paymentMethod"
                                                            value="Накладним платижем"
                                                            className="contacts-input-radio"
                                                            checked={selectedPaymentMethod === "CashOnDelivery"}
                                                            onChange={() => {
                                                                props.setFieldValue('paymentMethod', "CashOnDelivery");
                                                                setSelectedPaymentMethod("CashOnDelivery")
                                                            }}
                                                        />
                                                        <div className="radio-label">{t('orderPage.cashOnDelivery')}</div> 
                                                    </div>
                                                </div>
                                                <Field name="comment" className="contacts-input" placeholder={t('orderPage.comment')} />
                                            </div>
                                        </div>
                                        <div className="price-box-padd">
                                            <div className="price-item">
                                                <div className="price-item-titles">
                                                    <div className="price-title-box">
                                                        <div className="price-title">{t('orderPage.priceProduct')}</div>
                                                        <div className="price-title">{totalAmount ?? 0} грн</div>
                                                    </div>
                                                    <div className="price-title price-title-delivery">{t('orderPage.deliverySubTitleText')}</div>
                                                    <div className="price-title-box">
                                                        <div className="price-title-total">{t('orderPage.all')}</div>
                                                        <div className="price-title-total price-title-total-right">{totalAmount ?? 0} грн</div>
                                                    </div>
                                                </div>
                                            </div>
                                                {
                                                selectedPaymentMethod === 'CashOnDelivery' ? (
                                                    <button type="submit" className="btn-submit" disabled={isSubmitting || cartItems.length === 0}  onSubmit={() => {
                                                        props.setFieldValue('products', formatData(filteredCartItems));
                                                    }}>
                                                        {t(isSubmit ? 'orderPage.sending' : 'orderPage.send')}
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button type="submit" className="btn-submit" disabled={isSubmitting || cartItems.length === 0}>
                                                            {t(isSubmit ? 'orderPage.loading' : 'orderPage.pay')}
                                                            {/* {isSubmit ? 'Почекайте...' : `Оплатити ${totalAmount ? totalAmount : 0} грн`} */}
                                                        </button>
                                                        {error ? (<div>{t('orderPage.errorInvoice')}</div>) : ''} 
                                                    </>
                                                )
                                            }
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                            <div className="delivery-box-order">
                                <p>{t('orderPage.textOne')}</p>

                                <p>{t('orderPage.textTwo')}</p>

                                <p>{t('orderPage.textThree')}</p>
                                {/* <p>Тобі потрібна допомога?<br />Перейдіть до <a href="#" className="delivery-box-support">служби підтримки клієнтів.</a></p> */}

                                <p></p>

                                <p>{t('orderPage.textFour')}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <CommunicationButton />
                <Footer link={"#top"} />
            </div>
        </>
    )
}

export default OrderPage;