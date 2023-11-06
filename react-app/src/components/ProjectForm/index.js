import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import "./ProjectForm.css";
import * as projectActions from "../../store/projects"

function ProjectFormPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const user = useSelector(state => state.session.user)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    summary: "",
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
    history.push("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("location", formData.location);
    formDataToSend.append("summary", formData.summary);
    formDataToSend.append("categoryId", formData.categoryId);
    formDataToSend.append("endDate", formData.endDate);
    formDataToSend.append("bannerImg", formData.bannerImg);

    let formErrors = {};
    if (!formData.name || formData.name.length > 40) {
      formErrors.name = "Name is required and has to be less than 40 characters.";
    }
    if (!formData.description || formData.description.length < 25) {
      formErrors.description = "Description needs to be 25 or more characters";
    }
    if (!formData.location) {
      formErrors.location = "Location is required";
    } else if (formData.location.length > 50) {
      formErrors.location = "Location must be less than 50 characters";
    }
    if(!formData.summary){
      formErrors.summary = "Summary is required"
    }
    if (!formData.categoryId) {
      formErrors.categoryId = "Category is required";
    }
    if (!formData.bannerImg) {
      formErrors.bannerImg = "Banner Image is required";
    } else if (!formData.bannerImg.name.match(/\.(jpg|jpeg|png)$/)) {
      formErrors.bannerImg = "Banner Image must be a .jpg, .jpeg, or .png file";
    }
    if (!formData.endDate) {
      formErrors.endDate = "End Date is required";
    } else {
      const selectedEndDate = new Date(formData.endDate);
      const currentDate = new Date(getCurrentDate());
      const oneYearLater = new Date(getOneYearLaterDate());

      if (selectedEndDate < currentDate) {
        formErrors.endDate = "End Date cannot be before current date";
      } else if (selectedEndDate > oneYearLater) {
        formErrors.endDate = "End Date cannot be more than one year from current date";
      }
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    let newProject = await dispatch(projectActions.createProject(formDataToSend))
    if(newProject && newProject.id){
      history.push(`/projects/${newProject?.id}`)
    } else {
      return newProject
    }
  };

  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function getOneYearLaterDate() {
    const oneYearLaterDate = new Date();
    oneYearLaterDate.setFullYear(oneYearLaterDate.getFullYear() + 1);
    return oneYearLaterDate.toISOString().split("T")[0];
  }


  return (
    <>
      <div className="form-container">
        <div className="form-content">
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="project-form">
            <h1 style={{ textAlign: "center" }}>Create a Project</h1>
            <div className="project-form-name">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>
            <div className="project-form-description">
              <label htmlFor="description">Description:</label>
              <textarea
                cols="30"
                rows="5"
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              {errors.description && <div className="error-message">{errors.description}</div>}
            </div>
            <div className="project-form-location">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
              {errors.location && <div className="error-message">{errors.location}</div>}
            </div>
            <div className="project-form-summary">
              <label htmlFor="summary">Summary:</label>
              <textarea
                cols="30"
                rows="5"
                id="summary"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
              />
              {errors.summary && <div className="error-message">{errors.summary}</div>}
            </div>
            <div className="project-form-category">
              <label htmlFor="category">Select a category:</label>
              <select
                name="categories"
                id="category"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              >
                <option value="" disabled>
                  Select a Category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && <div className="error-message">{errors.categoryId}</div>}
            </div>
            <div className="project-form-image">
              <label htmlFor="image">Banner Image:</label>
              <input
                type="file"
                id="image"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFormData({ ...formData, bannerImg: e.target.files[0] })}
              />
              {errors.bannerImg && <div className="error-message">{errors.bannerImg}</div>}
            </div>
            <div className="project-form-date">
              <label htmlFor="date">Project Closing Date:</label>
              <input
                type="date"
                id="date"
                value={formData.endDate}
                min={getCurrentDate()}
                max={getOneYearLaterDate()}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
              {errors.endDate && <div className="error-message">{errors.endDate}</div>}
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProjectFormPage;
