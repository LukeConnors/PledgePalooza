import React, { useState, useEffect, useRef } from "react";
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
import { BiCategory, BiSolidMap } from "react-icons/bi";

import RewardImageFormModal from "../RewardImageModal";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import AddRewardModal from "../AddRewardModal";
import DeleteRewardModal from "../DeleteRewardModal";
import EditRewardModal from "../EditRewardModal";

function ProjectDetails() {
  const [project, setProject] = useState({});
  const [backedProjects, setBackedProjects] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [rewardImages, setRewardImages] = useState({});
  const { projectId } = useParams();
  const user = useSelector(userSelector);

  const [pledgedAmount, setPledgedAmount] = useState(Math.floor(Math.random() * 10000));
  const [backerCount, setBackerCount] = useState(Math.floor(Math.random() * 5000));
  const [daysLeft, setDaysLeft] = useState(Math.floor(Math.random() * 65));
  const [descriptionImages, setDescriptionImages] = useState([]);
  const slidesReference = useRef(null);
  const dotsReference = useRef(null);

  let slideIndex = 1;


  useEffect(() => {
    showSlides(slideIndex);
  }, [descriptionImages, slideIndex]);

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
          setRewardImages((prevRewardImages) => ({
            ...prevRewardImages,
            [reward.id]: data.image[0],
          }));
        })
        .catch((error) => {
          console.error(`Error fetching reward images for reward ${reward.id}`, error);
        });
    });
  }, [rewards]);

  useEffect(() => {
    fetch("/api/users/current/backed-projects")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.backed_projects) {
          setBackedProjects(data.backed_projects);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [projectId]);


  useEffect(() => {
    const fetchDescriptionImages = async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}/des-images`);
        const data = await res.json();
        setDescriptionImages(data);
      } catch (err) {
        console.error("Error fetching description images:", err);
      }
    };
    fetchDescriptionImages();
  }, [projectId]);

  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  function showSlides(n) {
    let slides = slidesReference.current
      ? slidesReference.current.getElementsByClassName("mySlides")
      : [];
    let dots = dotsReference.current ? dotsReference.current.getElementsByClassName("dot") : [];
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    if (slides[slideIndex - 1]) {
      slides[slideIndex - 1].style.display = "block";
    }
    if (dots[slideIndex - 1]) {
      dots[slideIndex - 1].className += " active";
    }
  }

  let renderComponent = null;

  if (!user) {
    // User is not logged in
    renderComponent = (
      <button className="back-this-project">
        <Link to="/login">Back this project</Link>
      </button>
    );
  } else if (user.id === project.ownerId) {
    // User is the owner of the project
    renderComponent = (
      <OpenModalButton
        buttonText={"Add a Description Image"}
        modalComponent={<ImageFormModal projectId={projectId} />}
      />
    );
    // Hide the "Back this project" button for project owner
  } else if (
    backedProjects.some(
      (backedProject) => backedProject.userId === user.id && backedProject.projectId === project.id
    )
  ) {
    renderComponent = <></>;
  } else {
    // User can back the project
    renderComponent = (
      <OpenModalButton
        buttonText={"Back this project"}
        modalComponent={<BackProjectModal projectId={projectId} />}
      />
    );
  }
  let pledged = project?.cost?.reduce((x, y) => x + y)

  const existingEndDate = project.endDate
  ? new Date(project.endDate).toISOString().split("T")[0]
  : "";

function calculateDaysLeft(targetDate) {
  // Create Date objects for the target date and current date
  const currentDate = new Date();
  const targetDateObj = new Date(targetDate);

  // Calculate the time difference in milliseconds
  const timeDifference = targetDateObj - currentDate;

  // Convert milliseconds to days
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysLeft;
}

const daysLeftNew = calculateDaysLeft(existingEndDate);



  rewards.sort((a, b) => a.price - b.price);
  // console.log(rewards);
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
              <div>${pledged}</div>
              <div>pledged</div>
              <div>{project?.backers?.length}</div>
              <div>{project?.backers?.length <= 1 ? "backer" : "backers"}</div>
              <div>{daysLeftNew}</div>
              <div>days left</div>
              {renderComponent}
            </div>
          </div>  
        </div>
        <div className="project-cat">
          <p>
            <BiCategory />
            {project.category}
          </p>
          <p>
            <BiSolidMap />
            {project.location}
          </p>
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

        <div className="content-row">
          <div className="description-images-container">
            <div className="slideshow-container" ref={slidesReference}>
              {descriptionImages.map((image, index) => (
                <div key={image.id} className="mySlides fade">
                  <div className="numbertext">
                    {index + 1} / {descriptionImages.length}
                  </div>
                  <img src={image.url} style={{ width: "100%" }} alt={`Description ${index + 1}`} />
                  <div className="text">Caption for Image {index + 1}</div>
                </div>
              ))}

              {/* Next and previous buttons */}
              <a className="prev" onClick={() => plusSlides(-1)}>
                &#10094;
              </a>
              <a className="next" onClick={() => plusSlides(1)}>
                &#10095;
              </a>
            </div>

            <div style={{ textAlign: "center" }} ref={dotsReference}>
              {descriptionImages.map((_, index) => (
                <span key={index} className="dot" onClick={() => currentSlide(index + 1)}></span>
              ))}
            </div>
            <p>{project.summary}</p>
          </div>
          <div className="reward-list">
            {rewards.map((reward) => (
              <div key={reward.id} className="reward-tile">
                {rewardImages[reward.id] ? (
                  <>
                  <img
                    className="reward-img"
                    src={rewardImages[reward.id].url}
                    alt={`Reward for ${reward.name}`}
                  />
                    <OpenModalButton
                    buttonText={"Delete Reward"}
                    modalComponent={<DeleteRewardModal projectId={project.id} rewardId={reward.id}/>}
                     />
                     <OpenModalButton
                     buttonText={"Edit Reward"}
                     modalComponent={<EditRewardModal projectId={project.id} reward={reward} />}
                     />
                  </>
                ) : (
                  user &&
                  user.id === project.ownerId && (
                    <>
                    <OpenModalButton
                      buttonText={"Add an Image"}
                      modalComponent={<RewardImageFormModal rewardId={reward.id} />}
                    />
                    <OpenModalButton
                    buttonText={"Delete Reward"}
                    modalComponent={<DeleteRewardModal projectId={project.id} rewardId={reward.id}/>}
                     />
                     <OpenModalButton
                     buttonText={"Edit Reward"}
                     modalComponent={<EditRewardModal projectId={project.id} reward={reward} />}
                     />
                     </>
                  )
                )}
                <h3>{reward.name}</h3>
                <p>{reward.description}</p>
                <p>Price: ${reward.price}</p>
              </div>
            ))}
            <>
              {user && user.id === project.ownerId && rewards.length === 0 && (
                <>
                  <p>No rewards created for this project yet! Click the button below to add one.</p>
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
    </div>
  );
}

export default ProjectDetails;
