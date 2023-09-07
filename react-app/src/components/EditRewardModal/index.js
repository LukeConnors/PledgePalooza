import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./EditReward.css";

function EditRewardModal({ projectId, reward }) {
    const { closeModal } = useModal();
    let existingEndDate = new Date(reward.estDelivery).toISOString().split("T")[0] || "";
    const [formData, setFormData] = useState({
        name: reward.name,
        description: reward.description,
        price: reward.price,
        est_delivery: existingEndDate,
        quantity: reward.quantity,
    });


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();

        formDataToSend.append("name", formData.name);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("est_delivery", formData.est_delivery);
        formDataToSend.append("quantity", formData.quantity);

        try {
            const res = await fetch(`/api/projects/${projectId}/rewards/${reward.id}`, {
                method: "PUT",
                body: formDataToSend,
                credentials: "include",
            });
            console.log(res)
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


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    return (
        <>
            <div className="reward-form-page-container">
                <form onSubmit={handleSubmit} className="reward-form">
                    <h1 style={{ textAlign: "center" }}>Edit Your Reward</h1>
                    <div className="rew-form-amount">
                        <label>
                            Name
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="reward-name-input"
                            />
                        </label>
                        <label>
                            Description
                            <input
                                type="textarea"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="reward-des-input"
                            />
                        </label>
                        <label>
                            Price
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                className="reward-price-input"
                            />
                        </label>
                        <label>
                            Estimated Delivery Date
                            <input
                                type="date"
                                name="est_delivery"
                                value={formData.est_delivery}
                                onChange={handleInputChange}
                                className="reward-est-input"
                            />
                        </label>
                        <label>
                            Quantity
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
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

export default EditRewardModal;
