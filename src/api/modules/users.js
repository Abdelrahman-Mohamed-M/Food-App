import axiosClient from "../axiosClient";

export const GetUsers = (pageNumber = 1, pageSize = 5) => {
  return axiosClient.get("/Users", { params: { pageNumber, pageSize } });
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
