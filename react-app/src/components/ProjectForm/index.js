import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import "./ProjectForm.css";

function ProjectFormPage() {
  const history = useHistory();
  const [errors, setErrors] = useState({});
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
    history.push("/");
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

    let formErrors = {};
    if(!formData.name){
      formErrors.name = "Name is required.";
    }
    if(!formData.description || formData.description.length < 25){
      formErrors.description = "Description needs to be 25 or more characters"
    }
    if(!formData.location){
      formErrors.location = "Location is required"
    }
    if(!formData.categoryId){
      formErrors.categoryId = "Category is required"
    }
    if(!formData.endDate){
      formErrors.endDate = "End Date is required"
    } else {
      const selectedEndDate = new Date(formData.endDate);
      const currentDate = new Date(getCurrentDate());
      const oneYearLater = new Date(getOneYearLaterDate());

      if(selectedEndDate < currentDate){
        formErrors.endDate = "End Date cannot be before current date";
      } else if (selectedEndDate > oneYearLater){
        formErrors.endDate = "End Date cannot be more than one year from current date"
      }
    }

    if(Object.keys(formErrors).length > 0){
      setErrors(formErrors);
      return;
    }


    try {
      const res = await fetch("/api/projects/", {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        history.push(`/projects/${data.id}`);
      } else {
        const e = await res.json();
        setErrors(e.form_errors);
        console.log("!!!!!!!!!!!ERROR!!!!!!!!", e, "!!!!!!!!ERROR!!!!!!!!!!");
      }
    } catch (e) {
      console.log("fetch error:", e);
    }
  };

  console.log("!!!!!!!!!!MY ERRORS!!!!!", errors);

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
    return oneYearLaterDate.toISOString().split('T')[0];
  }


  return (
  <>
  <div className="form-container">
    <div className="form-content">
    <h1 style={{ textAlign: "center" }}>Create a Project</h1>
    <form onSubmit={handleSubmit} className="project-form">
      <label>
        Name
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        {errors.name && <div className="error-message">{errors.name}</div>}
      </label>

      <label>
        Description
        <input
          type="textarea"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        {errors.description && <div className="error-message">{errors.description}</div>}
      </label>

      <label>
        Location
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        />
        {errors.location && <div className="error-message">{errors.location}</div>}
      </label>

      <label>
        <select
          name="categories"
          value={formData.categoryId}
          onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
        >
          <option value="" disabled>Select a Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
              </option>
             ))}
             </select>
             {errors.categoryId && <div className="error-message">{errors.categoryId}</div>}
           </label>
     
           <label>
             Banner Image
             <input
               type="file"
               accept=".png, .jpeg, .jpg"
               onChange={(e) => setFormData({ ...formData, bannerImg: e.target.files[0] })}
             />
             {errors.bannerImg && <div className="error-message">{errors.bannerImg}</div>}
           </label>
     
           <label>
             Project Closing Date
             <input
               type="date"
               value={formData.endDate}
               min={getCurrentDate()}
               max={getOneYearLaterDate()}
               onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
             />
             {errors.endDate && <div className="error-message">{errors.endDate}</div>}
           </label>

           <label>
        Summary
        <input
          type="textarea"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </label>
     
           <button type="submit">Submit</button>
         </form>
          </div>
         </div>
       </>
     );
}

export default ProjectFormPage;
