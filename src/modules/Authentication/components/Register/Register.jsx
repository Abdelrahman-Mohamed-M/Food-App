import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AUTH_URLS } from "../../../../Constants/END-Pointes";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      let response = await axios.post(AUTH_URLS.register, data);
      toast.success("User Add Successfully");
      console.log(response);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Add User");
    }
  };

  return (
    <div>
      <div className="auth-title mb-4">
        <h3 className="h4">Register</h3>
        <span className=" text-muted">
          Welcome Back! Please enter your details
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-6">
            <div className="input-group mt-3 ">
              <span className=" input-group-text">
                <i className="fa-solid fa-envelope"></i>{" "}
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="User Name "
                aria-describedby="userNameHelpBlock"
                {...register("userName ", {
                  required: "User Name is Required",
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
          </div>
          <div className="col-6">
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
          </div>
        </div>
        <div className="row">
          <div className="col-6">
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
          </div>
          <div className="col-6">
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
          </div>
        </div>
        <div className="row">
          <div className="col-6">
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
          </div>
          <div className="col-6">
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
          </div>
        </div>

        <button className="btn btn-success w-100 fw-bold my-4 py-1">
          Register
        </button>
      </form>
    </div>
  );
}
