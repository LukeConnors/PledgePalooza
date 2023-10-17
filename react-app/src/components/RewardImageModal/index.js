import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./RewardImage.css";
import { addAImage, getProjectRewards } from "../../store/rewards";

function RewardImageFormModal({ rewardId, projectId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [formData, setFormData] = useState({
    url: "",
  });

  const [loading, setLoading] = useState(true); // State to track loading
  const [submitted, setSubmitted] = useState(false); // State to track submission status

  useEffect(() => {
    if (formData.url) {
      setLoading(false);
      dispatch(getProjectRewards(projectId))
    }
  }, [formData.url, submitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const info = new FormData();
    info.append("url", formData.url);
    await dispatch(addAImage(rewardId, info));
    closeModal();
    setSubmitted(true);
  };

  return (
    <>
      {submitted ? (
        <p>Submitted!</p>
      ) : (
        <div className="rew-img-page-container">
          <form onSubmit={handleSubmit} className="rew-img-form">
            <h2>Add an image to your project reward</h2>
            <div className="rew-img-amount">
              <label>
                Reward Image
                <input
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={(e) => setFormData({ ...formData, url: e.target.files[0] })}
                  className="rew-img-input"
                />
              </label>
            </div>
            <button type="submit" className="submitting" disabled={loading}>
              {loading ? "Select an image..." : "Submit"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default RewardImageFormModal;
