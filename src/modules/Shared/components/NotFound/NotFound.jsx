import React from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../../../../assets/images/Logo.png";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container d-flex flex-column min-vh-100 bg-cover">
      <div className="p-3">
        <img src={logoImg} alt="logo" className="w-25" />
      </div>

      <div className="flex-grow-1 d-flex align-items-center justify-content-start ps-5">
        <div className="text-start">
          <h2 className="fw-bold text-success">Oops.</h2>
          <h3 className="fw-semibold">Page not found</h3>
          <p className="text-muted">
            This Page doesn’t exist or was removed! <br />
            We suggest you go back to home.
          </p>
          <button
            className="btn btn-success px-4 py-2 fw-bold"
            onClick={() => navigate("/dashboard")}
          >
             Back To Home <i className="fa-regular fa-house" />
          </button>
        </div>
      </div>
    </div>
  );
}
