import emailjs from "@emailjs/browser";
import { navigate } from "gatsby";

export const onFormSubmit = (serviceID, templateID, form, publicKey) => {
  navigate(`/thanks`);
  emailjs.sendForm(serviceID, templateID, form, publicKey)
    .then((result) => {
    }, (error) => {
      console.log(error.text);
    });
}

export const onFormSubmitWithoutNavigate = (serviceID, templateID, form, publicKey) => {
  emailjs.sendForm(serviceID, templateID, form, publicKey)
    .then((result) => {
    }, (error) => {
      console.log(error.text);
    });
}

export default onFormSubmit