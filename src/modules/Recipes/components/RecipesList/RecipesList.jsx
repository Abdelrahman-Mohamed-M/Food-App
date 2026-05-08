import React, { useContext, useEffect, useState } from "react";
import groupImg from "../../../../assets/images/header-group.png";
import Header from "../../../Shared/components/Header/Header";
import {
  RecipesAPI,
  TagsAPI,
  CategoriesAPI,
  FavouritesAPI,
} from "../../../../api";
import { toast } from "react-toastify";
import { DeleteRecipe } from "../../../../api/modules/recipes";
import DeleteConfirmation from "../../../Shared/components/DeleteConfirm/DeleteConfirm";
import NoData from "../../../Shared/components/NoData/NoData";
import { useNavigate } from "react-router-dom";
import { Dropdown, Spinner } from "react-bootstrap";
import noDataImg from "../../../../assets/images/not-found-recipe.jpg";
import CustomPagination from "../../../Shared/components/CustomPagination/CustomPagination";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";

export default function RecipesList() {
  const navigate = useNavigate();
  const [recipesList, setRecipesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const { loginData } = useContext(AuthContext);
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [tagId, setTagId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  // Favorites
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  const [favLoading, setFavLoading] = useState({});
  const addToFavorites = async (recipeId) => {
    try {
      setFavLoading((prev) => ({
        ...prev,
        [recipeId]: true,
      }));

      await FavouritesAPI.AddToFavourites(recipeId);
      console.log("Added to favorites:", recipeId);
      toast.success("Recipe added to favorites");

      setFavoriteRecipes((prev) => [...prev, recipeId]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setFavLoading((prev) => ({
        ...prev,
        [recipeId]: false,
      }));
    }
  }; // Dropdown data
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  const getRecipesList = async (page = 1) => {
    setIsLoading(true);
    try {
      let response = await RecipesAPI.GetRecipes(
        page,
        5,
        searchTerm,
        tagId,
        categoryId,
      );
      setRecipesList(response.data?.data || []);
      setTotalPages(response.data?.totalNumberOfPages || 1);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const getTags = async () => {
    try {
      let response = await TagsAPI.GetTags();
      setTags(response.data || []);
    } catch {
      toast.error("Failed to load tags");
    }
  };

  const getCategories = async () => {
    try {
      let response = await CategoriesAPI.GetCategories();
      setCategories(response.data?.data || []);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  // Delete Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (recipe) => {
    setSelectedItem(recipe);
    setShow(true);
  };
  const deleteRecipe = async () => {
    try {
      await RecipesAPI.DeleteRecipe(selectedItem.id);
      toast.success(`${selectedItem.name} Deleted successfully`, {
        theme: "dark",
        autoClose: 1000,
      });
      handleClose();
      getRecipesList(currentPage);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        theme: "dark",
        autoClose: 1000,
      });
    }
  };

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Reset page when filter changes
  const onFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  useEffect(() => {
    getRecipesList(currentPage);
  }, [currentPage, searchTerm, tagId, categoryId]);

  useEffect(() => {
    getTags();
    getCategories();
  }, []);

  return (
    <div className="recipes-container">
      <Header
        title={"Recipes "}
        subTitle={"Items"}
        desc={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={groupImg}
        imgWidth={"w-50"}
        secPading={"py-3"}
      />
      <DeleteConfirmation
        show={show}
        handleClose={handleClose}
        deleteAction={deleteRecipe}
        itemName={selectedItem?.name}
        itemType={"Recipe"}
      />

      <div className="d-flex justify-content-between mt-5 mx-4">
        <div className="content">
          <h4 className="fw-bold">Recipes Table Details</h4>
          <p>You can check all details</p>
        </div>
        {loginData?.userGroup !== "SystemUser" ? (
          <div>
            <button
              onClick={() => {
                navigate("/dashboard/recipes-data/add");
              }}
              className="btn btn-success px-3 fw-bold"
            >
              Add New Recipes
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>

      {/* Search + Filters */}
      <div className="row p-3  my-2 mx-0 rounded ">
        <div className="col-md-6 ">
          <div className="input-group">
            <span className="input-group-text bg-white border-end-0">
              <i className="fa fa-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search here ..."
              onChange={(e) => onFilterChange(setSearchTerm, e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-3">
          <select
            className="form-select text-muted "
            onChange={(e) => onFilterChange(setTagId, e.target.value)}
          >
            <option value="">Tag</option>
            {tags.map((tag) => (
              <option key={tag.id} value={tag.id}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select text-muted"
            onChange={(e) => onFilterChange(setCategoryId, e.target.value)}
          >
            <option value="">Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mx-4">
        {isLoading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="success" />
            <p className="mt-2">Loading Recipes...</p>
          </div>
        ) : recipesList.length > 0 ? (
          <div className="table-container">
            <table className="table custom-table">
              <thead>
                <tr className="text-center table-head">
                  <th>Id</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Tag</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recipesList.map((recipe) => (
                  <tr key={recipe.id} className="text-center">
                    <td>{recipe.id}</td>
                    <td>{recipe.name}</td>
                    <td>
                      <img
                        src={
                          recipe.imagePath
                            ? `https://upskilling-egypt.com:3006/${recipe.imagePath}`
                            : noDataImg
                        }
                        className="table-img rounded-3"
                        alt="recipe"
                      />
                    </td>
                    <td>{recipe.price}</td>
                    <td className="description-cell">{recipe.description}</td>
                    <td>{recipe.tag?.name}</td>
                    <td>{recipe.category?.[0]?.name || "-"}</td>
                    <td>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="link"
                          className="p-0 border-0 no-caret shadow-none text-dark"
                        >
                          <i className="fa-solid fa-ellipsis" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="shadow border-0 py-2 custom-dropdown">
                          <Dropdown.Item
                            className="text-success py-2 d-flex align-items-center"
                            onClick={() =>
                              navigate(
                                `/dashboard/recipes-data/view/${recipe.id}`,
                              )
                            }
                          >
                            <i className="fa-solid fa-eye me-2 text-success" />
                            View
                          </Dropdown.Item>
                          {loginData?.userGroup !== "SystemUser" ? (
                            <Dropdown.Item
                              className="text-info py-2 d-flex align-items-center"
                              onClick={() =>
                                navigate(
                                  `/dashboard/recipes-data/edit/${recipe.id}`,
                                )
                              }
                            >
                              <i className="fa-regular fa-pen-to-square me-2 text-info" />
                              Edit
                            </Dropdown.Item>
                          ) : (
                            <></>
                          )}
                          <Dropdown.Item
                            disabled={
                              favLoading[recipe.id] ||
                              favoriteRecipes.includes(recipe.id)
                            }
                            className="text-warning py-2 d-flex align-items-center"
                            onClick={() => addToFavorites(recipe.id)}
                          >
                            {favLoading[recipe.id] ? (
                              <>
                                <Spinner
                                  animation="border"
                                  size="sm"
                                  className="me-2"
                                />
                                Loading...
                              </>
                            ) : favoriteRecipes.includes(recipe.id) ? (
                              <>
                                <i className="fa-solid fa-heart me-2 text-danger" />
                                Added
                              </>
                            ) : (
                              <>
                                <i className="fa-regular fa-heart me-2 text-warning" />
                                Add to Favorites
                              </>
                            )}
                          </Dropdown.Item>

                          {loginData?.userGroup !== "SystemUser" ? (
                            <Dropdown.Item
                              className="text-danger py-2 d-flex align-items-center"
                              onClick={() => handleShow(recipe)}
                            >
                              <i className="fa-regular fa-trash-can me-2 text-danger" />
                              Delete
                            </Dropdown.Item>
                          ) : (
                            <></>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
}
