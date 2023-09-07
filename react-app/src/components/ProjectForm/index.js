import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { Redirect } from "react-router-dom";
import "./ProjectForm.css";

function ProjectFormPage() {
  const history = useHistory()
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    categoryId: "",
    bannerImg: "",
    endDate: "",
  });

  const categories = [
    { id: 1, name: "Board Game" },
    { id: 2, name: "Video Game" },
    { id: 3, name: "Technology" },
    { id: 4, name: "Retail" },
    { id: 5, name: "Cooking" },
  ];

  // const csrf = document.querySelector("[name=csrf_token]").value

  const handleCancelClick = (e) => {
    history.push('/')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("categoryId", formData.categoryId);
    formDataToSend.append("endDate", formData.endDate);
    formDataToSend.append("bannerImg", formData.bannerImg);

    try {
      const res = await fetch("/api/projects/", {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        history.push(`/projects/${data.id}`)
      } else {
        const e = await res.json();
        setErrors(e.form_errors)
        console.log("!!!!!!!!!!!ERROR!!!!!!!!",e, "!!!!!!!!ERROR!!!!!!!!!!");
      }
    } catch (e) {
      console.log("fetch error:", e);
    }
  };

  console.log("!!!!!!!!!!MY ERRORS!!!!!",errors)
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Create a Project: </h1>
      <form onSubmit={handleSubmit} className="project-box">
      <div className="project-errors">{errors?.name}</div>
        <label className="project-form">
          Name
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <div className="project-errors">{errors?.description}</div>
        <label className="project-form">
          Description:
          <input
            type="textarea"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </label>
        <div className="project-errors">{errors?.location}</div>
        <label className="project-form">
          Location:
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </label>
        <div className="project-errors">{errors?.categoryId}</div>
        <label className="project-form">
          <select
            name="categories"
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          >
            <option disabled value="">
              Select a category:
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <div className="project-errors">{errors?.bannerImg}</div>
        <label className="project-form">
          Banner Image:
          <input
            type="file"
            accept=".png, .jpeg, .jpg"
            onChange={(e) => setFormData({ ...formData, bannerImg: e.target.files[0] })}
          />
        </label>
        <div className="project-errors">{errors?.endDate}</div>
        <label className="project-form">
          Project Closing Date:
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          />
        </label>
        <div className="project-buttons">
        <button className="project-submit" type="submit">Submit</button>
        <button className="project-cancel" onClick={handleCancelClick}>Cancel</button>
        </div>
      </form>
    </>
  );
}

export default ProjectFormPage;
