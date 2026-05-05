import axiosClient from "../axiosClient";

export const GetCategories = () => {
  return axiosClient.get("/Category");
};
export const CreateCategory = (data) => {
  return axiosClient.post("/Category",data);
};
export const GetCategoryById = (id) => {
    return axiosClient.get(`/Category/${id}`);
};
export const UpdateCategory = (id) => {
    return axiosClient.put(`/Category/${id}`);
};
export const DeleteCategory = (id) => {
  return axiosClient.delete(`/Category/${id}`);
};
