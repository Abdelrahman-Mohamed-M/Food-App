import React, { useContext } from "react";
import avatar from "../../../../assets/images/Ellipse 234.png";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";

export default function NavBar() {
  const { loginData } = useContext(AuthContext);
  return (
    <nav className="navbar bg-body-tertiary rounded rounded-4 m-3">
      <div className="container-fluid">
        <div className="d-flex align-items-center py-1 px-4 gap-3 ms-auto">
          <a href="#">
            {" "}
            <img src={avatar} alt="dsfds" />
          </a>
          <h4 className=" fw-bold">{loginData?.userName}</h4>
        </div>
      </div>
    </nav>
  );
}
