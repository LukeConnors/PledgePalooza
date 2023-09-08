import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./AddReward.css";

function AddRewardModal({ projectId }) {
  const { closeModal } = useModal();
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    est_delivery: "",
    quantity: "",
  });

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


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("est_delivery", formData.est_delivery);
    formDataToSend.append("quantity", formData.quantity);

    let formErrors = {};
    if (!formData.name) {
      formErrors.name = "Name is required.";
    }
    if (!formData.description || formData.description.length < 25) {
      formErrors.description = "Description needs to be 25 or more characters";
    }
    if (!formData.price) {
      formErrors.price = "Price is required";
    }
    if(formData.price <= 0){
      formErrors.price = "Price cannot be equal to or less than 0"
    }
    if (!formData.est_delivery) {
      formErrors.est_delivery = "End Date is required";
    } else {
      const selectedEndDate = new Date(formData.est_delivery);
      const currentDate = new Date(getCurrentDate());
      const oneYearLater = new Date(getOneYearLaterDate());

      if (selectedEndDate < currentDate) {
        formErrors.est_delivery = "End Date cannot be before current date";
      } else if (selectedEndDate > oneYearLater) {
        formErrors.est_delivery = "End Date cannot be more than one year from current date";
      }
    }

    if (!formData.quantity) {
      formErrors.quantity = "Quantity is required";
    }
    if(formData.quantity <= 0){
      formErrors.quantity = "Quantity cannot be equal to or less than 0"
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }


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
      <div className="reward-form-page-container">
        <form onSubmit={handleSubmit} className="reward-form">
          <h1 style={{ textAlign: "center" }}>Create a Reward</h1>
          <div className="rew-form-amount">
            <label>
              Name
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="reward-name-input"
              />
            </label>
            <label>
              Description
              <textarea
                cols="30"
                rows="5"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="reward-des-input"
              />
            </label>
            <label>
              Price
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="reward-price-input"
              />
            </label>
            <label>
              Estimated Delivery Date
              <input
                type="date"
                value={formData.est_delivery}
                onChange={(e) => setFormData({ ...formData, est_delivery: e.target.value })}
                className="reward-est-input"
              />
            </label>
            <label>
              Quantity
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="reward-qty-input"
              />
            </label>
          </div>
          <button className="reward-submit" type="submit">
            Submit
          </button>
        </form>
    <div className="reward-form-page-container">
      <form onSubmit={handleSubmit} className="reward-form">
      <h1 style={{ textAlign: "center" }}>Create a Reward</h1>
      <div className="rew-form-amount">
        <label>
          Name
      {errors.name && <div className="error-message">{errors.name}</div>}
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="reward-name-input"
          />
        </label>

        <label>
          Description
        {errors.description && <div className="error-message">{errors.description}</div>}
          <input
            type="textarea"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="reward-des-input"
          />
        </label>
        <label>
          Price
        {errors.price && <div className="error-message">{errors.price}</div>}
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="reward-price-input"
          />
        </label>
        <label>
          Estimated Delivery Date
          {errors.est_delivery && <div className="error-message">{errors.est_delivery}</div>}
          <input
            type="date"
            value={formData.est_delivery}
            onChange={(e) => setFormData({ ...formData, est_delivery: e.target.value })}
            className="reward-est-input"
          />
        </label>
        <label>
          Quantity
          {errors.quantity && <div className="error-message">{errors.quantity}</div>}
          <input
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            className="reward-qty-input"
          />
        </label>
        </div>
        <button className="reward-submit" type="submit">Submit</button>
      </form>
      </div>
    </>
  );
}

export default AddRewardModal;
