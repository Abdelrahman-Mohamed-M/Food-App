import React from "react";
import { Modal } from "react-bootstrap";

export default function LogoutModal({ show, handleClose, confirmLogout }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="p-4 text-center">
        <div className="mb-3">
          <i className="fa-solid fa-right-from-bracket text-danger fs-1"></i>
        </div>

        <h4 className="fw-bold mb-2">Logout</h4>

        <p className="text-muted mb-4">Are you sure you want to logout?</p>

        <div className="d-flex gap-3">
          <button
            className="btn btn-outline-secondary w-50"
            onClick={handleClose}
          >
            Cancel
          </button>

          <button className="btn btn-danger w-50" onClick={confirmLogout}>
            Logout
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
