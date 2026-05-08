import axiosClient from "../axiosClient";

export const GetFavourites = () => {
  return axiosClient.get("/userRecipe");
};

export const AddToFavourites = (id) => {
  return axiosClient.post("/userRecipe", {
    recipeId: id,
  });
};
export const DeleteFavourite = (id) => {
  return axiosClient.delete(`/userRecipe/${id}`);
};
