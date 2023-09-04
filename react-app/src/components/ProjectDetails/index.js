import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import "./ProjectDetails.css";
import OpenModalButton from "../OpenModalButton";
import ImageFormModal from "../DesImageFormModal";
import BackProjectModal from "../BackProjectModal";
import { userSelector } from "../../store/session";

import RewardImageFormModal from "../RewardImageModal";

function ProjectDetails() {
  const [project, setProject] = useState({});
  const [rewards, setRewards] = useState([]);
  const [rewardImages, setRewardImages] = useState({});
  const { projectId } = useParams();
  const user = useSelector(userSelector);

  const [pledgedAmount, setPledgedAmount] = useState(Math.floor(Math.random() * 10000));
  const [backerCount, setBackerCount] = useState(Math.floor(Math.random() * 5000));
  const [daysLeft, setDaysLeft] = useState(Math.floor(Math.random() * 65));

  useEffect(() => {
    fetch(`/api/projects/${projectId}`)
      .then((response) => response.json())
      .then((data) => {
        setProject(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching project:", error);
      });

    fetch(`/api/projects/${projectId}/rewards`)
      .then((response) => response.json())
      .then((data) => {
        setRewards(data.rewards);
      })
      .catch((error) => {
        console.error("Error fetching rewards", error);
      });
  }, [projectId]);

  useEffect(() => {
    // Fetch reward images for each reward
    rewards.forEach((reward) => {
      fetch(`/api/rewards/${reward.id}/image`)
        .then((response) => response.json())
        .then((data) => {
          // Update the rewardImages state with the fetched image data
          setRewardImages((prevRewardImages) => ({
            ...prevRewardImages,
            [reward.id]: data.image[0], // Store the image data with the reward ID as the key
          }));
        })
        .catch((error) => {
          console.error(`Error fetching reward images for reward ${reward.id}`, error);
        });
    });
  }, [rewards]);

  return (
    <div>
        <div className="project-detail">
            <h1>{project.name}</h1>
            <p>{project.description}</p>

            <div className="project-main-content">
                <img className="project-banner" src={project.bannerImg} alt={project.name} />
                <div className="stats-and-rewards">
                    <div className="project-stats">
                        <div>${pledgedAmount} pledged</div>
                        <div>{backerCount} backers</div>
                        <div>{daysLeft} days left</div>
                        {user.id !== project.ownerId && (
                            <OpenModalButton
                                buttonText={"Back this project"}
                                modalComponent={<BackProjectModal projectId={projectId} />}
                            />
                        )}
                    </div>

                    <div className="reward-list">
                        {rewards.map((reward) => (
                            <div key={reward.id} className="reward-tile">
                                <h3>{reward.name}</h3>
                                <p>{reward.description}</p>
                                {rewardImages[reward.id] ? (
                                    <img
                                        className="reward-img"
                                        src={rewardImages[reward.id].url}
                                        alt={`Reward for ${reward.name}`}
                                    />
                                ) : (
                                    <OpenModalButton
                                        buttonText={"Add an Image"}
                                        modalComponent={<RewardImageFormModal rewardId={reward.id} />}
                                    />
                                )}
                                <p>Price: ${reward.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {user.id === project.ownerId && (
                <OpenModalButton
                    buttonText={"Add an Image"}
                    modalComponent={<ImageFormModal projectId={projectId} />}
                />
            )}
        </div>
    </div>
);
}

export default ProjectDetails;



