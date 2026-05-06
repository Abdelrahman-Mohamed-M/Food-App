import axiosClient from "../axiosClient";

export const GetUsers = (data) => {
  return axiosClient.get("/Users", { data });
};

export const GetUserById = (id) => {
  return axiosClient.get(`/Users/${id}`);
};

export const CreateUser = (data) => {
  return axiosClient.post("/Users", data);
};

export const UpdateUser = (id, data) => {
  return axiosClient.put(`/Users/${id}`, data);
};

export const DeleteUser = (id) => {
  return axiosClient.delete(`/Users/${id}`);
};
