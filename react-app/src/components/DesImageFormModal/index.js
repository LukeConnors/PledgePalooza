import React, { useState, useEffect } from "react";
import { useModal } from "../../context/Modal";
import './DesImageModal.css'
import { useHistory } from "react-router-dom";


function ImageFormModal(projectId) {
    const {closeModal} = useModal()
    const history = useHistory()

    const [formData, setFormData] = useState({
        url: "",
      });

      const [loading, setLoading] = useState(true); // State to track loading
      const [submitted, setSubmitted] = useState(false); // State to track submission status

      useEffect(() => {
        if(formData.url){
          setLoading(false)
        }
      }, [formData.url])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const info = new FormData()
        info.append("url", formData.url);
        try {
            const res = await fetch(`/api/projects/${projectId.projectId}/des-images`, {
              method: "POST",
              body: info,
              credentials: "include"
            });
            if (res.ok) {
              const data = await res.json();
              closeModal()
              setSubmitted(true)
              window.location.reload();
            } else {
              const errorData = await res.json();
            }
          } catch (e) {
            return("fetch error:", e);
          }
    }

return (
    <>
    {submitted ? (
        <p>Submitted!</p>
        ) : (
    <div className="des-form-page-container">
    <form onSubmit={handleSubmit} className="modal-des-form">
    <h2>Add an image to your project description</h2>
    <div className="des-form-page-amount">
        <label>
            Description Image:
            <input
            type="file"
            accept=".png, .jpeg, .jpg"
            onChange={(e) => setFormData({...formData, url: e.target.files[0]})}
            className="modal-file-input"
            />
        </label>
        </div>
        <button className="des-form-page-btn" type="submit" disabled={loading}>
          {loading ? "Select an image..." : "Submit"}
          </button>
    </form>
    </div>
        )}
    </>
);
}

export default ImageFormModal;
