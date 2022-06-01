import * as yup from "yup";

export const signupSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const signInSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const contactSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
  message: yup.string().required("Message is required"),
});

export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .required("Email is required"),
});

export const resetPasswordSchema = yup.object().shape({
  password: yup.string().required("Password is required"),
  confirmedPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const resetPasswordWithTokenSchema = yup.object().shape({
  token: yup.string().required(),
  password: yup.string().required("Password is required"),
  confirmedPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
