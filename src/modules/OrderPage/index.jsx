import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";
import { GatsbyImage } from "gatsby-plugin-image";
import InputMask from "react-input-mask";
import { getImageHelper } from "../../hooks";
import validationSchemaOrderForm from "./schema";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useCartStore } from "../../store/store";
import onFormSubmit, { onFormSubmitWithoutNavigate } from "../../hooks/emailJs";
import { addToLocalStorage } from "../../hooks/localstorage";
import RelatedMittensProduct from "../../components/IconColorSlider/RelatedMittensProduct";
import wayForPay from "../../components/WayForPayComponent/WayForPayComponent";
import CitySearchAutocomplete from "../../components/CitySearchAutocomplete/CitySearchAutocomplete";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { formatData } from "./utils";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import "./style.css";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import PaymentMethod from "../../components/PaymentMethod/PaymentMethod";
import CheckboxCallConfirmation from "../../components/CheckboxCallInformation/CheckboxCallInformation";
import OrderSteps from "../../components/OrderSteps/OrderSteps";

const OrderPage = ({ data }) => {
    const { allStrapiProducts, allStrapiAccessories: { nodes } } = data;

    const [isLoading, setIsLoading] = useState(true);
    const [isSubmit, setIsSubmitting] = useState(false);
    const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState("Нова Пошта");
    const [isBasketView, setIsBasketView] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("WayForPay");
    const [colorTitle, setColorTitle] = useState("");
    const [error, setError] = useState(false);
    const { isCybex } = useCartStore();
    const form = useRef();
    const { cartItems, setCartItems } = useCartStore();

    let totalAmount = 0;

    useEffect(() => {
        const envelopeItems = cartItems.filter((item) =>
            allStrapiProducts.nodes.some((product) => product.id === item.id)
        );
        if (envelopeItems.length >= 1) {
            setColorTitle(envelopeItems[0].color);
        } else {
            setColorTitle("");
        }
    }, [cartItems, allStrapiProducts]);

    const hasGloves = cartItems.some((item) => {
        const foundById = nodes.some((accessory) => accessory.id === item.id);
        if (!foundById) {
            return (
                nodes[0].colorSlider.some((colorItem) => colorItem.article === item.article) ||
                nodes[1]?.colorSlider.some((colorItem) => colorItem.article === item.article)
            );
        }
        return true;
    });

    const getCartItemsFromLocalStorage = () => {
        if (typeof window !== "undefined") {
            const items = localStorage.getItem("selectedProducts");
            return items ? JSON.parse(items) : [];
        }
    };

    useEffect(() => {
        setCartItems(getCartItemsFromLocalStorage());
        setIsLoading(false);
    }, []);

    if (typeof window !== "undefined") {
        totalAmount = localStorage.getItem("totalAmount");
    }

    const filteredCartItems = cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        oldPrice: item.oldPrice,
        article: item.article,
        color: item.color,
        count: item.count,
    }));

    const handlerOrderSubmit = async (values) => {
        if (selectedPaymentMethod === "CashOnDelivery") {
            try {
                setIsSubmitting(true);
                onFormSubmit("service_mwsw4n4", "template_493nfyk", form.current, "Dtntig-pRWw1ON0vO");
            } catch (error) {
                console.error("Помилка під час створення замовлення:", error);
            } finally {
                setCartItems([]);
            }
        } else if (selectedPaymentMethod === "Wayforpay") {
            setIsSubmitting(true);
            try {
                const merch = {
                    name: values.name,
                    surname: values.surname,
                    email: values.email,
                    phone: values.phone,
                };
                wayForPay(filteredCartItems, merch);
                onFormSubmitWithoutNavigate("service_mwsw4n4", "template_493nfyk", form.current, "Dtntig-pRWw1ON0vO");
            } catch (error) {
                setError(true);
                console.error("Помилка під час створення замовлення:", error);
            } finally {
                setCartItems([]);
            }
        }
    };

    const removeItem = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
        localStorage.setItem("selectedProducts", JSON.stringify(updatedCartItems));

        let newTotalAmount = 0;
        updatedCartItems.forEach((item) => {
            newTotalAmount += Number(item.price) * (item.count || 1);
        });
        localStorage.setItem("totalAmount", newTotalAmount);
    };

    const handleCountChange = (index, change) => {
        const updatedCartItems = [...cartItems];
        const updatedItem = { ...updatedCartItems[index] };

        updatedItem.count += change;
        if (updatedItem.count < 1) updatedItem.count = 1;

        updatedCartItems[index] = updatedItem;
        setCartItems(updatedCartItems);

        localStorage.setItem("selectedProducts", JSON.stringify(updatedCartItems));

        let newTotalAmount = 0;
        updatedCartItems.forEach((item) => {
            newTotalAmount += Number(item.price) * (item.count || 1);
        });
        localStorage.setItem("totalAmount", newTotalAmount);
    };

    const addToBasket = (data, loc) => {
        const updatedCartItems = addToLocalStorage(data, loc);
        setCartItems(updatedCartItems);
    };

    return (
        <div className="order-page">
            <Header isBasketView={isBasketView} setIsBasketView={setIsBasketView} />
            <div className="order-container">
                <div className="order-left">
                    <h1 className="order-title">Оформлення замовлення</h1>
                    <div className="mobile-only">
                        <OrderSteps stepStates={["completed", "active", "inactive", "inactive"]} />
                    </div>
                    {/* <div className="order-products">
                        {!hasGloves && (
                            <div className="related-accessories-in-order">
                                <RelatedMittensProduct
                                    colorTitle={colorTitle}
                                    title={"Додайте рукавиці для мами"}
                                    relatedAccessories={nodes}
                                    addToBasket={addToBasket}
                                    closeBlock={true}
                                />
                            </div>
                        )}
                    </div> */}

                    {/* === FORM === */}
                    <div className="order-form">
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
                                paymentMethod: "Wayforpay",
                            }}
                            validationSchema={validationSchemaOrderForm}
                            onSubmit={(values) => handlerOrderSubmit(values)}
                        >
                            {(props) => (
                                <Form ref={form}>
                                    {/* Контакти */}
                                    <div className="order-block">
                                        <h2 className="order-block-title">Ваші контактні дані</h2>
                                        <div className="order-inputs">
                                            <div className="order-input-wrapper">
                                                <label htmlFor="name" className="order-input-label">Ім'я</label>
                                                <Field type="text" name="name" id="name" className="order-input" />
                                            </div>

                                            <div className="order-input-wrapper">
                                                <label htmlFor="surname" className="order-input-label">Прізвище</label>
                                                <Field type="text" name="surname" id="surname" className="order-input" />
                                            </div>

                                            <div className="order-input-wrapper">
                                                <label htmlFor="email" className="order-input-label">Email</label>
                                                <Field type="email" name="email" id="email" className="order-input" />
                                            </div>

                                            <div className="order-input-wrapper">
                                                <label htmlFor="phone" className="order-input-label">Контактний телефон</label>
                                                <InputMask
                                                    mask="+38(999)-999-99-99"
                                                    maskChar={null}
                                                    name="phone"
                                                    id="phone"
                                                    onChange={props.handleChange}
                                                    onBlur={props.handleBlur}
                                                    value={props.values.phone}
                                                    className="order-input"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Доставка */}
                                    <div className="order-block">
                                        <h2 className="order-block-title">Виберіть спосіб доставки</h2>

                                        <div className="order-radios-horizontal">
                                            <label>
                                                <Field
                                                    type="radio"
                                                    name="deliveryMethod"
                                                    value="Нова Пошта"
                                                    checked={selectedDeliveryMethod === "Нова Пошта"}
                                                    onChange={() => {
                                                        props.setFieldValue("deliveryMethod", "Нова Пошта");
                                                        setSelectedDeliveryMethod("Нова Пошта");
                                                    }}
                                                />
                                                Нова Пошта
                                            </label>
                                            <label>
                                                <Field
                                                    type="radio"
                                                    name="deliveryMethod"
                                                    value="courier"
                                                    checked={selectedDeliveryMethod === "courier"}
                                                    onChange={() => {
                                                        props.setFieldValue("deliveryMethod", "courier");
                                                        setSelectedDeliveryMethod("courier");
                                                    }}
                                                />
                                                Кур'єром Нової Пошти
                                            </label>
                                        </div>

                                        <div className="order-location-row">
                                            {selectedDeliveryMethod === "Нова Пошта" ? (
                                                <div className="order-input-wrapper">
                                                    <CitySearchAutocomplete
                                                        setCity={props.setFieldValue}
                                                        setDepartment={props.setFieldValue}
                                                        selectedDeliveryMethod={selectedDeliveryMethod}
                                                        className="city-autocomplete"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="order-input-wrapper">
                                                    <label className="order-input-label">Адреса</label>
                                                    <Field name="address" className="order-input" />
                                                </div>
                                            )}
                                        </div>
                                    </div>


                                    {/* Оплата */}

                                    <PaymentMethod
                                        selectedPaymentMethod={selectedPaymentMethod}
                                        setSelectedPaymentMethod={setSelectedPaymentMethod}
                                        setFieldValue={props.setFieldValue}
                                    />

                                    <div className="order-block without-border">
                                        <label htmlFor="comment" className="order-input-label">Коментар</label>
                                       <Field
                                            name="comment"
                                            className="order-input comment"
                                        />
                                        <CheckboxCallConfirmation/>
                                    </div>


                                    {/* Кнопка */}
                                    {/* <div className="order-submit">
                                        {selectedPaymentMethod === "CashOnDelivery" ? (
                                            <button type="submit" className="btn-submit" disabled={isSubmit || cartItems.length === 0}>
                                                {isSubmit ? "Відправка..." : "Надіслати замовлення"}
                                            </button>
                                        ) : (
                                            <>
                                                <button type="submit" className="btn-submit" disabled={isSubmit || cartItems.length === 0}>
                                                    {isSubmit ? "Почекайте..." : `Оплатити ${totalAmount ? totalAmount : 0} грн`}
                                                </button>
                                                {error && <div className="order-error">При створенні рахунку виникла помилка</div>}
                                            </>
                                        )}
                                    </div> */}
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>

                {/* === Правий блок === */}
                <OrderSummary cartItems={cartItems} totalAmount={totalAmount} />
            </div>
            {/* <Footer link={"#top"} /> */}
        </div>
    );
};

export default OrderPage;
