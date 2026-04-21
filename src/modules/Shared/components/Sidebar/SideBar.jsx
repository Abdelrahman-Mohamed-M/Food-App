import React from "react";
import { useNavigate } from "react-router-dom";

export default function SideBar({ setLoginData }) {
  let navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setLoginData(null);

    navigate("/login");
  };
  return (
    <div className=" bg-info">
      <h4>SideBar</h4>
      <button className="btn btn-primary" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}
