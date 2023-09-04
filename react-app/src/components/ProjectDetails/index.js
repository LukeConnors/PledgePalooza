import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import "./ProjectDetails.css";
import OpenModalButton from "../OpenModalButton";
import ImageFormModal from "../DesImageFormModal";
import BackProjectModal from "../BackProjectModal";
import { userSelector } from "../../store/session";
import chatLogo from "../../chat.png"
import checkLogo from "../../check.png"
import megaphoneLogo from "../../megaphone.png"

import RewardImageFormModal from "../RewardImageModal";

function ProjectDetails() {
  const history = useHistory();
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
              {user?.id !== project.ownerId ? (
                // Check if the user is logged in
                user ? (
                  <OpenModalButton
                    buttonText={"Back this project"}
                    modalComponent={<BackProjectModal projectId={projectId} />}
                  />
                ) : (
                  <button onClick={() => history.push("/login")}>Back this project</button>
                )
              ) : (
                <OpenModalButton
                  buttonText={"Add a Description Image"}
                  modalComponent={<ImageFormModal projectId={projectId} />}
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
                    user &&
                    user.id === reward.ownerId && (
                      <OpenModalButton
                        buttonText={"Add an Image"}
                        modalComponent={<RewardImageFormModal rewardId={reward.id} />}
                      />
                    )
                  )}
                  <p>Price: ${reward.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid-container flex">
          <div className="info-section">
            <img className="info-icon" src={checkLogo} alt="Info Icon 1" />
            <p>Pledge Palooza connects creators with backers to fund projects.</p>
          </div>
          <div className="info-section">
            <img className="info-icon" src={chatLogo} alt="Info Icon 2" />
            <p>Rewards aren’t guaranteed, but creators must regularly update backers.</p>
          </div>
          <div className="info-section">
            <img className="info-icon" src={megaphoneLogo} alt="Info Icon 3" />
            <p>
              You’re only charged if the project meets its funding goal by the campaign deadline.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetails;
