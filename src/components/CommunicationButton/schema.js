import * as Yup from "yup";
import 'yup-phone';

const validationSchemaServiceForm = Yup.object().shape({
  name: Yup.string().required("Required"),
  phone: Yup
    .string()
    .required().phone().min(17)
});

export default validationSchemaServiceForm ;