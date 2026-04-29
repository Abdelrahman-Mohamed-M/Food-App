import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";
import NavBar from "../NavBar/NavBar";

export default function MasterLayout({ loginData, setLoginData }) {
  return (
    <div className=" d-flex">
      <div>
        <SideBar setLoginData={setLoginData} />
      </div>
      <div className="w-100">
        <NavBar loginData={loginData} />
        <Outlet />
      </div>
    </div>
  );
}
