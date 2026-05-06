import React, { useEffect, useState } from "react";
import groupImg from "../../../../assets/images/header-group.png";
import Header from "../../../Shared/components/Header/Header";
import { Dropdown, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import NoData from "../../../Shared/components/NoData/NoData";
import DeleteConfirmation from "../../../Shared/components/DeleteConfirm/DeleteConfirm";
import { UsersAPI } from "../../../../api";

export default function UsersList() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [usersList, setUsersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Delete Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (user) => {
    setSelectedItem(user);
    setShow(true);
  };
  const getUsersList = async () => {
    setIsLoading(true);

    try {
      let response = await UsersAPI.GetUsers();
      setUsersList(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  const deleteUsers = async () => {
    try {
      await UsersAPI.DeleteUser(selectedItem.id);
      toast.success(`${selectedItem.userName} Deleted successfully`, {
        theme: "dark",
        autoClose: 1000,
      });
      handleClose();
      getUsersList();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        theme: "dark",
        autoClose: 1000,
      });
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);
  return (
    <div className="users-container ">
      <Header
        title={"Users"}
        subTitle={"List"}
        desc={
          "You can now add your users and manage all users from the application"
        }
        imgUrl={groupImg}
        imgWidth={"w-50"}
        secPading={"py-1"}
      />
      <DeleteConfirmation
        show={show}
        handleClose={handleClose}
        deleteAction={deleteUsers}
        itemName={selectedItem?.userName}
        itemType={"User"}
      />
      <div className="d-flex  mt-5 mx-4">
        <div className="content">
          <h4 className=" fw-bold">Users Table Details</h4>
          <p>You can check all details</p>
        </div>
      </div>
      <div className="mx-4">
        {isLoading ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="success" />
            <p className="mt-2">Loading Users...</p>
          </div>
        ) : usersList.length > 0 ? (
          <div className="table-container">
            <table className="table custom-table">
              <thead>
                <tr className="text-center table-head">
                  <th scope="col">Id</th>
                  <th scope="col">User Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Country</th>
                  <th scope="col">Modification Date</th>
                  <th scope="col">Phone Number</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {usersList.map((user) => (
                  <tr key={user.id} className="text-center">
                    <td scope="col">{user.id}</td>
                    <td scope="col">{user.userName}</td>
                    <td scope="col">{user.email}</td>
                    <td scope="col">{user.country}</td>
                    <td scope="col">
                      {new Date(user.modificationDate).toLocaleDateString()}
                    </td>
                    <td scope="col">{user.phoneNumber}</td>
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

                          <Dropdown.Item className="text-success py-2 d-flex align-items-center">
                            <i className="fa-regular fa-pen-to-square me-2 text-info" />
                            Edit
                          </Dropdown.Item>

                          <Dropdown.Item
                            className="text-danger py-2 d-flex align-items-center"
                            onClick={() => handleShow(user)}
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
