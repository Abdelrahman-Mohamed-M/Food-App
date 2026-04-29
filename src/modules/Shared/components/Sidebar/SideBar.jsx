import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import logo from "../../../../assets/images/3.png";
export default function SideBar({ setLoginData }) {
  let navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setLoginData(null);

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
          <MenuItem
            icon={<i className="fa-solid fa-users" />}
            component={<Link to="/dashboard/users" />}
          >
            {" "}
            Users{" "}
          </MenuItem>
          <MenuItem
            icon={<i className="fa-regular fa-rectangle-list" />}
            component={<Link to="/dashboard/recipes" />}
          >
            {" "}
            Recipes{" "}
          </MenuItem>
          <MenuItem
            icon={<i className="fa-regular fa-calendar-days" />}
            component={<Link to="/dashboard/categories" />}
          >
            {" "}
            Categories{" "}
          </MenuItem>
          <MenuItem
            icon={<i className="fa-regular fa-heart" />}
            component={<Link to="/dashboard/favourits" />}
          >
            {" "}
            Favourites{" "}
          </MenuItem>
          <MenuItem icon={<i className="fa-solid fa-key" />}>
            {" "}
            Change Password{" "}
          </MenuItem>
          <MenuItem
            onClick={() => logout()}
            icon={<i className="fa-solid fa-right-from-bracket" />}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
