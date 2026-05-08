import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import logo from "../../../../assets/images/3.png";
import ChangePassword from "../../../Authentication/components/ChangePass/ChangePass";
import LogoutModal from "../LogOut/LogoutModal";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";
import { toast } from "react-toastify";

export default function SideBar() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showChangePassModal, setShowChangePassModal] = useState(false);
  const { loginData } = useContext(AuthContext);
  let navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };
  return (
    <div className="sidebar-container ">
      <Sidebar collapsed={isCollapsed}>
        <div onClick={() => toggleCollapse()} className="my-4 text-center">
          <img className=" img-fluid btn" src={logo} alt="logo" />
        </div>
        <Menu>
          <MenuItem
            icon={<i className="fa-regular fa-house" />}
            component={<Link to="/dashboard" />}
          >
            {" "}
            Home{" "}
          </MenuItem>

          {loginData?.userGroup != "SystemUser" ? (
            <MenuItem
              icon={<i className="fa-solid fa-users" />}
              component={<Link to="/dashboard/users" />}
            >
              {" "}
              Users{" "}
            </MenuItem>
          ) : (
            <></>
          )}
          <MenuItem
            icon={<i className="fa-solid fa-utensils" />}
            component={<Link to="/dashboard/recipes" />}
          >
            {" "}
            Recipes{" "}
          </MenuItem>
          {loginData?.userGroup != "SystemUser" ? (
            <MenuItem
              icon={<i className="fa-regular fa-calendar-days" />}
              component={<Link to="/dashboard/categories" />}
            >
              {" "}
              Categories{" "}
            </MenuItem>
          ) : (
            <></>
          )}
          {loginData?.userGroup === "SystemUser" ? (
            <MenuItem
              icon={<i className="fa-regular fa-heart" />}
              component={<Link to="/dashboard/favourits" />}
            >
              {" "}
              Favourites{" "}
            </MenuItem>
          ) : (
            <></>
          )}
          <MenuItem
            icon={<i className="fa-solid fa-key" />}
            onClick={() => setShowChangePassModal(true)}
          >
            {" "}
            Change Password{" "}
          </MenuItem>
          <MenuItem
            onClick={() => setShowLogoutModal(true)}
            icon={<i className="fa-solid fa-right-from-bracket" />}
          >
            Logout
          </MenuItem>
        </Menu>
        <LogoutModal
          show={showLogoutModal}
          handleClose={() => setShowLogoutModal(false)}
          confirmLogout={logout}
        />
        <ChangePassword
          show={showChangePassModal}
          handleClose={() => setShowChangePassModal(false)}
        />
      </Sidebar>
    </div>
  );
}
