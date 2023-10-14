import React, { useState, useEffect } from "react";
import "./projects.css";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createLike } from "../../store/likes";
import { deleteLike } from "../../store/likes";
import { loadMyLikes } from "../../store/likes";
import thumbsUp from "../../assets/thumbs-up-icon.png"

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null)
  const user = useSelector((state) => state.session.user)
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const [likedProjects, setLikedProjects] = useState([]);

  const handleLikeClick = async (projectId, e) => {
    e.preventDefault();
    console.log('projectId:', projectId)
    if (likedProjects?.includes(projectId)) {
      dispatch(deleteLike(null, projectId));  
      setLikedProjects(likedProjects?.filter(id => id !== projectId));
    } else {
      const like = {
        userId: user.id,
        projectId: projectId
      };
      dispatch(createLike(like, projectId));
      setLikedProjects([...likedProjects, projectId]);
    }
  };

  useEffect(() => {
    fetch("/api/projects/")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.project);
        setIsLoaded(true);
      });

  
    if (user) {
      dispatch(loadMyLikes()).then(likes => {
        setLikedProjects(likes || []);
      });
    }
  }, [user, dispatch]);

  let pledged = 0;
  let backers = 0;
  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];

    for (let j = 0; j < project?.cost?.length; j++) {
      let cost = project?.cost[j];
      if (parseInt(cost !== 0 && cost)) {
        pledged += parseInt(cost);
      }
    }
  }

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i];
    backers = backers + parseInt(project.backers.length);
  }
  console.log(backers);

  return (
    <>
      <div className="home-hero-main-text">
        <h1 className="home-title">Bring a creative project to life.</h1>
        <p className="home-sub-text">ON PLEDGE PALOOZA:</p>
      </div>
      <div className="home-hero-card">
        <div className="hero-card-1">
          <p className="hero-card-main-text">{projects?.length}</p>
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
        {isLoaded ? (
          <div>
            {projects.map((project, index) =>
              index % 2 === 0 ? (
                <Link to={`/projects/${project.id}`}
                 key={project.id}
                 onMouseEnter={() => setHoveredProject(project.id)} 
                 onMouseLeave={() => setHoveredProject(null)}
                  >
                  <div className="project-card" key={project.id}>
                      <div className="main-project-image">
                      <img
                        className="project-banner"
                        alt={`${project.name}`}
                        src={project.bannerImg}
                      ></img>
                      {hoveredProject === project.id && user && ( 
                        console.log(thumbsUp),
                     <img
                     className={`like-icon ${likedProjects?.includes(project.id) ? 'liked' : ''}`}
                     src={thumbsUp}
                     alt="thumbs up icon"
                     onClick={(e) => handleLikeClick(project.id, e)}
                      />
                    )}
                  </div>
                    <div className="home-project-details">
                      <h1 key={project.id}>{project.name}</h1>
                      <p>{project.description}</p>
                      <p>By: {project.ownerName}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link 
                  to={`/projects/${project.id}`} 
                  key={project.id} 
                  onMouseEnter={() => setHoveredProject(project.id)} 
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className="project-card" key={project.id}>
                    <div className="home-project-details">
                      <h1 key={project.id}>{project.name}</h1>
                      <p>{project.description}</p>
                      <p>By: {project.ownerName}</p>
                    </div>
                    <div className="main-project-image">
                      <img
                        className="project-banner"
                        alt={`${project.name}`}
                        src={project.bannerImg}
                      ></img>
                      {hoveredProject === project.id && user && ( 
                        <img
                        className={`like-icon ${likedProjects.includes(project.id) ? 'liked' : ''}`}
                          src={thumbsUp}
                          alt="thumbs up icon"
                          onClick={(e) => handleLikeClick(project.id, e)}
                        />
                      )}
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
}

export default Projects;
