import React from "react";
import groupImg from "../../../../assets/images/header-group.png";
import Header from "../../../Shared/components/Header/Header";
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { FavouritesAPI } from "../../../../api";
import NoData from "../../../Shared/components/NoData/NoData";
import noFav from "../../../../assets/images/not-found-recipe.jpg";

export default function FavList() {
  const [favRecipes, setFavRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  // Fetch favourite recipes
  const FavouriteRecipes = async () => {
    try {
      setLoading(true);

      const response = await FavouritesAPI.GetFavourites();

      setFavRecipes(response?.data?.data);
    } catch (error) {
      toast.error("Failed to load favourites");
    } finally {
      setLoading(false);
    }
  };
  // Delete a favourite recipe
  const [deleteLoading, setDeleteLoading] = useState(null);
  const deleteFav = async (id) => {
    try {
      setDeleteLoading(id);

      await FavouritesAPI.DeleteFavourite(id);

      setFavRecipes((prev) => prev.filter((fav) => fav.id !== id));

      toast.success("Removed from favourites");

      FavouriteRecipes();
    } catch (error) {
      toast.error("Failed to remove item");
    } finally {
      setDeleteLoading(null);
    }
  };
  useEffect(() => {
    FavouriteRecipes();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <div>
      <Header
        title={"Favourite "}
        subTitle={"Items"}
        desc={
          "You can now add your items that any user can order it from the Application and you can edit"
        }
        imgUrl={groupImg}
        secPading={"py-3"}
      />
      {favRecipes.length > 0 ? (
        <div className="container-fluid w-75 py-2">
          <div className="row justify-content-center ">
            {favRecipes.map((fav) => (
              <div key={fav?.id} className=" col-md-4 p-2">
                <div className="card border-0 shadow-lg rounded- overflow-hidden">
                  {/* Image */}
                  <div className="position-relative text-center bg-success">
                    {fav?.recipe?.imagePath ? (
                      <img
                        src={`https://upskilling-egypt.com:3006/${fav?.recipe?.imagePath}`}
                        alt={fav?.recipe?.name}
                        className="w-100"
                        style={{ height: "220px", objectFit: "cover" }}
                      />
                    ) : (
                      <img
                        className=" object-fit-fill w-100"
                        style={{ height: "220px", objectFit: "cover" }}
                        src={noFav}
                        alt={fav?.recipe?.name}
                      />
                    )}

                    <span className="badge bg-success position-absolute top-0 start-0 m-2 px-3 py-2">
                      {fav?.recipe?.tag?.name}
                    </span>
                    <div className="text-white mt-2 bg-success">
                      {/* Name */}
                      <h5 className="fw-bold mb-1">{fav?.recipe?.name}</h5>
                      {/* Email */}
                      <p className=" text-light small mb-3">
                        {fav?.recipe?.description}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="card-body">
                    {/* Info Grid */}
                    <div className="row g-2 text-center mb-3">
                      <div className="col-6">
                        <div className="bg-light rounded-3 p-2">
                          <small className="text-muted d-block">Price</small>
                          <span className="fw-semibold text-success">
                            {fav?.recipe?.price} EGP
                          </span>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="bg-light rounded-3 p-2">
                          <small className="text-muted d-block">Category</small>
                          <span className="fw-semibold">
                            {fav?.recipe?.category?.name}
                          </span>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="bg-light rounded-3 p-2">
                          <small className="text-muted d-block">ID</small>
                          <span>{fav?.recipe?.id}</span>
                        </div>
                      </div>

                      <div className="col-6">
                        <div className="bg-light rounded-3 p-2">
                          <small className="text-muted d-block">Date</small>
                          <span>
                            {new Date(
                              fav?.recipe?.creationDate,
                            ).toLocaleDateString("en-GB")}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteFav(fav?.id)}
                      disabled={deleteLoading === fav?.id}
                      className="btn btn-outline-danger w-100 rounded-3"
                    >
                      {deleteLoading === fav?.id ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                          ></span>
                          Removing...
                        </>
                      ) : (
                        <>
                          <i className="fa fa-heart-broken me-2"></i>
                          Remove from Favourites
                        </>
                      )}
                    </button>{" "}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
}
