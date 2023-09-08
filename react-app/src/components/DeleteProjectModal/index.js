import React, { useEffect, useState } from "react";
import "./DeleteProjectModal.css";
import { useModal } from "../../context/Modal";

function DeleteProjectModal({ projectId }) {
  const [deleted, setDeleted] = useState(false);
  const { closeModal } = useModal();
  const handleCancel = () => {
    closeModal();
  };

  const handleDelete = () => {
    fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
    }).then(() => {
      setDeleted(true);
    });
  };

  useEffect(() => {
    if (deleted) {
      const timeout = setTimeout(() => {
        closeModal();
        window.location.reload();
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [deleted, closeModal]);

  return (
    <div className="delete-modal">
      {deleted ? (
        <>
          <h1>Deleted Successfully!</h1>
        </>
      ) : (
        <>
          <h1>Are you sure you want to delete this project?</h1>
          <div className="delete-modal-btn">
            <button onClick={handleCancel}>No, cancel</button>
            <button className="delete-btn" onClick={handleDelete}>
              Yes, delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default DeleteProjectModal;
