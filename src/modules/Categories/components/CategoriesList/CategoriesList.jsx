import React, { useEffect, useState } from "react";
import groupImg from "../../../../assets/images/header-group.png";
import Header from "../../../Shared/components/Header/Header";
import { Table, Dropdown, Spinner } from "react-bootstrap";
import { CategoriesAPI } from "../../../../api";
import { toast } from "react-toastify";
import NoData from "../../../Shared/components/NoData/NoData";
import axiosClient from "../../../../api/axiosClient";
import DeleteConfirmation from "../../../Shared/components/DeleteConfirm/DeleteConfirm";
import { Modal, Button } from "react-bootstrap";

import CategoryData from "../CategoryData/CategoryData";

export default function CategoriesList() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [categoriesList, setCategoriesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Delete Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (category) => {
    setSelectedItem(category);
    setShow(true);
  };
  // Add & Edit Modal
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  const handleEditShow = (category) => {
    setSelectedItem(category);
    setShowModal(true);
  };

  const handleAddShow = () => {
    setSelectedItem(null);
    setShowModal(true);
  };
  const getCategoriesList = async () => {
    setIsLoading(true);

    try {
      let response = await CategoriesAPI.GetCategories();
      setCategoriesList(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const deleteCategories = async () => {
    try {
      await axiosClient.delete(`/Category/${selectedItem.id}`);
      toast.success(`${selectedItem.name} Deleted successfully`, {
        theme: "dark",
        autoClose: 1000,
      });
      handleClose();
      getCategoriesList();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        theme: "dark",
        autoClose: 1000,
      });
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
        secPading={"py-3"}
      />
      <DeleteConfirmation
        show={show}
        handleClose={handleClose}
        deleteAction={deleteCategories}
        itemName={selectedItem?.name}
        itemType={"Category"}
      />

      <CategoryData
        show={showModal}
        handleClose={handleModalClose}
        selectedCategory={selectedItem}
        getCategoriesList={getCategoriesList}
      />
      <div className="d-flex justify-content-between  mt-5 mx-4">
        <div className="content">
          <h4 className=" fw-bold">Categories Table Details</h4>
          <p>You can check all details</p>
        </div>
        <div>
          <button
            onClick={handleAddShow}
            className="btn btn-success px-3 fw-bold"
          >
            Add New Category
          </button>
        </div>
      </div>
      <div className="mx-4">
        {isLoading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="success" />
            <p className="mt-2">Loading Categories...</p>
          </div>
        ) : categoriesList.length > 0 ? (
          <div className="table-container">
            <table className="table custom-table">
              <thead>
                <tr className="text-center table-head">
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Creation Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>

              <tbody>
                {categoriesList.map((category) => (
                  <tr key={category.id} className="text-center">
                    <td scope="col">{category.id}</td>
                    <td scope="col">{category.name}</td>
                    <td scope="col">
                      {new Date(category.creationDate).toLocaleDateString()}
                    </td>

                    <td scope="col">
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="link"
                          className="p-0 border-0 no-caret shadow-none text-dark"
                        >
                          <i className="fa-solid fa-ellipsis" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="shadow border-0 py-2 custom-dropdown">
                          <Dropdown.Item className="text-success py-2 d-flex align-items-center">
                            <i className="fa-solid fa-eye me-2 text-success" />
                            View
                          </Dropdown.Item>

                          <Dropdown.Item
                            className="text-success py-2 d-flex align-items-center"
                            onClick={() => handleEditShow(category)}
                          >
                            <i className="fa-regular fa-pen-to-square me-2 text-info" />
                            Edit
                          </Dropdown.Item>

                          <Dropdown.Item
                            className="text-danger py-2 d-flex align-items-center"
                            onClick={() => handleShow(category)}
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
          </div>
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
}
