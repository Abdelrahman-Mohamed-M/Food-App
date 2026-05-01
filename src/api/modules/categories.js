import axiosClient from "../axiosClient";

export const GetCategories = () => {
  return axiosClient.get("/Category");
};
export const CreateCategory = () => {
  return axiosClient.post("/Category");
};
export const GetCategoryById = () => {
  //   return axiosClient.get("/Category");
};
export const UpdateCategory = () => {
  //   return axiosClient.get("/Category");
};
export const DeleteCategory = (id) => {
  return axiosClient.delete(`/Category/${id} `);
};
