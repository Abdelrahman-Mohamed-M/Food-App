import axiosClient from "../axiosClient";

export const GetCategories = () => {
  return axiosClient.get("/Category");
};

export const CreateCategory = (data) => {
  return axiosClient.post("/Category", data);
};

export const GetCategoryById = (id) => {
  return axiosClient.get(`/Category/${id}`);
};

export const UpdateCategory = (id, data) => {
  return axiosClient.put(`/Category/${id}`, data);
};


export const DeleteCategory = (id) => {
  return axiosClient.delete(`/Category/${id}`);
};