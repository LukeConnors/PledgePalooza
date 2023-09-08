import React, { useEffect, useState } from "react";
import "./DeleteRewardModal.css";
import { useModal } from "../../context/Modal";

function DeleteRewardModal({ projectId, rewardId }) {
  const [deleted, setDeleted] = useState(false);
  const { closeModal } = useModal();
  const handleCancel = () => {
    closeModal();
  };

  const handleDelete = () => {
    fetch(`/api/projects/${projectId}/rewards/${rewardId}`, {
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
          <h1>Are you sure you want to delete this reward?</h1>
          <button onClick={handleCancel}>No, cancel</button>
          <button onClick={handleDelete}>Yes, delete</button>
        </>
      )}
    </div>
  );
}

export default DeleteRewardModal;
