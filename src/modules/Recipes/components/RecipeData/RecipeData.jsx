import React, { useEffect, useState } from "react";
import FillRecipes from "../../../Shared/components/FillRecipes/FillRecipes";
import { CategoriesAPI, RecipesAPI, TagsAPI } from "../../../../api";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function RecipeData() {
  const [categoriesList, setCategoriesList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const { mode, id } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const selectedImage = watch("recipeImage");

  // Get Recipe Details in Edit Mode
  const getRecipeDetails = async () => {
    setLoading(true);

    try {
      let response = await RecipesAPI.GetRecipeById(id);

      const recipe = response.data;

      setValue("name", recipe.name);
      setValue("price", recipe.price);
      setValue("description", recipe.description);
      setValue("tagId", recipe.tag.id);
      setValue("categoriesIds", recipe.category[0].id);
      if (recipe.imagePath) {
        setImagePreview(
          `https://upskilling-egypt.com:3006/${recipe.imagePath}`,
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const isViewMode = mode === "view";
  const getCategoriesList = async () => {
    try {
      let response = await CategoriesAPI.GetCategories();
      setCategoriesList(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };
  const getTagsList = async () => {
    try {
      let response = await TagsAPI.GetTags();
      setTagsList(response.data);
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const saveImage = async (path) => {
    if (!path) return null;

    try {
      const response = await axios({
        url: path,
        method: "GET",
        responseType: "blob",
      });

      return new File([response.data], "old-image.webp", {
        type: response.data.type,
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const appendToFormData = async (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("tagId", data.tagId);
    formData.append("categoriesIds", data.categoriesIds);

    if (data.recipeImage && data.recipeImage[0]) {
      formData.append("recipeImage", data.recipeImage[0]);
    } else if (mode === "edit" && imagePreview) {
      const oldImageFile = await saveImage(imagePreview);

      if (oldImageFile) {
        formData.append("recipeImage", oldImageFile);
      }
    }

    return formData;
  };

  const onSubmit = async (data) => {
    setSubmitLoading(true);

    try {
      const formData = await appendToFormData(data);

      if (mode === "edit") {
        await RecipesAPI.UpdateRecipe(id, formData);
        toast.success("Recipe updated successfully");
      } else {
        await RecipesAPI.CreateRecipes(formData);
        toast.success("Recipe added successfully");
      }

      navigate("/dashboard/recipes");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    getCategoriesList();
    getTagsList();
    if (mode === "edit" || mode === "view") {
      getRecipeDetails();
    }
  }, []);
  useEffect(() => {
    if (selectedImage && selectedImage[0]) {
      const file = selectedImage[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [selectedImage]);
  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-success"></div>
      </div>
    );
  }
  return (
    <>
      {" "}
      <div>
        <FillRecipes
          recipeAction={
            mode === "edit" ? "Edit" : mode === "view" ? "View" : "Fill"
          }
        />
      </div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-75 m-auto my-3 p-3"
        >
          <div className=" input-group my-2">
            <input
              type="text"
              className=" form-control"
              placeholder="Name"
              disabled={isViewMode}
              {...register("name", { required: "Field is Required" })}
            />
          </div>
          {errors.name && (
            <span className=" text-danger">{errors.name.message}</span>
          )}
          <div className=" input-group my-2">
            <select
              className=" form-control"
              placeholder="Tags"
              disabled={isViewMode}
              {...register("tagId", { required: "Field is Required" })}
            >
              {tagsList.map((tag) => (
                <option value={tag.id} key={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
          {errors.tagId && (
            <span className=" text-danger">{errors.tagId.message}</span>
          )}
          <div className=" input-group my-2">
            <input
              type="number"
              className=" form-control"
              placeholder="Price"
              disabled={isViewMode}
              {...register("price", { required: "Field is Required" })}
            />
          </div>
          {errors.price && (
            <span className=" text-danger">{errors.price.message}</span>
          )}
          <div className=" input-group my-2">
            <select
              className=" form-control "
              placeholder="Categories"
              disabled={isViewMode}
              {...register("categoriesIds", { required: "Field is Required" })}
            >
              {categoriesList.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          {errors.categoriesIds && (
            <span className=" text-danger">{errors.categoriesIds.message}</span>
          )}
          <div className=" input-group my-2">
            <textarea
              type="text"
              className=" form-control"
              placeholder="Description"
              disabled={isViewMode}
              {...register("description", {
                required: "Field is Required",
              })}
            ></textarea>
          </div>
          {errors.description && (
            <span className=" text-danger">{errors.description.message}</span>
          )}

          <div className="my-3">
            <label
              htmlFor="recipeImage"
              className="w-100 border border-success rounded p-3 text-center"
              style={{
                borderStyle: "dashed",
                backgroundColor: "#f3faf4",
                cursor: isViewMode ? "default" : "pointer",
              }}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="recipe"
                  className="img-fluid rounded"
                  style={{
                    maxHeight: "220px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div className="d-flex flex-column align-items-center justify-content-center">
                  <i
                    className="fa-solid fa-arrow-up-from-bracket mb-2"
                    style={{ fontSize: "28px", color: "#666" }}
                  ></i>

                  <span className="text-dark">
                    Drag & Drop or{" "}
                    <span className="text-success fw-bold">
                      Choose a Item Image
                    </span>{" "}
                    to Upload
                  </span>
                </div>
              )}
            </label>

            {!isViewMode && (
              <input
                id="recipeImage"
                type="file"
                hidden
                {...register("recipeImage")}
              />
            )}
          </div>
          {watch("recipeImage")?.[0] && (
            <p className="mt-2 text-success">{watch("recipeImage")[0].name}</p>
          )}
          {errors.recipeImage && (
            <span className=" text-danger">{errors.recipeImage.message}</span>
          )}

          {mode !== "view" && (
            <div className="btns text-end">
              <button
                type="button"
                onClick={() => navigate("/dashboard/recipes")}
                className="btn btn-outline-success mx-2"
              >
                Cancel
              </button>
              <button className="btn btn-success" disabled={submitLoading}>
                {submitLoading
                  ? "Loading..."
                  : mode === "edit"
                    ? "Update"
                    : "Save"}
              </button>{" "}
            </div>
          )}
        </form>
      </div>
    </>
  );
}
