import React, { useState, useEffect } from "react";
import "./projects.css";
import { Link } from "react-router-dom";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/projects/")
      .then((res) => res.json())
      .then((data) => setProjects(data.project));
    setIsLoaded(true);
  }, []);
  console.log(projects);
  return (
    <>
      <div className="home-hero-main-text">
        <h1 className="home-title">Bring a creative project to life.</h1>
        <p className="home-sub-text">ON PLEDGE PALOOZA:</p>
      </div>
      <div className="home-hero-card">
        <div className="hero-card-1">
          <p className="hero-card-main-text">1,000</p>
          <p className="hero-card-sub-text">projects funded</p>
        </div>
        <div className="hero-card-2">
          <p className="hero-card-main-text">$1,000,000</p>
          <p className="hero-card-sub-text">towards creative work</p>
        </div>
        <div className="hero-card-3">
          <p className="hero-card-main-text">100,000</p>
          <p className="hero-card-sub-text">pledges</p>
        </div>
      </div>
      <div>
        <h2 className="feat-projects">Featured Projects:</h2>
        {isLoaded ? (
          <div>
            {projects.map((project, index) =>
              index % 2 === 0 ? (
                <Link to={`/projects/${project.id}`}>
                  <div className="project-card" key={project.id}>
                    <div>
                      <img
                        className="main-project-image"
                        alt={`${project.name}`}
                        src={project.bannerImg}
                      ></img>
                    </div>
                    <div className="home-project-details">
                      <h1 key={project.id}>{project.name}</h1>
                      <p>{project.description}</p>
                      <p>By: {project.ownerName}</p>
                    </div>
                  </div>
                </Link>
              ) : (
                <Link to={`/projects/${project.id}`}>
                  <div className="project-card" key={project.id}>
                    <div className="home-project-details">
                      <h1 key={project.id}>{project.name}</h1>
                      <p>{project.description}</p>
                      <p>By: {project.ownerName}</p>
                    </div>
                    <div>
                      <img
                        className="main-project-image"
                        alt={`${project.name}`}
                        src={project.bannerImg}
                      ></img>
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