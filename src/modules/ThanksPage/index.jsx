import React, {useEffect} from "react"
import {useLocation} from "@reach/router";
import { navigate } from "gatsby";

const ThanksPage = () => {
  const location = useLocation();
  
  useEffect(() => {
    if(location.state === null) {
      navigate(`/`);
    }
  }, [])

  return (
    <>
      <div className={""}>
        <div className={"modal-background"}></div>
        <div className={"modal-blur"}></div>
        <div className={"modal-page"}>
          <div className={"modal-page-content"}>
            <h2 className={"modal-page-title"}>Дякуємо</h2>
            <div className={"modal-page-subtitle"}>Ваш запит відправлено. Дуже скоро ми вам зателефонуємо.</div>
            <a href="/" className={"modal-page-button"}>Повернутися</a>
          </div>
        </div>
      </div>

    </>
  )
}

export default ThanksPage


