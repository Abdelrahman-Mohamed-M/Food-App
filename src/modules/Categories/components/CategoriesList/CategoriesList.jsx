import React, { useEffect, useState } from "react";
import groupImg from "../../../../assets/images/header-group.png";
import Header from "../../../Shared/components/Header/Header";
import { Table, Dropdown, Spinner } from "react-bootstrap";
import { CategoriesAPI } from "../../../../api";
import { toast } from "react-toastify";
import NoData from "../../../Shared/components/NoData/NoData";
import axiosClient from "../../../../api/axiosClient";
import DeleteConfirmation from "../../../Shared/components/DeleteConfirm/DeleteConfirm";
// import AddModal from "../../../Shared/components/AddModal/AddModal";
import { Modal, Button } from "react-bootstrap";

import { useForm } from "react-hook-form";

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
  // Add Modal
  const [addshow, setAddShow] = useState(false);
  const handleAddClose = () => setAddShow(false);
  const handleAddShow = () => setAddShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onAddSubmit = async (data) => {
    try {
      let response = await CategoriesAPI.CreateCategory(data);
      toast.success(`Category  Added successfully`, {
        theme: "dark",
        autoClose: 1000,
      });
      getCategoriesList();
      handleAddClose();
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
      handleAddClose();
    }
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
      let response = await axiosClient.delete(`/Category/${selectedItem.id}`);
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
      {/* Add Modal */}
      <Modal show={addshow} onHide={handleAddClose} centered>
        <Modal.Header closeButton className=" fw-bolder  ">
          Add New Category
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onAddSubmit)}>
            <div className=" input-group my-2">
              <input
                type="text"
                className=" form-control"
                placeholder="Category Name"
                {...register("name", { required: "Category Name is Required" })}
              />
            </div>
            {errors.name && (
              <span className=" text-danger">{errors.name.message}</span>
            )}
            <div className="text-end">
              <button className="btn btn-outline-success fw-bold m-2">
                Save
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
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
          <table className="table">
            <thead>
              <tr className=" text-center table-head">
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
                  <td>
                    {new Date(category?.creationDate).toLocaleDateString()}
                  </td>
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
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
}
