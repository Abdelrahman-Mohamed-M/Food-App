import React from "react";
import { useNavigate } from "react-router-dom";

function FillRecipes({ recipeAction }) {
  const navigate = useNavigate();
  return (
    <div className="m-3 mt-4">
      <div
        className=" container-fluid px-5  py-4  rounded rounded-5"
        style={{ background: "rgba(240, 255, 239, 1)" }}
      >
        <div className="row">
          <div className="col-md-8 d-flex align-items-center  ">
            <div className="content">
              <h2 className=" fw-bolder pe-1">
                {recipeAction} the
                <span className="text-success"> Recipes</span>
              </h2>
              <p className="fw-normal  pt-1">
                you can now fill the meals easily using the table and form ,
                <br />
                click here and sill it with the table !
              </p>
            </div>
          </div>
          <div className="col-md-4  text-end m-auto">
            <button
              className="btn btn-success fw-bold"
              onClick={() => navigate("/dashboard/recipes")}
            >
              {" "}
              All Recipes <i className="fa-solid fa-arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FillRecipes;
