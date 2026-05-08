import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthAPI } from "../../../../api/index";
import logo from "../../../../assets/images/Logo.png";
import { useNavigate } from "react-router-dom";

export default function ChangePassword({ show, handleClose }) {
  const [loading, setLoading] = useState(false);

  const [showOldPassword, setShowOldPassword] = useState(false);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // API CALL
      let response = await AuthAPI.Changepass(data);

      toast.success("Password Changed Successfully");

      reset();

      handleClose();
      navigate("/login");
      localStorage.removeItem("token");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton className="border-0 ">
        {" "}
      </Modal.Header>
      <Modal.Body className="p-4">
        <div className="text-center mb-2">
          <img src={logo} alt="logo" className="mb-2 w-50" />
        </div>
        {/* Title */}
        <div className="mb-4">
          <h4 className="fw-bold">Change Your Password</h4>

          <p className="text-muted small">Enter your details below</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Old Password */}
          <div
            className="input-group mt-3 border rounded-3"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <span className="input-group-text bg-transparent border-0">
              <i className="fa fa-lock text-secondary"></i>
            </span>

            <div
              className="vr my-1"
              style={{
                width: "1px",
                backgroundColor: "#6c757d",
              }}
            ></div>

            <input
              type={showOldPassword ? "text" : "password"}
              placeholder="Old Password"
              className="form-control bg-transparent border-0 ps-3"
              {...register("oldPassword", {
                required: "Old password is required",
              })}
            />

            <span
              className="input-group-text bg-transparent border-0"
              style={{ cursor: "pointer" }}
              onClick={() => setShowOldPassword(!showOldPassword)}
            >
              <i
                className={`fa ${
                  showOldPassword ? "fa-eye-slash" : "fa-eye"
                } text-secondary`}
              ></i>
            </span>
          </div>

          {errors.oldPassword && (
            <span className="badge bg-danger mt-1">
              {errors.oldPassword.message}
            </span>
          )}

          {/* New Password */}
          <div
            className="input-group mt-3 border rounded-3"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <span className="input-group-text bg-transparent border-0">
              <i className="fa fa-lock text-secondary"></i>
            </span>

            <div
              className="vr my-1"
              style={{
                width: "1px",
                backgroundColor: "#6c757d",
              }}
            ></div>

            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              className="form-control bg-transparent border-0 ps-3"
              {...register("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />

            <span
              className="input-group-text bg-transparent border-0"
              style={{ cursor: "pointer" }}
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              <i
                className={`fa ${
                  showNewPassword ? "fa-eye-slash" : "fa-eye"
                } text-secondary`}
              ></i>
            </span>
          </div>

          {errors.newPassword && (
            <span className="badge bg-danger mt-1">
              {errors.newPassword.message}
            </span>
          )}

          {/* Confirm Password */}
          <div
            className="input-group mt-3 border rounded-3"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <span className="input-group-text bg-transparent border-0">
              <i className="fa fa-lock text-secondary"></i>
            </span>

            <div
              className="vr my-1"
              style={{
                width: "1px",
                backgroundColor: "#6c757d",
              }}
            ></div>

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              className="form-control bg-transparent border-0 ps-3"
              {...register("confirmNewPassword", {
                required: "Confirm password is required",

                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
            />

            <span
              className="input-group-text bg-transparent border-0"
              style={{ cursor: "pointer" }}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <i
                className={`fa ${
                  showConfirmPassword ? "fa-eye-slash" : "fa-eye"
                } text-secondary`}
              ></i>
            </span>
          </div>

          {errors.confirmNewPassword && (
            <span className="badge bg-danger mt-1">
              {errors.confirmNewPassword.message}
            </span>
          )}

          {/* Submit Button */}
          <button
            className="btn btn-success w-100 fw-bold mt-4 py-2 d-flex justify-content-center align-items-center"
            type="submit"
            disabled={loading}
          >
            {loading && (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
            )}

            {loading ? "Loading..." : "Change Password"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
}
