import React, { useEffect, useState } from "react";
import "./DeleteRewardModal.css";
import { useModal } from "../../context/Modal";
import * as rewardActions from "../../store/rewards"
import { useDispatch } from "react-redux";

function DeleteRewardModal({ projectId, rewardId }) {
  const [deleted, setDeleted] = useState(false);
  const dispatch = useDispatch()
  const { closeModal } = useModal();
  const handleCancel = () => {
    closeModal();
  };

  const handleDelete = () => {
    dispatch(rewardActions.removeReward(projectId, rewardId))
    .then(setDeleted(true))
  };

  useEffect(() => {
    if (deleted) {
      const timeout = setTimeout(() => {
        closeModal();
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

export default DeleteRewardModal;
