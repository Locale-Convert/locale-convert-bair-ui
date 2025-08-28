import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, useFormikContext } from "formik";
import InputMask from "react-input-mask";
import validationSchemaOrderForm from "./schema";
import Header from "../../components/Header/Header";
import { useCartStore } from "../../store/store";
import onFormSubmit, { onFormSubmitWithoutNavigate } from "../../hooks/emailJs";
import { addToLocalStorage } from "../../hooks/localstorage";
import wayForPay from "../../components/WayForPayComponent/WayForPayComponent";
import CitySearchAutocomplete from "../../components/CitySearchAutocomplete/CitySearchAutocomplete";
import { TextField } from "@mui/material";
import CheckboxCallConfirmation from "../../components/CheckboxCallInformation/CheckboxCallInformation";
import OrderSteps from "../../components/OrderSteps/OrderSteps";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import PaymentMethod from "../../components/PaymentMethod/PaymentMethod";
import "./style.css";

// 🔹 окремий компонент-спостерігач за Formik values
const FormikObserver = ({ onChange }) => {
  const { values } = useFormikContext();

  useEffect(() => {
    onChange(values);
  }, [values, onChange]);

  return null;
};

const OrderPage = ({ data }) => {
  const { allStrapiProducts, allStrapiAccessories: { nodes } } = data;

  const [isSubmit, setIsSubmitting] = useState(false);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState("Нова Пошта");
  const [isBasketView, setIsBasketView] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [error, setError] = useState(false);
  const [stepStates, setStepStates] = useState(["inactive", "inactive", "inactive", "inactive"]);
  const [formValues, setFormValues] = useState({});

  const { cartItems, setCartItems } = useCartStore();
  const form = useRef();

  let totalAmount = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * (item.count || 1),
    0
  );

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
    console.log("=== SUBMIT VALUES ===", values);   // 👉 перевірка
    console.log("Selected payment method:", selectedPaymentMethod);
    console.log("Cart items:", filteredCartItems);
    if (selectedPaymentMethod === "При одержанні") {
      try {
        setIsSubmitting(true);
        onFormSubmit("service_mwsw4n4", "template_493nfyk", form.current, "Dtntig-pRWw1ON0vO");
      } catch (error) {
        console.error("Помилка під час створення замовлення:", error);
      } finally {
        setCartItems([]);
      }
    } else if (selectedPaymentMethod === "Оплатити зараз") {
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

  useEffect(() => {
    if (!formValues) return;
    const newSteps = ["inactive", "inactive", "inactive", "inactive"];

    if (formValues.name && formValues.surname && formValues.email && formValues.phone) {
      newSteps[0] = "completed";
      newSteps[1] = "active";
    } else {
      newSteps[0] = "active";
    }

    if (formValues.deliveryMethod === "Нова Пошта" && formValues.city && formValues.department) {
      newSteps[1] = "completed";
      newSteps[2] = "active";
    } else if (formValues.deliveryMethod === "courier" && formValues.address) {
      newSteps[1] = "completed";
      newSteps[2] = "active";
    }

    if (formValues.paymentMethod) {
      newSteps[2] = "completed";
      newSteps[3] = "active";
    }

    setStepStates(newSteps);
  }, [formValues]);

  return (
    <div className="order-page">
      <Header isBasketView={isBasketView} setIsBasketView={setIsBasketView} />
      <div className="order-container">
        <div className="order-left">
          <h1 className="order-title">Оформлення замовлення</h1>

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
              paymentMethod: "",
              onlineMethod: "card",
            }}
            validationSchema={validationSchemaOrderForm}
            onSubmit={(values) => handlerOrderSubmit(values)}
          >
            {(props) => (
              <Form ref={form} id="order-form">
                <FormikObserver onChange={setFormValues} />

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

                <PaymentMethod
                  selectedPaymentMethod={selectedPaymentMethod}
                  setSelectedPaymentMethod={setSelectedPaymentMethod}
                  setFieldValue={props.setFieldValue}
                />

                <div className="order-block without-border">
                  <label htmlFor="comment" className="order-input-label">Коментар</label>
                  <Field
                    name="comment"
                    as={TextField}
                    multiline
                    minRows={2.5}
                    variant="outlined"
                    className="contacts-input-comment"
                  />
                  <CheckboxCallConfirmation />
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <OrderSummary 
            cartItems={cartItems} 
            totalAmount={totalAmount} 
            stepStates={stepStates}
            formValues={formValues}
        />
      </div>
    </div>
  );
};

export default OrderPage;
