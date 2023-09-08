import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import OpenModalButton from "../OpenModalButton";
import DeleteProjectModal from "../DeleteProjectModal";
import "./MyProjects.css";

function MyProjects() {
  const history = useHistory();
  const [projects, setProjects] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/projects/my-projects")
      .then((res) => res.json())
      .then((data) => setProjects(data.my_projects));
    setIsLoaded(true);
  }, []);

  return (
    <>
      <h1 className="my-project-title">My Projects:</h1>
      <div className="my-project-box">
        {projects.map((project) => (
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
              <div>
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
        ))}
      </div>
    </>
  );
}

export default MyProjects;
