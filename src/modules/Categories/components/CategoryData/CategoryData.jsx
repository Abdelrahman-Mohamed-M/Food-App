import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { CategoriesAPI } from "../../../../api";
import { toast } from "react-toastify";

export default function CategoryData({
  show,
  handleClose,
  selectedCategory,
  getCategoriesList,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (selectedCategory) {
      setValue("name", selectedCategory.name);
    } else {
      reset();
    }
  }, [selectedCategory, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      if (selectedCategory) {
        await CategoriesAPI.UpdateCategory(selectedCategory.id, data);
        toast.success("Category Updated Successfully");
      } else {
        await CategoriesAPI.CreateCategory(data);
        toast.success("Category Added Successfully");
      }

      getCategoriesList();
      handleClose();
      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div>
      {" "}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedCategory ? "Edit Category" : "Add Category"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              className="form-control"
              placeholder="Category Name"
              {...register("name", {
                required: "Category Name is Required",
              })}
            />

            {errors.name && (
              <span className="text-danger">{errors.name.message}</span>
            )}

            <div className="text-end mt-3">
              <button type="submit" className="btn btn-success">
                {selectedCategory ? "Update" : "Save"}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
