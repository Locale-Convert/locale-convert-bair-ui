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
import onFormSubmit, { onFormSubmitWithoutNavigate } from "../../hooks/emailJs";
import { addToLocalStorage } from "../../hooks/localstorage"
import RelatedMittensProduct from "../../components/IconColorSlider/RelatedMittensProduct";
import wayForPay from "../../components/WayForPayComponent/WayForPayComponent";
import CitySearchAutocomplete from "../../components/CitySearchAutocomplete/CitySearchAutocomplete";
import CommunicationButton from "../../components/CommunicationButton/CommunicationButton";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { formatData } from "./utils";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";

const OrderPage = ({data}) => {
    const {
        allStrapiProducts,
        allStrapiAccessories: {
          nodes
        }
    } = data;

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmit, setIsSubmitting] = useState(false);
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState("Нова Пошта");
    const [isBasketView, setIsBasketView]       = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod]   = useState("WayForPay");
    const [colorTitle, setColorTitle]           = useState("");
    const [error, setError] = useState(false);
    const { isCybex } = useCartStore(); 
    const form = useRef();
    const { cartItems, setCartItems } = useCartStore();

    let totalAmount = 0;

    useEffect(() => {
        const envelopeItems = cartItems.filter(item => 
            allStrapiProducts.nodes.some(product => product.id === item.id)
        );

        
        if (envelopeItems.length === 1) {
            setColorTitle(envelopeItems[0].color);
        } else if (envelopeItems.length > 1) {
            setColorTitle(envelopeItems[0].color);
        } else {
            setColorTitle("");
        }
    }, [cartItems, allStrapiProducts]);



    const hasGloves = cartItems.some(item => {
        const foundById = nodes.some(accessory => accessory.id === item.id);
        
        if (!foundById) {
            return (
                nodes[0].colorSlider.some(colorItem => colorItem.article === item.article) ||
                nodes[1]?.colorSlider.some(colorItem => colorItem.article === item.article)
            );
        }
        
        return true;
    });


    const getCartItemsFromLocalStorage = () => {
        if (typeof window !== 'undefined') {
            const items = localStorage.getItem('selectedProducts');
            return items ? JSON.parse(items) : [];
        }
    };

    useEffect(() => {
        setCartItems(getCartItemsFromLocalStorage());
        setIsLoading(false); 
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
            try {
                setIsSubmitting(true);
                onFormSubmit('service_mwsw4n4', 'template_493nfyk', form.current, 'Dtntig-pRWw1ON0vO'); //
            } catch (error) {
                console.error('Помилка під час створення замовлення:', error);
            } finally {
                setCartItems([]);
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
                onFormSubmitWithoutNavigate('service_mwsw4n4', 'template_493nfyk', form.current, 'Dtntig-pRWw1ON0vO'); // 
               
            } catch (error) {
                setError(true);
                console.error('Помилка під час створення замовлення:', error);
            } finally {
                setCartItems([]);
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

        updatedCartItems[index] = updatedItem;

        setCartItems(updatedCartItems);

        localStorage.setItem('selectedProducts', JSON.stringify(updatedCartItems));

        let newTotalAmount = 0;
        updatedCartItems.forEach((item) => {
            newTotalAmount += Number(item.price) * (item.count || 1);
        });

        localStorage.setItem('totalAmount', newTotalAmount);
    };

    const addToBasket = (data, loc) => {
        const updatedCartItems = addToLocalStorage(data, loc);
      
        setCartItems(updatedCartItems);
      };
    

    return (
        <>
            <div className={"wrapper-mobile"}>
                <Header isBasketView={isBasketView} setIsBasketView={setIsBasketView}/>
                <div className="basket-box">
                    <h1 className="main-title product-main-title">Оформлення замовлення</h1>
                    <div className="product-box">
                        <div className="product-box-item">
                            {isLoading ? (
                                <div className="empty-basket">Почекайте, будь ласка...</div>
                            ) : (
                                cartItems.length === 0 && (
                                    <div className="empty-basket">
                                        У вашому кошику немає товарів. Ходімо за покупками!
                                    </div>
                                )
                            )}
                            {cartItems?.length > 0 && cartItems.map((item, index) => (
                                <div key={index} className="product-item">
                                    <a href={`/${item.url}`} className="product-descriptions">
                                        <div className="product-image">
                                            <GatsbyImage
                                                image={getImageHelper(item.mainImage)}
                                                alt=""
                                                objectFit="contain"
                                                style={{ width: '100%', height: '100%' }}
                                            />
                                        </div>
                                        <div className="product-titles-order">
                                            <div className={"article-desktop"}>Aртикул: {item.article}</div>
                                            <div className={"product-title"}>{item.title}</div>
                                            <div className={"product-color"}>Колір: {item.color}</div>
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
                            ))}
                            {!hasGloves ? (
                                <div className="related-accessories-in-order">
                                    <RelatedMittensProduct
                                        colorTitle={colorTitle}
                                        title={"Додайте рукавиці для мами"}
                                        relatedAccessories={nodes}
                                        addToBasket={addToBasket}
                                        closeBlock={true}
                                    />
                                </div>
                            ) : null}
                            {cartItems && cartItems?.length !== 0 ? <ToggleSwitch/> : null}
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
                                {(props) => (
                                    <Form ref={form}>
                                        <div className="contacts-data">
                                            <div className="contacts-label">Ваші контактні дані</div>
                                            <div className="">
                                                <Field
                                                    type="text"
                                                    name="name"
                                                    className="contacts-input"
                                                    placeholder="Ім'я"
                                                    style={{ border: props.errors.name && props.touched.name ? '1px solid red' : 'none'}}
                                                />
                                            </div>
                                            <div className="">
                                                <Field type="text" name="surname" className="contacts-input" placeholder="Прізвище" style={{ border: props.errors.surname && props.touched.surname ? '1px solid red' : 'none'}}/>
                                            </div>
                                            <div className="">
                                                <Field type="email" name="email" className="contacts-input" placeholder="Email"/>
                                            </div>
                                            <div className="">
                                                <InputMask
                                                    mask="+38(999)-999-99-99"
                                                    maskChar={null}
                                                    className={"contacts-input"}
                                                    placeholder={"Контактний телефон"}
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
                                                <div className="contacts-label">Виберіть спосіб доставки</div>
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
                                                        <div className="radio-label">Нова Пошта</div>
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
                                                        <div className="radio-label">Кур'єром Нової Пошти</div>
                                                    </div>
                                                </div>
                                                <CitySearchAutocomplete setCity={props.setFieldValue} setDepartment={props.setFieldValue} selectedDeliveryMethod={selectedDeliveryMethod}/>
                                                {selectedDeliveryMethod === "courier" && (
                                                    <Field name="address" className="contacts-input contacts-input-address" placeholder="Адреса" />
                                                )}
                                                <Field name="products" style={ {display: 'none'} } value={formatData(filteredCartItems, isCybex)} onChange={props.handleChange}
                                                    onBlur={props.handleBlur}/>
                                            </div>
                                        </div>
                                        <div className="delivery-data">
                                            <div>
                                                <div className="contacts-label-pay">Спосіб оплати</div>
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
                                                        <div className="radio-label">Накладеним платежем (2% комісії) сплачується при отриманні</div>
                                                    </div>
                                                </div>
                                                <Field name="comment" className="contacts-input" placeholder="Коментар" />
                                            </div>
                                        </div>
                                        <div className="price-box-padd">
                                            <div className="price-item">
                                                <div className="price-item-titles">
                                                    <div className="price-title-box">
                                                        <div className="price-title">Ціна товару</div>
                                                        <div className="price-title">{totalAmount ? totalAmount : 0} грн</div>
                                                    </div>
                                                    <div className="price-title price-title-delivery">Доставка за тарифами Нової пошти</div>
                                                    <div className="price-title-box">
                                                        <div className="price-title-total">Разом</div>
                                                        <div className="price-title-total price-title-total-right">{totalAmount ? totalAmount : 0} грн</div>
                                                    </div>
                                                </div>
                                            </div>
                                                {
                                                selectedPaymentMethod === 'CashOnDelivery' ? (
                                                    <button type="submit" className="btn-submit" disabled={isSubmit || cartItems.length === 0}  onSubmit={() => {
                                                        props.setFieldValue('products', formatData(filteredCartItems, isCybex));
                                                    }}>
                                                        {isSubmit ? 'Відправка...' : 'Надіслати замовлення'}
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button type="submit" className="btn-submit" disabled={isSubmit || cartItems.length === 0}>
                                                            {isSubmit ? 'Почекайте...' : `Оплатити ${totalAmount ? totalAmount : 0} грн`}
                                                        </button>
                                                        {error ? (<div>При створенні рахунку виникла помилка</div>) : ''}
                                                    </>
                                                )
                                            }
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                            <div className="delivery-box-order">
                                <p>Про умови повернення, доставки та відшкодування дивіться <a href="/conditions" className="delivery-box-support">тут.</a></p>
                                <p>Потрібна допомога?<br />Телефонуйте до <a href="tel:+380961093040" className="delivery-box-support">служби підтримки клієнтів.</a></p>
                                <p>Ми обробляємо ваші особисті дані для керування вашим замовленням відповідно до Політики конфіденційності Bair.</p>
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
