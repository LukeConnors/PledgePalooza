import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { setImages } from "../../store/images";

function RewardImageFormModal(rewardId) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [formData, setFormData] = useState({
    url: "",
  });

  const [loading, setLoading] = useState(false); // State to track loading
  const [submitted, setSubmitted] = useState(false); // State to track submission status

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when the fetch begins

    const info = new FormData();
    info.append("url", formData.url);
    try {
      console.log("REWARD ID!!!!!!!!!", rewardId);
      const res = await fetch(`/api/rewards/${rewardId.rewardId}/image`, {
        method: "POST",
        body: info,
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        console.log(data);
        closeModal();
        setSubmitted(true);
        window.location.reload();
      } else {
        const errorData = await res.json();
        console.log(errorData);
      }
    } catch (e) {
      console.log("fetch error:", e);
    } finally {
      setLoading(false); // Stop loading when the fetch is done
    }
  };

  return (
    <>
      <h1>Add an image to your project reward</h1>
      {submitted ? (
        <p>Submitted!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Description Image
            <input
              type="file"
              accept=".png, .jpeg, .jpg"
              onChange={(e) => setFormData({ ...formData, url: e.target.files[0] })}
            />
          </label>
          <button type="submit" className="submitting" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </>
  );
}

export default RewardImageFormModal;
