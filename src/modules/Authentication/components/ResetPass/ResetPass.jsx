import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AUTH_URLS } from "../../../../Constants/END-Pointes";

export default function ResetPass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      let response = await axios.post(AUTH_URLS.resetpass, data);
      toast.success("Login Successfully");

      navigate("/dashboard");
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.log(error);
      toast.error("Failed to login");
    }
  };

  return (
    <div>
      <div className="auth-title mb-4">
        <h3 className="h4">Reset Password</h3>
        <span className=" text-muted">
          Please Enter Your Otp or Check Your Inbox{" "}
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mt-3">
          <span className=" input-group-text">
            <i className="fa-solid fa-envelope"></i>{" "}
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
        {/* =========== OTP================== */}
        <div className="input-group mt-3">
          <span className=" input-group-text">
            <i className="fa-solid fa-lock "></i>{" "}
          </span>
          <input
            type="otp"
            className="form-control"
            placeholder="OTP "
            aria-describedby="otpHelpBlock"
            {...register("seed", {
              required: "OTP is Required",
            })}
          />
        </div>
        {errors.seed && (
          <span className=" text-danger">{errors.seed.message}</span>
        )}

        {/* new Password */}

        <div className="input-group mt-3">
          <span className=" input-group-text">
            <i className="fa fa-lock"></i>
          </span>

          <input
            type="password"
            placeholder=" New Password"
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
        {/*confirm New Password */}

        <div className="input-group mt-3">
          <span className=" input-group-text">
            <i className="fa fa-lock"></i>
          </span>

          <input
            type="password"
            placeholder="Confirm New Password"
            id="inputPassword5"
            className="form-control"
            aria-describedby="passwordHelpBlock"
            {...register("confirmPassword", {
              required: "Password is Required",
            })}
          />
        </div>
        {errors.password && (
          <span className=" text-danger">{errors.password.message}</span>
        )}

        <button className="btn btn-success w-100 fw-bold my-4 py-1">
          Reset Password
        </button>
      </form>
    </div>
  );
}
