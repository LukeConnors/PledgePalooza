import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function ProjectsByCategory() {
  const [projects, setProjects] = useState([]);
  const [catProjects, setCatProjects] = useState([])
  const [isLoaded, setIsLoaded] = useState(false);
  const { categoryId } = useParams();



  useEffect(() => {
    fetch(`/api/projects/`)
    .then((res) => res.json())
    .then((data) => setProjects(data.projects));
  }, [categoryId]);

  useEffect(() => {
    fetch(`/api/projects/category/${categoryId}`)
    .then((res) => res.json())
    .then((data) => setCatProjects(data.projects));
    setIsLoaded(true);
  }, [categoryId]);

  console.log(catProjects)


  if (catProjects) {
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
              {catProjects.map((project, index) =>
                index % 2 === 0 ? (
                  <Link to={`/projects/${project.id}`} key={project.id}>
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
                  <Link to={`/projects/${project.id}`} key={project.id}>
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
  } else {
    return (
      <>
      <h1>Loading...</h1>
      </>
    )
  }
}

export default ProjectsByCategory;
