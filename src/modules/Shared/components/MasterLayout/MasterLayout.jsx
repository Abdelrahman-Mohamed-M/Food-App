import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";

export default function MasterLayout({loginData ,setLoginData}) {
  return (
    <div className=" d-flex">
      <SideBar setLoginData={setLoginData} />
      <div className="w-100">
        <NavBar loginData={loginData} />
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
