import React, { useState } from "react";
import { useModal } from "../../context/Modal";
import './DesImageModal.css'
import { useHistory } from "react-router-dom";


function ImageFormModal(projectId) {
    const {closeModal} = useModal()
    const history = useHistory()

    const [formData, setFormData] = useState({
        url: "",
      });


    const handleSubmit = async (e) => {
        e.preventDefault();
        const info = new FormData()
        info.append("url", formData.url);
        console.log("THIS IS OUR URL", formData.url)
        try {
            const res = await fetch(`/api/projects/${projectId.projectId}/des-images`, {
              method: "POST",
              body: info,
              credentials: "include"
            });
            if (res.ok) {
              const data = await res.json();
              console.log(data);
              closeModal()
              window.location.reload();
            } else {
              const errorData = await res.json();
              console.log(errorData);
            }
          } catch (e) {
            console.log("fetch error:", e);
          }
    }

return (
    <>
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
        <button className="des-form-page-btn" type="submit">Submit</button>
    </form>
    </div>
    </>
);
}

export default ImageFormModal;
