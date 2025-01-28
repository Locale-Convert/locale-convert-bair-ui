import emailjs from "@emailjs/browser";
import { navigate } from "gatsby";

// Функция для извлечения данных из localStorage
const getTrackingData = () => {
  const gclids = JSON.parse(localStorage.getItem('gclids')) || [];
  const referrers = JSON.parse(localStorage.getItem('referrerUrls')) || [];
  const utmParams = JSON.parse(localStorage.getItem('utmParams')) || [];
  
  return {
    gclids: gclids.join(','), // Преобразуем массив в строку для отправки
    referrers: referrers.join(','), // Преобразуем массив рефереров
    utmParams: JSON.stringify(utmParams) // Преобразуем UTM-метки в строку JSON
  };
};

export const onFormSubmit = (serviceID, templateID, form, publicKey, viewPage = '/thanks') => {
  // Извлекаем данные о GCLID, реферерах и UTM-метках
  const trackingData = getTrackingData();
  
  // Добавляем эти данные в скрытые поля формы перед отправкой
  const gclidField = document.createElement("input");
  gclidField.setAttribute("type", "hidden");
  gclidField.setAttribute("name", "gclids");
  gclidField.setAttribute("value", trackingData.gclids);
  form.appendChild(gclidField);

  const referrerField = document.createElement("input");
  referrerField.setAttribute("type", "hidden");
  referrerField.setAttribute("name", "referrers");
  referrerField.setAttribute("value", trackingData.referrers);
  form.appendChild(referrerField);

  const utmField = document.createElement("input");
  utmField.setAttribute("type", "hidden");
  utmField.setAttribute("name", "utmParams");
  utmField.setAttribute("value", trackingData.utmParams);
  form.appendChild(utmField);
  
  // Отправляем форму
  if(viewPage === '/thanks') {
    navigate(`/thanks`);
  } else {
    navigate(`/request-confirmed`);
  }
  
  emailjs.sendForm(serviceID, templateID, form, publicKey)
    .then((result) => {
      console.log(result.text);
      localStorage.removeItem('selectedProducts');
      localStorage.removeItem('totalAmount');
    }, (error) => {
      console.log(error.text);
    });
}

export const onFormSubmitWithoutNavigate = (serviceID, templateID, form, publicKey) => {
  const trackingData = getTrackingData();
  
  const gclidField = document.createElement("input");
  gclidField.setAttribute("type", "hidden");
  gclidField.setAttribute("name", "gclids");
  gclidField.setAttribute("value", trackingData.gclids);
  form.appendChild(gclidField);

  const referrerField = document.createElement("input");
  referrerField.setAttribute("type", "hidden");
  referrerField.setAttribute("name", "referrers");
  referrerField.setAttribute("value", trackingData.referrers);
  form.appendChild(referrerField);

  const utmField = document.createElement("input");
  utmField.setAttribute("type", "hidden");
  utmField.setAttribute("name", "utmParams");
  utmField.setAttribute("value", trackingData.utmParams);
  form.appendChild(utmField);

  emailjs.sendForm(serviceID, templateID, form, publicKey)
    .then((result) => {
      console.log(result.text);
      localStorage.removeItem('selectedProducts');
      localStorage.removeItem('totalAmount');
    }, (error) => {
      console.log(error.text);
    });
}

export default onFormSubmit;
