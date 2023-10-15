import React, { useState, useEffect } from "react";
import "./projects.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as projectActions from "../../store/projects";

function Projects() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);
  const projectIds = Object.keys(projects || {});

  useEffect(() => {
    dispatch(projectActions.getProjects());
  }, [dispatch]);

  console.log("PROJECTSSSS ID", projects);

  console.log(projects)
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
          {projectIds.map((projectId, index) => {
            const project = projects[projectId];

            return index % 2 === 0 ? (
              <Link to={`/projects/${project?.id}`} key={project?.id}>
                <div className="project-card" key={project?.id}>
                  <div>
                    <img
                      className="main-project-image"
                      alt={`${project?.name}`}
                      src={project?.bannerImg}
                    ></img>
                  </div>
                  <div className="home-project-details">
                    <h1 key={project?.id}>{project?.name}</h1>
                    <p>{project?.description}</p>
                    <p>By: {project?.ownerName}</p>
                  </div>
                </div>
              </Link>
            ) : (
              <Link to={`/projects/${project?.id}`} key={project?.id}>
                <div className="project-card" key={project?.id}>
                  <div className="home-project-details">
                    <h1 key={project?.id}>{project?.name}</h1>
                    <p>{project?.description}</p>
                    <p>By: {project?.ownerName}</p>
                  </div>
                  <div>
                    <img
                      className="main-project-image"
                      alt={`${project?.name}`}
                      src={project?.bannerImg}
                    ></img>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Projects;
