import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthAPI } from "../../../../api";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let response = await AuthAPI.Register(data);

      toast.success("Register Successfully");
      navigate("/verify-account");
    } catch (error) {
      console.log(error);
      toast.error("Failed to register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="auth-title mb-4 text-center">
        <h3 className="h4">Register</h3>
        <span className="text-muted">
          Welcome Back! Please enter your details
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-md-6">
            {/* Username */}
            <div
              className="input-group mt-3 border rounded-3"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <span className="input-group-text bg-transparent border-0 pe-3">
                <i className="fa fa-user text-secondary fs-6"></i>
              </span>
              <input
                type="text"
                style={{ fontSize: "0.8rem" }}
                placeholder="UserName"
                className="form-control bg-transparent border-0 ps-1"
                {...register("userName", { required: "Username is required" })}
              />
            </div>
            {errors.userName && (
              <span className="badge bg-danger mt-1">
                {errors.userName.message}
              </span>
            )}
          </div>

          <div className="col-md-6">
            {/* Email */}
            <div
              className="input-group mt-3 border rounded-3"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <span className="input-group-text bg-transparent border-0 pe-3">
                <i className="fa fa-envelope text-secondary fs-6"></i>
              </span>
              <input
                type="email"
                placeholder="Enter your email"
                style={{ fontSize: "0.8rem" }}
                className="form-control bg-transparent border-0 ps-1"
                {...register("email", { required: "Email is required" })}
              />
            </div>
            {errors.email && (
              <span className="badge bg-danger mt-1">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {/* Country */}
            <div
              className="input-group mt-3 border rounded-3"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <span className="input-group-text bg-transparent border-0 pe-3">
                <i className="fa fa-globe text-secondary fs-6"></i>
              </span>
              <input
                type="text"
                placeholder="Country"
                style={{ fontSize: "0.8rem" }}
                className="form-control bg-transparent border-0 ps-1"
                {...register("country", { required: "Country is required" })}
              />
            </div>
            {errors.country && (
              <span className="badge bg-danger mt-1">
                {errors.country.message}
              </span>
            )}
          </div>

          <div className="col-md-6">
            {/* Phone Number */}
            <div
              className="input-group mt-3 border rounded-3"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <span className="input-group-text bg-transparent border-0 pe-3">
                <i className="fa fa-phone text-secondary fs-6"></i>
              </span>
              <input
                type="number"
                placeholder="PhoneNumber"
                style={{ fontSize: "0.8rem" }}
                className="form-control bg-transparent border-0 ps-1"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                })}
              />
            </div>
            {errors.phoneNumber && (
              <span className="badge bg-danger mt-1">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
        </div>

        <div className="row">
          {/* Left Column */}
          <div className="col-md-6">
            {/* Password */}
            <div
              className="input-group mt-3 border rounded-3"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <span className="input-group-text bg-transparent border-0 pe-3">
                <i className="fa fa-lock text-secondary fs-6"></i>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                style={{ fontSize: "0.8rem" }}
                className="form-control bg-transparent border-0 ps-1"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <span
                className="input-group-text bg-transparent border-0"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                <i
                  className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} text-secondary fs-6 `}
                ></i>
              </span>
            </div>
            {errors.password && (
              <span className="badge bg-danger mt-1">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="col-md-6">
            {/* Confirm Password */}
            <div
              className="input-group mt-3 border rounded-3"
              style={{ backgroundColor: "#f8f9fa" }}
            >
              <span className="input-group-text bg-transparent border-0 pe-3">
                <i className="fa fa-lock text-secondary fs-6"></i>
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                style={{ fontSize: "0.8rem" }}
                className="form-control bg-transparent border-0 ps-1"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === watch("password") || "Passwords do not match",
                })}
              />
              <span
                className="input-group-text bg-transparent border-0"
                style={{ cursor: "pointer" }}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <i
                  className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"} text-secondary fs-6`}
                ></i>
              </span>
            </div>
            {errors.confirmPassword && (
              <span className="badge bg-danger mt-1">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>
        {/* Link to Login */}
        <div className="text-end">
          <Link to="/login" className="text-success text-decoration-none">
            Login Now?
          </Link>
        </div>

        {/* Register Button */}
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
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}
