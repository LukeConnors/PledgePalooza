import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import "./BackProjectForm.css";
import { createBackedProject } from "../../store/backed-projects";
import { useDispatch } from "react-redux";

function BackProjectModal({ projectId }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    cost: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
   try {
      await dispatch(createBackedProject(projectId, formData.cost));
      closeModal();
    }catch (error) {
      console.error("Error trying to back project:", error);
    }
  };

  return (
    <>
      <div className="back-form-page-container">
        <form onSubmit={handleSubmit} className="modal-back-form">
          <h1>Back This Project!</h1>
          <div className="back-form-page-amount">
            <label>
              Amount:
              <input
                type="number"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                className="modal-num-input"
              />
            </label>
          </div>
          <button className="back-form-page-btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default BackProjectModal;
