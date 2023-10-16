import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteProjectModal from "../DeleteProjectModal";
import "./MyProjects.css";
import { useDispatch, useSelector } from "react-redux";
import * as projectActions from "../../store/projects"

function MyProjects() {
  const history = useHistory();
  const projects = useSelector((state) => state.projects.userProjects);
  const projectIds = Object.keys(projects || {});
  const dispatch = useDispatch()


  useEffect(() => {
 dispatch(projectActions.getUserProjects())
  }, [dispatch]);


  if (projects) {
    return (
      <>
        <h1 className="my-project-title">My Projects:</h1>
        <div className="my-project-box">
          {projectIds.map((projectId) => {
            const project = projects[projectId]
          return(
            <>
              <div className="my-project-card">
                <Link to={`/projects/${project.id}`} key={project.id}>
                  <div key={project.id}>
                    <img
                      className="my-project-image"
                      alt={`${project.name}`}
                      src={project.bannerImg}
                    ></img>
                    <div className="name-holder">
                      <h2 className="my-project-name" key={project.id}>
                        {project.name}
                      </h2>
                    </div>
                  </div>
                </Link>
                <div className="view-project-btn">
                  <button
                    onClick={() => {
                      history.push(`/edit-project/${project.id}`);
                    }}
                  >
                    Edit Project
                  </button>
                  <OpenModalButton
                    buttonText={"Delete this project"}
                    modalComponent={<DeleteProjectModal projectId={project.id} />}
                  />
                </div>
              </div>
            </>
          )})}
        </div>
      </>
    );

  } else {
    return(
      <>
      <h1>
        Loading...
      </h1>
      </>
    )
  }
}

export default MyProjects;
