import React, { useEffect, useState } from "react";
import groupImg from "../../../../assets/images/header-group.png";
import Header from "../../../Shared/components/Header/Header";
import { RecipesAPI } from "../../../../api";
import { toast } from "react-toastify";
import { DeleteRecipe } from "../../../../api/modules/recipes";
import DeleteConfirmation from "../../../Shared/components/DeleteConfirm/DeleteConfirm";
import NoData from "../../../Shared/components/NoData/NoData";
import { useNavigate } from "react-router-dom";
import { Dropdown, Spinner } from "react-bootstrap";
import noDataImg from "../../../../assets/images/not-found-recipe.jpg";
export default function RecipesList() {
  const navigate = useNavigate();
  const [recipesList, setRecipesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const getRecipesList = async () => {
    setIsLoading(true);

    try {
      let response = await RecipesAPI.GetRecipes();
      setRecipesList(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
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
      let response = await RecipesAPI.DeleteRecipe(selectedItem.id);

      toast.success(`${selectedItem.name} Deleted successfully`, {
        theme: "dark",
        autoClose: 1000,
      });
      handleClose();
      getRecipesList();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        theme: "dark",
        autoClose: 1000,
      });
    }
  };
  useEffect(() => {
    getRecipesList();
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

      <div className="d-flex justify-content-between  mt-5 mx-4">
        <div className="content">
          <h4 className=" fw-bold">Recipes Table Details</h4>
          <p>You can check all details</p>
        </div>
        <div>
          <button
            onClick={() => {
              navigate("/dashboard/recipe-data");
            }}
            className="btn btn-success px-3 fw-bold"
          >
            Add New Recipes
          </button>
        </div>
      </div>
      <div className="mx-4">
        {isLoading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="success" />
            <p className="mt-2">Loading Recipes...</p>
          </div>
        ) : recipesList.length > 0 ? (
          <table className=" table ">
            <thead>
              <tr className=" text-center table-head">
                <th scope="col">Id</th>
                <th scope="col">name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Tag</th>
                <th scope="col">Category</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipesList.map((recipe) => (
                <tr className=" text-center " key={recipe.id}>
                  <th scope="row">{recipe.id}</th>
                  <td>{recipe.name}</td>
                  <td>
                    {recipe.imagePath ? (
                      <img
                        src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`}
                        className="table-img"
                        alt="recipe-img"
                      />
                    ) : (
                      <img
                        src={noDataImg}
                        className="table-img"
                        alt="recipe-img"
                      />
                    )}
                  </td>
                  <td>{recipe.price}</td>
                  <td>{recipe.description}</td>
                  <td>{recipe.tag.name}</td>
                  <td>{recipe.category[0]?.name}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="link"
                        className=" p-0 border-0 no-caret shadow-none  text-dark"
                      >
                        <i className="fa-solid fa-ellipsis  " />
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="shadow border-0 py-2 custom-dropdown">
                        <Dropdown.Item
                          href="#/view"
                          className="text-success py-2 d-flex align-items-center"
                        >
                          <i className="fa-solid fa-eye me-2 text-success" />
                          View
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#/edit"
                          className="text-success py-2 d-flex align-items-center"
                        >
                          <i className="fa-regular fa-pen-to-square me-2 text-info " />{" "}
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          className="text-danger py-2 d-flex align-items-center"
                          onClick={() => handleShow(recipe)}
                        >
                          <i className="fa-regular fa-trash-can me-2 text-danger" />
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
}
