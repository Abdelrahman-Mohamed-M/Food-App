import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthAPI } from "../../../../api";

export default function ResetPass() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);

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
      let response = await AuthAPI.Resetpass(data);
      toast.success("Password Reset Successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Something Wronge");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="auth-title mb-4">
        <h3 className="h4">Reset Password</h3>
        <span className=" text-muted">
          Please Enter Your Otp or Check Your Inbox
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
          className="input-group mt-3 border rounded-3 "
          style={{ backgroundColor: "#f8f9fa" }}
        >
          <span className="input-group-text bg-transparent border-0 pe-3">
            <i className="fa-solid fa-lock text-secondary fs-6"></i>
          </span>
          <div
            className="vr my-1"
            style={{ width: "1px", backgroundColor: "#6c757d" }}
          ></div>
          <input
            type="otp"
            className="form-control bg-transparent border-0  ps-3"
            placeholder="OTP"
            aria-describedby="otpHelpBlock"
            // style={{ fontSize: "1rem" }}
            {...register("seed", {
              required: "OTP is Required",
            })}
          />
        </div>
        {errors.seed && (
          <span className=" badge bg-danger mt-1">{errors.seed.message}</span>
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
            placeholder="New Password"
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
        {/*confirm New Password */}
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
            type={showConfirmedPassword ? "text" : "password"}
            placeholder="Confirm New Password"
            id="inputPassword5"
            className="form-control bg-transparent border-0  ps-3"
            aria-describedby="passwordHelpBlock"
            {...register("confirmPassword", {
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
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
          />
          <span
            className="input-group-text bg-transparent border-0"
            style={{ cursor: "pointer" }}
            onClick={() => setShowConfirmedPassword(!showConfirmedPassword)}
          >
            <i
              className={`fa ${showConfirmedPassword ? "fa-eye-slash" : "fa-eye"} text-secondary fs-5`}
            ></i>
          </span>
        </div>

        {errors.confirmPassword && (
          <span className=" badge bg-danger  mt-1 ">
            {errors.confirmPassword.message}
          </span>
        )}

        <button
          className="btn btn-success w-100 fw-bold my-4 py-1 d-flex justify-content-center align-items-center"
          type="submit"
          disabled={loading} // تعطيل الزر أثناء التحميل
        >
          {loading ? (
            <span
              className="spinner-border spinner-border-sm me-2"
              role="status"
              aria-hidden="true"
            ></span>
          ) : null}
          {loading ? "Loading..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
