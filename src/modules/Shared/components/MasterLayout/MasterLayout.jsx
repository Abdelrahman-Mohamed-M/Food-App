import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Sidebar/SideBar";
import Header from "../Header/Header";
import NavBar from "../NavBar/NavBar";

export default function MasterLayout() {
  return (
    <div className=" d-flex">
      <SideBar />
      <div className="w-100">
        <NavBar />
        <Header />
        <Outlet />
      </div>
    </div>
  );
}
