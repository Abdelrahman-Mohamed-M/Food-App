import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AUTH_URLS } from "../../../../Constants/END-Pointes";

export default function ForgetPass() {
  const [loading, setLoading] = useState(false); // حالة التحميل

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      setLoading(true); // يبدأ التحميل
      let response = await axios.post(AUTH_URLS.forgetpass, data);
      toast.success("Success Check your Email");
      navigate("/reset-pass");
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error("Something Wronge");
    } finally {
      setLoading(false); // ينتهي التحميل
    }
  };
  return (
    <div>
      <div className="auth-title mb-4">
        <h3 className="h4">Forgot Your Password?</h3>
        <span className=" text-muted">
          No worries! Please enter your email and we will send a password reset
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
          {loading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
