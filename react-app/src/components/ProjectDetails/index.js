import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import chatLogo from "../../assets/chat.png";
import checkLogo from "../../assets/check.png";
import megaphoneLogo from "../../assets/megaphone.png";
import "./ProjectDetails.css";
import OpenModalButton from "../OpenModalButton";
import ImageFormModal from "../DesImageFormModal";
import BackProjectModal from "../BackProjectModal";
import { userSelector } from "../../store/session";

import RewardImageFormModal from "../RewardImageModal";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AddRewardModal from "../AddRewardModal";

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
        <p>{project.category}</p>

        <div className="project-main-content">
          <img className="project-banner" src={project.bannerImg} alt={project.name} />
          <div className="stats-and-rewards">
            <div className="project-stats">
              <div>${pledgedAmount} pledged</div>
              <div>{backerCount} backers</div>
              <div>{daysLeft} days left</div>
              {user ? (
                user.id === project.ownerId ? (
                  <OpenModalButton
                    buttonText={"Add a Description Image"}
                    modalComponent={<ImageFormModal projectId={projectId} />}
                  />
                ) : (
                  <OpenModalButton
                    buttonText={"Back this project"}
                    modalComponent={<BackProjectModal projectId={projectId} />}
                  />
                )
              ) : (
                <button className="back-this-project">
                  <Link to="/login">back this project</Link>
                </button>
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
                    <></>
                  )}
                  {user?.id === project.ownerId && !rewardImages[reward.id] ? (
                    <OpenModalButton
                      buttonText={"Add an Image"}
                      modalComponent={<RewardImageFormModal rewardId={reward.id} />}
                    />
                  ) : (
                    <></>
                  )}
                  <p>Price: ${reward.price}</p>
                </div>
              ))}

              <>
                {user && user.id === project.ownerId && rewards.length === 0 && (
                  <>
                    <p>
                      No rewards created for this project yet! Click the button below to add one.
                    </p>
                  </>
                )}
              </>

              <div className="modal-button">
                {rewards.length < 4 ? (
                  <OpenModalButton
                    buttonText={"Add a Reward"}
                    modalComponent={<AddRewardModal projectId={project.id} />}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid-container flex">
          <div className="flex-column flex-row-md">
            <img className="info-icon" src={checkLogo} alt="Info Icon 1" />
            <p>Pledge Palooza connects creators with backers to fund projects.</p>
          </div>
          <div className="flex-column flex-row-md">
            <img className="info-icon" src={chatLogo} alt="Info Icon 2" />
            <p>Rewards aren’t guaranteed, but creators must regularly update backers.</p>
          </div>
          <div className="flex-column flex-row-md">
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
