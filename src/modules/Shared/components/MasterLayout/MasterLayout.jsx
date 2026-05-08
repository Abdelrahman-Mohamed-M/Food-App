import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";
import NavBar from "../NavBar/NavBar";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";

export default function MasterLayout() {
  const {  loginData } = useContext(AuthContext);

  return (
    <div className="d-flex vh-100 overflow-hidden">
      <div className="sidebar-container">
        {" "}
        <SideBar  />
      </div>

      <div className="w-100 d-flex flex-column overflow-y-auto">
        {" "}
        <NavBar loginData={loginData} />
        <Outlet />
      </div>
    </div>
  );
}
