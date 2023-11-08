import React, { useState, useEffect } from "react";
import "./projects.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as projectActions from "../../store/projects";
import { createLike } from "../../store/likes";
import { deleteLike } from "../../store/likes";
import { loadMyLikes } from "../../store/likes";
import { loadProjectLikeStatus } from "../../store/likes";
import thumbsUp from "../../assets/thumbs-up-icon.png";
import Footer from "../Footer";

function Projects() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const projectIds = Object.keys(projects || {});
  const likes = useSelector((state) => state.likes);
  const [likedProjects, setLikedProjects] = useState([]);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(projectActions.getProjects());

    if (user) {
      dispatch(loadMyLikes())
        .then((likedProjectDetails) => {
          if (likedProjectDetails) {
            // Extract project IDs and filter out any potential undefined values
            const likedProjectIds = likedProjectDetails
              .map((detail) => detail.projectId)
              .filter(Boolean);
            setLikedProjects(likedProjectIds);
          }
        })
        .catch((error) => {
          console.error("Failed to load likes:", error);
        });
    }
  }, [dispatch, user]);

  const handleMouseEnter = (projectId) => {
    if (!likes.hasOwnProperty(projectId)) {
      dispatch(loadProjectLikeStatus(projectId));
    }
    setHoveredProject(projectId);
  };

  const handleLikeClick = async (projectId, e) => {
    e.preventDefault();
    e.stopPropagation();

    const project = projects[projectId];
    if (user.id === project.ownerId) {
      setErrorMessages((prev) => ({ ...prev, [projectId]: "You cannot like your own project!" }));
      return;
    }

    setErrorMessages((prev) => ({ ...prev, [projectId]: "" }));

    // Check if the project is already liked to determine action
    if (likes[projectId]) {
      await dispatch(deleteLike(likes[projectId].likeId, projectId));
    } else {
      const like = {
        userId: user.id,
        projectId: projectId,
      };
      await dispatch(createLike(like, projectId));
    }

    // Additionally, ensure to refresh the liked status after updating
    dispatch(loadProjectLikeStatus(projectId));
  };

  let pledged = 0;
  let backers = 0;

  // Assuming projects is an object with project objects as properties
  for (const projectId in projects) {
    if (projects.hasOwnProperty(projectId)) {
      const project = projects[projectId];

      // Check if project has a 'cost' property and it's an array
      if (project?.cost && Array.isArray(project?.cost)) {
        for (let j = 0; j < project?.cost.length; j++) {
          let cost = project?.cost[j];
          if (parseInt(cost) !== 0 && !isNaN(parseInt(cost))) {
            pledged += parseInt(cost);
          }
        }
      }

      // Check if project has a 'backers' property
      if (project?.backers) {
        backers += parseInt(project?.backers.length);
      }
    }
  }

  return (
    <>
      <div className="home-hero-main-text">
        <h1 className="home-title">Bring a creative project to life.</h1>
        <p className="home-sub-text">ON PLEDGE PALOOZA:</p>
      </div>
      <div className="home-hero-card">
        <div className="hero-card-1">
          <p className="hero-card-main-text">{Object.keys(projects).length}</p>
          <p className="hero-card-sub-text">projects funded</p>
        </div>
        <div className="hero-card-2">
          <p className="hero-card-main-text">${pledged}</p>
          <p className="hero-card-sub-text">towards creative work</p>
        </div>
        <div className="hero-card-3">
          <p className="hero-card-main-text">{backers}</p>
          <p className="hero-card-sub-text">pledges</p>
        </div>
      </div>
      <div>
        <h2 className="feat-projects">Featured Projects:</h2>

        <div>
          {projectIds?.map((projectId, index) => {
            const project = projects[projectId];
            const isLiked = likes[projectId];

            return index % 2 === 0 ? (
              <Link
                to={`/projects/${project?.id}`}
                key={project?.id}
                onMouseEnter={() => handleMouseEnter(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="project-card" key={project?.id}>
                  <div className="main-project-image">
                    <img
                      className="project-banner"
                      alt={`${project.name}`}
                      src={project.bannerImg}
                    ></img>
                    {hoveredProject === project.id && user && (
                      <img
                        className={`like-icon ${isLiked ? "liked" : ""}`}
                        src={thumbsUp}
                        alt="thumbs up icon"
                        onClick={(e) => handleLikeClick(project.id, e)}
                      />
                    )}
                  </div>
                  <div className="home-project-details">
                    {errorMessages[projectId] && (
                      <div className="liked-project-error-message">{errorMessages[projectId]}</div>
                    )}
                    <h1 key={project?.id}>{project?.name}</h1>
                    <p>{project?.description}</p>
                    <p>By: {project?.ownerName}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <Link
                to={`/projects/${project?.id}`}
                key={project?.id}
                onMouseEnter={() => handleMouseEnter(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="project-card" key={project?.id}>
                  <div className="home-project-details">
                    {errorMessages[projectId] && (
                      <div className="liked-project-error-message">{errorMessages[projectId]}</div>
                    )}
                    <h1 key={project?.id}>{project?.name}</h1>
                    <p>{project?.description}</p>
                    <p>By: {project?.ownerName}</p>
                  </div>
                  <div className="main-project-image">
                    <img
                      className="project-banner"
                      alt={`${project.name}`}
                      src={project.bannerImg}
                    ></img>
                    {hoveredProject === project.id && user && (
                      <img
                        className={`like-icon ${isLiked ? "liked" : ""}`}
                        src={thumbsUp}
                        alt="thumbs up icon"
                        onClick={(e) => handleLikeClick(project.id, e)}
                      />
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Projects;
