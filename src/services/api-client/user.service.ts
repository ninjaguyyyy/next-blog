import axios from "axios";

import { IResponse } from "models/Response";

const APIs = {
  SIGNUP: "/api/auth/signup",
  INFO: "/api/user/info",
  FORGOT_PASSWORD: "/api/auth/forgot-password",
  RESET_PASSWORD: "/api/auth/reset-password",
  VERIFY_TOKEN: "/api/auth/verify",
};

export const signup = async (values) => {
  const { data }: { data: IResponse } = await axios.post(APIs.SIGNUP, values);
  return data;
};

export const fetchUserInfo = async () => {
  const { data }: { data: IResponse } = await axios.get(APIs.INFO);
  return data.data;
};

export const forgotPassword = async (values) => {
  const { data }: { data: IResponse } = await axios.post(
    APIs.FORGOT_PASSWORD,
    values
  );
  return data.data;
};

export const resetPassword = async (values) => {
  const { data }: { data: IResponse } = await axios.post(
    APIs.RESET_PASSWORD,
    values
  );
  return data.data;
};

export const verifyToken = async (token: string) => {
  const { data }: { data: IResponse } = await axios.get(`${APIs.VERIFY_TOKEN}/${token}`);
  return data.data;
};
