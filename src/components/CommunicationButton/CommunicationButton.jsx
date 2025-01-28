import  
  React,
  { useState,
    useEffect,
    useRef
  }                                from "react";
import InputMask                   from "react-input-mask";
import ReactModal                  from "react-modal";
import { Formik }                  from "formik";

import "./styles.css"
import close                       from "../../images/close.svg";
import validationSchemaServiceForm from "./schema";
import emailJsFunc                 from "../../hooks/emailJs";

const CommunicationButton = () => {
  const [isOpen, setIsOpen]       = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form                      = useRef();
  const initialValues             = { name: "", phone: "" };

  const onFormSubmit = (values, { resetForm }) => {
    setIsLoading(true);
    emailJsFunc('service_wmszkiu', 'template_7nfk54h', form.current, 'Dtntig-pRWw1ON0vO', '/request-confirmed')
      .then(() => {
        setIsLoading(false);
        resetForm();
        onRequestClose();
      })
      .catch(() => {
        setIsLoading(false);
      });
  }
  const onModalOpen = () => {
    document.body.style.overflow = "hidden";
    setIsOpen(true);
  }
  const onRequestClose = () => {
    document.body.style.removeProperty("overflow")
    setIsOpen(false)
  }

  useEffect(() => {
    return () => {
      document.body.style.removeProperty("overflow")
    }
  }, [])

  return (
    <>
      <div className="multibutton">
        <div className="multibutton__button" onClick={() => onModalOpen()}>
          <div>Запитати</div>
        </div>
      </div>
      <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        preventScroll
        style={{
          overlay: { zIndex: 100, background: "rgb(57,57,57,0.75)" },
          content: { inset: 1,border: "none", borderRadius: "none", background:"#A0E312", height:"300px"},
        }}
      >
        <div className="popup__content" >
          <span className="popup__close-btn" onClick={onRequestClose}>
            <img src={close} alt="button-close"/>
          </span>
          <h2 className="popup__title title">Запитати</h2>
          <h2 className="popup__subtitle">Залиште свій номер телефону і
            ми надамо відповіді на всі ваші запитання</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchemaServiceForm}
            onSubmit={onFormSubmit}
          >
            {(props,values) => {
              return (
                <form className={"modal_input"} onSubmit={props.handleSubmit} ref={form}>
                  <input
                    placeholder={"Iм'я"}
                    className={"modal_input_name"}
                    name="name"
                    value={props.values.name}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                  />
                  <InputMask
                     mask="+38(999)-999-99-99"
                     maskChar={null}
                     className={"modal_input_phone"}
                     placeholder={"+38(___)-___-__-__"}
                     name={"phone"}
                     onChange={props.handleChange}
                     onBlur={props.handleBlur}
                     value={props.values.phone}
                     style={{fontSize:"14px"}}
                  />
                  <input value={isLoading ? "Надсилаємо..." : "Надіслати повідомлення"} disabled={isLoading} className={` ${!props.errors.phone && !props.errors.name ? "modal_input_button" : " modal_input_button opacity-button"}`} type={"submit"}/>
                </form>
              )
            }}

          </Formik>
        </div>
      </ReactModal>
    </>
  )
}

export default CommunicationButton
