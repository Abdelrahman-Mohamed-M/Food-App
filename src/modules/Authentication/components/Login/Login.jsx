import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AUTH_URLS } from "../../../../Constants/END-Pointes";

export default function Login({ saveLoginData }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      let response = await axios.post(AUTH_URLS.login, data);
      toast.success("Login Successfully");
      navigate("/dashboard");
      localStorage.setItem("token", response.data.token);
      saveLoginData();
    } catch (error) {
      console.log(error);
      toast.error("Failed to login");
    }
  };

  return (
    <div>
      <div className="auth-title mb-4">
        <h3 className="h4">Log In</h3>
        <span className=" text-muted">
          Welcome Back! Please enter your details
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mt-3">
          <span className=" input-group-text">
            <i className="fa-solid fa-mobile-screen-button"></i>{" "}
          </span>
          <input
            type="email"
            className="form-control"
            placeholder="enter your email "
            aria-describedby="emailHelpBlock"
            {...register("email", {
              required: "Email is Required",
              pattern: {
                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
        </div>
        {errors.email && (
          <span className=" text-danger">{errors.email.message}</span>
        )}
        <div className="input-group mt-3">
          <span className=" input-group-text">
            <i className="fa fa-lock"></i>
          </span>

          <input
            type="password"
            placeholder="enter your password"
            id="inputPassword5"
            className="form-control"
            aria-describedby="passwordHelpBlock"
            {...register("password", {
              required: "Password is Required",
            })}
          />
        </div>
        {errors.password && (
          <span className=" text-danger">{errors.password.message}</span>
        )}
        <div className="links d-flex justify-content-between mt-1">
          <Link to="/register" className=" text-muted text-decoration-none">
            Register Now?
          </Link>
          <Link
            to="/forget-pass"
            className=" text-success text-decoration-none"
          >
            Forgot Password?
          </Link>
        </div>
        <button className="btn btn-success w-100 fw-bold my-4 py-1">
          Login
        </button>
      </form>
    </div>
  );
}
