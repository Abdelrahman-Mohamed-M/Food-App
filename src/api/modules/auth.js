import axiosClient from "../axiosClient";

export const Login = (data) => {
  return axiosClient.post("/Users/login", data);
};
export const Forgetpass = (data) => {
  return axiosClient.post("/Users/Reset/Request", data);
};
export const Resetpass = (data) => {
  return axiosClient.post("/Users/Reset", data);
};
export const Register = (data) => {
  return axiosClient.post("/Users/Register", data);
};
export const Changepass = (data) => {
  return axiosClient.put("/Users/ChangePassword", data);
};
export const VerifyAccount = (data) => {
  return axiosClient.put("/Users/verify", data);
};
