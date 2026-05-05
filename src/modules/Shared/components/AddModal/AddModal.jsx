// import React from "react";
// import { Modal, Button } from "react-bootstrap";
// import { useForm } from "react-hook-form";

// export default function AddModal({
//   addShow,
//   handleAddClose,
//   addAction,
//   itemName,
//   itemType,
// }) {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   return (
//     <>
//       <Modal show={addShow} onHide={handleAddClose} centered>
//         <Modal.Header closeButton className=" fw-bolder  ">
//           Add New Category
//         </Modal.Header>

//         <Modal.Body className="text-center">
//           <form>
//             <div className=" input-group my-2">
//               <input
//                 type="text"
//                 className=" form-control"
//                 placeholder="Category Name"
//               />
//             </div>
//           </form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button
//             variant="outline-success"
//             className="fw-bold"
//             onClick={addAction}
//           >
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }
