import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./ProjectForm.css";

function ProjectFormPage() {
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
        console.log(data);
      } else {
        const errorData = await res.json();
        console.log(errorData);
      }
    } catch (e) {
      console.log("fetch error:", e);
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Create a Project</h1>
      <form onSubmit={handleSubmit} className="project-form">
        <label>
          Name
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </label>
        <label>
          Description
          <input
            type="textarea"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </label>
        <label>
          Location
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </label>
        <label>
          <select
            name="categories"
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          >
            <option disabled value="">
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Banner Image
          <input
            type="file"
            accept=".png, .jpeg, .jpg"
            onChange={(e) => setFormData({ ...formData, bannerImg: e.target.files[0] })}
          />
        </label>
        <label>
          Project Closing Date
          <input
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default ProjectFormPage;
