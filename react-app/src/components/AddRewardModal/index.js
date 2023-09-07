import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./AddReward.css";

function AddRewardModal({ projectId }) {
  const { closeModal } = useModal();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    est_delivery: "",
    quantity: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("est_delivery", formData.est_delivery);
    formDataToSend.append("quantity", formData.quantity);

    console.log(formData);

    try {
      const res = await fetch(`/api/projects/${projectId}`, {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        closeModal();
        window.location.reload();
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
          Price
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </label>
        <label>
          Estimated Delivery Date
          <input
            type="date"
            value={formData.est_delivery}
            onChange={(e) => setFormData({ ...formData, est_delivery: e.target.value })}
          />
        </label>
        <label>
          Quantity
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default AddRewardModal;
