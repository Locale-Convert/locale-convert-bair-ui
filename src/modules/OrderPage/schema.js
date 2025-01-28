import * as Yup from "yup";
import 'yup-phone';

const validationSchemaOrderForm = Yup.object().shape({
  name: Yup.string().required("Ім'я є обов'язковим полем"),
  surname: Yup.string().required("Прізвище є обов'язковим полем"),
  phone: Yup.string()
    .required("Телефон є обов'язковим полем")
    .phone("UA", true, "Некоректний номер телефону") // Додано підтримку для українських номерів
    .matches(/^\+38\(\d{3}\)-\d{3}-\d{2}-\d{2}$/, "Невірний формат телефону") // Формат з додатковими перевірками
    .min(17, "Номер телефону має бути мінімум 17 символів"),
  city: Yup.string().required("Місто є обов'язковим полем"),
  department: Yup.string().when('deliveryMethod', {
    is: 'Нова Пошта',
    then: Yup.string().required("Відділення є обов'язковим полем")
  }),
  deliveryMethod: Yup.string().required("Спосіб доставки є обов'язковим полем"),
  address: Yup.string().when('deliveryMethod', {
    is: 'courier',
    then: Yup.string().required('Адреса є обов\'язковим полем, коли обрано кур\'єром Нової Пошти')
  }),
});

export default validationSchemaOrderForm;
