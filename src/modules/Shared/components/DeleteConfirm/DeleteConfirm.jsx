import React from "react";
import { Modal, Button } from "react-bootstrap";
import noDataImg from "../../../../assets/images/no-data.png";
export default function DeleteConfirmation({
  show,
  handleClose,
  deleteAction,
  itemName,
  itemType,
}) {
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="text-center">
          <img src={noDataImg} className="img-fluid" alt="delete-warning" />
          <h4 className="fw-bold my-3">Delete {itemType} ?</h4>
          <p className="text-muted">
            Are you sure you want to delete {itemName}? If you are sure, just
            click on delete.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-danger"
            className="fw-bold"
            onClick={deleteAction}
          >
            Delete {itemName}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
