import * as yup from "yup";

export const LoginFormValidation = yup.object().shape({
  email: yup.string().email("Wrong Email").required("required"),
  password: yup.string().required("required"),
});

export const SignUpFormValidation = yup.object().shape({
  email: yup.string().email("Wrong Email").required("required"),
  password: yup.string().required("required"),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "passwored doesn't match")
    .required("required"),
});
