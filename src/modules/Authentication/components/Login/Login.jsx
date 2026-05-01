import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthAPI } from "../../../../api";

export default function Login({ saveLoginData }) {
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let response = await AuthAPI.Login(data);
      toast.success("Login Successfully");
      navigate("/dashboard");
      localStorage.setItem("token", response.data.token);
      saveLoginData();
    } catch (error) {
      toast.error(error.response.data.message || "Something went wrong");
    } finally {
      setLoading(false);
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
        <div
          className="input-group mt-3 border rounded-3 "
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <span className="input-group-text bg-transparent border-0 pe-3">
            <i className="fa-solid fa-mobile-screen-button text-secondary fs-6"></i>
          </span>
          <div
            className="vr my-1"
            style={{ width: "1px", backgroundColor: "#6c757d" }}
          ></div>
          <input
            type="email"
            className="form-control bg-transparent border-0  ps-3"
            placeholder="enter your email"
            aria-describedby="emailHelpBlock"
            // style={{ fontSize: "1rem" }}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
              minLength: {
                value: 6,
                message: "Email must be at least 6 characters",
              },
              maxLength: {
                value: 50,
                message: "Email must not exceed 50 characters",
              },
            })}
          />
        </div>
        {errors.email && (
          <span className=" badge bg-danger mt-1">{errors.email.message}</span>
        )}
        <div
          className="input-group mt-3 border rounded-3"
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <span className=" input-group-text bg-transparent border-0 pe-3">
            <i className="fa fa-lock text-secondary fs-6"></i>
          </span>
          <div
            className="vr my-1"
            style={{ width: "1px", backgroundColor: "#6c757d" }}
          ></div>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="enter your password"
            id="inputPassword5"
            className="form-control bg-transparent border-0  ps-3"
            aria-describedby="passwordHelpBlock"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message:
                  // "Password must include uppercase, lowercase, number, and special character",
                  "Password Not Valid",
              },
            })}
          />
          <span
            className="input-group-text bg-transparent border-0"
            style={{ cursor: "pointer" }}
            onClick={() => setShowPassword(!showPassword)}
          >
            <i
              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} text-secondary fs-5`}
            ></i>
          </span>
        </div>

        {errors.password && (
          <span className=" badge bg-danger  mt-1 ">
            {errors.password.message}
          </span>
        )}

        <div
          className="links d-flex justify-content-between mt-1"
          style={{ fontSize: "0.9rem" }}
        >
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
        <button
          className="btn btn-success w-100 fw-bold my-4 py-1 d-flex justify-content-center align-items-center"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
          ) : null}
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
