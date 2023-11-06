import React, { useEffect, useState } from "react";
import "./EditProject.css";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { userSelector } from "../../store/session";
import * as projectActions from "../../store/projects"

function EditProject() {
  const history = useHistory();
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");
  const user = useSelector(userSelector);
  const [project, setProject] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    categoryId: "",
    bannerImg: "",
    endDate: "",
    summary: "",
  });
  const [errors, setErrors] = useState([]);

  if (!user) {
    history.push("/");
  }

  useEffect(() => {
    fetch(`/api/projects/${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        setProject(data);
        const existingEndDate = data.endDate
          ? new Date(data.endDate).toISOString().split("T")[0]
          : "";

        const selectedCategory = categories.find((category) => category.name === data.category);

        // Set the initial value for selectedCategory
        setSelectedCategory(selectedCategory ? selectedCategory.id : "");
        setFormData({
          name: data.name,
          description: data.description,
          location: data.location,
          summary: data.summary,
          categoryId: selectedCategory.id,
          bannerImg: data.bannerImg,
          endDate: existingEndDate,
        });
      });
  }, [projectId]);

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
    if (!formData.name) {
      formErrors.name = "Name is required.";
    }
    if (!formData.description || formData.description.length < 25) {
      formErrors.description = "Description needs to be 25 or more characters";
    }
    if (!formData.location) {
      formErrors.location = "Location is required";
    }
    if (!formData.categoryId) {
      formErrors.categoryId = "Category is required";
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


    let editedProject = await dispatch(projectActions.editProject(projectId, formDataToSend))
    if(editedProject && editedProject.id){
      history.push(`/projects/${projectId}`)
    } else {
      return editedProject
    }
  };

  const categories = [
    { id: 1, name: "Board Game" },
    { id: 2, name: "Video Game" },
    { id: 3, name: "Technology" },
    { id: 4, name: "Retail" },
    { id: 5, name: "Cooking" },
  ];

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "bannerImg") {
      setFormData({
        ...formData,
        [name]: files[0], // Set the selected file
      });
    } else if (name === "categoryId") {
      // Update the selectedCategory separately with the category ID
      setSelectedCategory(value);
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div className="edit-form-content">
      <form className="edit-project-form" onSubmit={handleSubmit}>
        <h1>Edit your project here!</h1>
        <div className="edit-project-form-name">
          <label htmlFor="name">Name</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="name"
            name="name"
            value={formData.name}
          />
          {errors.name && <div className="error-message">{errors.name}</div>}
        </div>
        <div className="edit-project-form-description">
          <label htmlFor="description">Description</label>
          <textarea
            cols="30"
            rows="5"
            onChange={handleInputChange}
            id="description"
            name="description"
            value={formData.description}
          />
          {errors.description && <div className="error-message">{errors.description}</div>}
        </div>
        <div className="edit-project-form-location">
          <label htmlFor="location">Location</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="location"
            name="location"
            value={formData.location}
          />
          {errors.location && <div className="error-message">{errors.location}</div>}
        </div>
        <div className="edit-project-form-summary">
          <label htmlFor="summary">Summary</label>
          <textarea
            cols="30"
            rows="5"
            onChange={handleInputChange}
            id="summary"
            name="summary"
            value={formData.summary}
          />
        </div>
        <div className="edit-project-form-image">
          <label htmlFor="bannerImg">Banner Image</label>
          <input
            onChange={handleInputChange}
            type="file"
            accept=".png, .jpeg, .jpg"
            id="bannerImg"
            name="bannerImg"
          />
           {errors.bannerImg && <div className="error-message">{errors.bannerImg}</div>}
        </div>
        <div className="edit-project-form-category">
          <label htmlFor="categories">Categories</label>
          <select onChange={handleInputChange} name="categoryId" value={selectedCategory}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {errors.categoryId && <div className="error-message">{errors.categoryId}</div>}
        <div className="edit-project-form-date">
          <label htmlFor="endDate">Project end date</label>
          <input
            onChange={handleInputChange}
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
          />
           {errors.endDate && <div className="error-message">{errors.endDate}</div>}
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditProject;
