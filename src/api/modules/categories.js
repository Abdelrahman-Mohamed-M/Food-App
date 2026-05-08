import axiosClient from "../axiosClient";

export const GetCategories = (pageNumber = 1, pageSize = 5) => {
  return axiosClient.get("/Category", {
    params: {
      pageNumber,
      pageSize,
    },
  });
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
