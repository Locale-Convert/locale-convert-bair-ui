import emailjs from "@emailjs/browser";
import { navigate } from "gatsby";

// Функция для извлечения данных из localStorage
const getTrackingData = () => {
  const gclids = JSON.parse(localStorage.getItem('gclids')) || [];
  const referrers = JSON.parse(localStorage.getItem('referrerUrls')) || [];
  const utmParams = JSON.parse(localStorage.getItem('utmParams')) || [];

  return {
    gclids: gclids.join(','), // Преобразуем массив в строку для отправки
    referrers: referrers.join(','), 
    utmParams: JSON.stringify(utmParams) 
  };
};

export const onFormSubmit = (serviceID, templateID, form, publicKey, viewPage = '/thanks') => {
  const trackingData = getTrackingData();

  ['gclids', 'referrers', 'utmParams'].forEach(name => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = trackingData[name];
    form.appendChild(input);
  });

  emailjs.sendForm(serviceID, templateID, form, publicKey)
    .then((result) => {
      console.log("EmailJS result:", result.text);
      localStorage.removeItem('selectedProducts');
      localStorage.removeItem('totalAmount');

      // Редирект после успешной отправки
      if(viewPage === '/thanks') {
        navigate(`/thanks`);
      } else {
        navigate(`/request-confirmed`);
      }
    }, (error) => {
      console.log("EmailJS error:", error.text);
    });
};

export const onFormSubmitWithoutNavigate = (serviceID, templateID, form, publicKey) => {
  const trackingData = getTrackingData();

  ['gclids', 'referrers', 'utmParams'].forEach(name => {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = trackingData[name];
    form.appendChild(input);
  });

  emailjs.sendForm(serviceID, templateID, form, publicKey)
    .then((result) => {
      console.log("EmailJS result:", result.text);
      localStorage.removeItem('selectedProducts');
      localStorage.removeItem('totalAmount');
    }, (error) => {
      console.log("EmailJS error:", error.text);
    });
};

export default onFormSubmit;
