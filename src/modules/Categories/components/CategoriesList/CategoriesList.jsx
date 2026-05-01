import React, { useEffect, useState } from "react";
import groupImg from "../../../../assets/images/header-group.png";
import Header from "../../../Shared/components/Header/Header";
import { Table, Dropdown } from "react-bootstrap";
import { CategoriesAPI } from "../../../../api";
import { toast } from "react-toastify";
import NoData from "../../../Shared/components/NoData/NoData";
import axiosClient from "../../../../api/axiosClient";
export default function CategoriesList() {
  const [categoriesList, setCategoriesList] = useState([]);
  const getCategoriesList = async () => {
    try {
      let response = await CategoriesAPI.GetCategories();
      setCategoriesList(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };
  const deleteCategories = async (id) => {
    try {
      let response = await axiosClient.delete(`/Category/${id}`);
      console.log(response)
      // let response = await CategoriesAPI.DeleteCategory(id);
      // setCategoriesList(response.data.data);
      getCategoriesList();
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  return (
    <div className="categories-container ">
      <Header
        title={"Categories "}
        subTitle={"Items"}
        desc={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={groupImg}
      />
      <div className="d-flex justify-content-between  mt-5 mx-4">
        <div className="content">
          <h4 className=" fw-bold">Categories Table Details</h4>
          <p>You can check all details</p>
        </div>
        <div>
          <div className="btn btn-success px-3 fw-bold">Add New Category</div>
        </div>
      </div>
      <div className="mx-4">
        {categoriesList.length > 0 ? (
          <table className="table">
            <thead>
              <tr className=" text-center">
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Creation Date</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoriesList.map((category) => (
                <tr className=" text-center" key={category.id}>
                  <th scope="row">{category.id}</th>
                  <td>{category.name}</td>
                  <td>{category.creationDate}</td>
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
                          onClick={() => deleteCategories(category.id)}
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
