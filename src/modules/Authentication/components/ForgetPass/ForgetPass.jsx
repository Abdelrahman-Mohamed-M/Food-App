import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AUTH_URLS } from "../../../../Constants/END-Pointes";

export default function ForgetPass() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      let response = await axios.post(AUTH_URLS.forgetpass, data);
      toast.success("Success Check your Email");

      navigate("/reset-pass");
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      console.log(error);
      toast.error("Something Wronge");
    }
  };

  return (
    <div>
      <div className="auth-title mb-4">
        <h3 className="h4">Forgot Your Password?</h3>
        <span className=" text-muted ">
          No worries! Please enter your email and we will send a password reset
          link{" "}
        </span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group mt-5">
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

        <button className="btn btn-success w-100 fw-bold  my-5 py-1">
          Submit
        </button>
      </form>
    </div>
  );
}
