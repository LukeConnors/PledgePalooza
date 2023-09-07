import React, { useEffect, useState } from "react";
import "./EditProject.css";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { userSelector } from "../../store/session";

function EditProject() {
  const history = useHistory();
  const { projectId } = useParams();
  const user = useSelector(userSelector);
  const [project, setProject] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    category: "",
    bannerImg: "",
    endDate: "",
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
        setFormData({
          name: data.name,
          description: data.description,
          location: data.location,
          categoryId: data.category,
          bannerImg: data.bannerImg,
          endDate: data.endDate,
        });
      });
  }, [projectId]);

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
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "PUT",
        body: formDataToSend,
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        history.push(`/projects/${data.id}`);
      } else {
        const errors = await res.json();
        setErrors(errors.form_errors);
        console.log("Error:", errors);
      }
    } catch (error) {
      console.log("Fetch error:", error);
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
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Edit your project here!</h1>
        <div>
          <label htmlFor="name">Name</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="name"
            name="name"
            value={formData.name}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            onChange={handleInputChange}
            id="description"
            name="description"
            value={formData.description}
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            onChange={handleInputChange}
            type="text"
            id="location"
            name="location"
            value={formData.location}
          />
        </div>
        <div>
          <label htmlFor="bannerImg">Banner Image</label>
          <input
            onChange={handleInputChange}
            type="file"
            accept=".png, .jpeg, .jpg"
            id="bannerImg"
            name="bannerImg"
          />
        </div>
        <div>
          <label htmlFor="categories">Categories</label>
          <select onChange={handleInputChange} name="categoryId" value={formData.categoryId || ""}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="endDate">Project end date</label>
          <input
            onChange={handleInputChange}
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditProject;
