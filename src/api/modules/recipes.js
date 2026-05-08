import axiosClient from "../axiosClient";

export const GetRecipes = (
  pageNumber = 1,
  pageSize = 5,
  name = "",
  tagId = "",
  categoryId = "",
) => {
  return axiosClient.get("/Recipe", {
    params: {
      pageNumber,
      pageSize,
      name,
      tagId,
      categoryId,
    },
  });
};
export const CreateRecipes = (data) => {
  return axiosClient.post("/Recipe", data);
};

export const GetRecipeById = (id) => {
  return axiosClient.get(`/Recipe/${id}`);
};

export const UpdateRecipe = (id, data) => {
  return axiosClient.put(`/Recipe/${id}`, data);
};

export const DeleteRecipe = (id) => {
  return axiosClient.delete(`/Recipe/${id}`);
};
