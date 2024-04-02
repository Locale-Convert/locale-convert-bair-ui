import React from "react"
import "../../styles/style.css"
import card from "../../images/card.png";
import logo_delivery from "../../images/logo-delivery.png";


const Delivery = () => {
  return (
    <div className={"delivery-box wrapper"} id={"delivery"}>
        <h2 className={"delivery-title delivery"}>Оплата і доставка</h2>
        <img src={card} className={"delivery-card-image delivery"} alt={""}/>
        <div className={"delivery-subtitle delivery"}>Предоплата на карту монобанк/привата</div>
        <img src={logo_delivery} className={"delivery-logo-image delivery"} alt={""}/>
        <div className={"delivery-subtitle delivery"}>Накладним платежем Нової пошти</div>
        <div className={"delivery-grey delivery"}>
          +2,5% вартість послуги оплати
          на місці від Нової Пошти
        </div>
    </div>
  )
}

export default Delivery
