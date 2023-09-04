import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import "./ProjectDetails.css"
import OpenModalButton from "../OpenModalButton";
import ImageFormModal from "../DesImageFormModal";
import BackProjectModal from "../BackProjectModal";
import { useSelector } from "react-redux";
import { userSelector } from "../../store/session";
import RewardImageFormModal from "../RewardImageModal";


function ProjectDetails() {
    const [project, setProject] = useState({});
    const [rewards, setRewards] = useState([]);
    const {projectId} = useParams();
    const user = useSelector(userSelector)


    useEffect(()=> {
        console.log("projectId", projectId)
            fetch(`/api/projects/${projectId}`)
                .then(response => response.json())
                .then(data => {
                    setProject(data)
                    console.log(data)
                })
                .catch(error => {
                    console.error("Error fetching project:", error)
                });

            fetch(`/api/projects/${projectId}/rewards`)
                .then(response => response.json())
                .then(data => {
                    setRewards(data.rewards)
                })
                .catch(error => {
                    console.error("Error fetching rewards", error);
                });
            }, [projectId]);

            console.log(project)



            return (
                <div>
                    <div className="project-detail">
                        <h1>{project.name}</h1>
                        <p>{project.description}</p>
                        {console.log("!!!!!!!", project.ownerId)}
                        {user.id === project.ownerId ? (
                            <OpenModalButton
                                buttonText={"Add an Image"}
                                modalComponent={<ImageFormModal projectId={projectId} />}
                            />
                        ) : (
                            <OpenModalButton
                            buttonText={"Back this project"}
                            modalComponent={<BackProjectModal projectId={projectId} />}
                            />
                        )}
                        <img src={project.bannerImg} alt={project.name} />
                    </div>

                    <div className="reward-list">
                        {rewards.map(reward => (
                            <div key={reward.id} className="reward-tile">
                                <h3>{reward.name}</h3>
                                <p>{reward.description}</p>
                                <OpenModalButton
                                buttonText={"Add an Image"}
                                modalComponent={<RewardImageFormModal rewardId={reward.id}/>}
                                />
                                <p>Price: ${reward.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
 }



 export default ProjectDetails
