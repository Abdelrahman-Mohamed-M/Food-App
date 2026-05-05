import React from "react";
import { useNavigate } from "react-router-dom";

function FillRecipes({ navTo }) {
  const navigate = useNavigate();
  return (
    <div className="m-3">
      <div
        className=" container-fluid   p-4  rounded rounded-4"
        style={{ background: "rgba(240, 255, 239, 1)" }}
      >
        <div className="row">
          <div className="col-md-8 d-flex align-items-center  ">
            <div className="content">
              <h2 className=" fw-bolder pe-1">
                Fill the
                <span className="text-success"> Recipes</span>
              </h2>
              <p className="fw-normal  pt-1">
                you can now fill the meals easily using the table and form ,
                click here and sill it with the table !
              </p>
            </div>
          </div>
          <div className="col-md-4  text-end m-auto">
            <button
              className="btn btn-success fw-bold"
              onClick={() => navigate(navTo)}
            >
              {" "}
              Fill Recipes <i className="fa-solid fa-arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FillRecipes;
