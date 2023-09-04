import React, { useState } from "react";
import { useModal } from "../../context/Modal";


function BackProjectModal(projectId){
const {closeModal} = useModal()
const [formData, setFormData] = useState({
    cost: "",
  });
  console.log("!!!!!!!!!!!!!!!!!",projectId.projectId, "!!!!!!!!!!!!!!!!!!!!")

const handleSubmit = async (e) => {
    e.preventDefault();
    const info = new FormData()
    info.append("cost", formData.cost);

    try {
    const res = await fetch(`/api/projects/${projectId.projectId}/back`, {
        method: "POST",
        body: info,
        credentials: "include"
    });
    if(res.ok){
        const data = await res.json()
        console.log(data);
        closeModal()
    } else {
        const errorData = await res.json();
        console.log(errorData)
    }
    } catch(e) {
    console.log("fetch error:", e)
    }
};

return (
    <>
    <h1>Back This Project!</h1>
    <form onSubmit={handleSubmit}>
        <label>
            Amount:
            <input
            type="number"
            value={formData.cost}
            onChange={(e) => setFormData({...formData, cost: e.target.value})}
            />
        </label>
        <button type="submit">Submit</button>
    </form>
    </>
)
}

export default BackProjectModal;
