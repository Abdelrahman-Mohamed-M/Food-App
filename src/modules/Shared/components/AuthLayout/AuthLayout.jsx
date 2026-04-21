import React from "react";
import { Outlet } from "react-router-dom";
import logo from "../../../../assets/images/Logo.png";
export default function AuthLayout() {
  return (
    <div className="auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center ">
          <div className=" col-lg-4 col-md-6  rounded rounded-2 bg-white px-5 py-3 ">
            <div className="logo-container text-center">
              <img className="w-75 my-2" src={logo} alt="logo" />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
