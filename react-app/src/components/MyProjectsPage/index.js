import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function MyProjects(){
  const [projects, setProjects] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)


  useEffect(() => {
    fetch("/api/projects/my-projects")
        .then((res) => res.json())
        .then((data) => setProjects(data.my_projects));
        setIsLoaded(true);
  }, []);

  return (
    <>
    <h1>My Projects:</h1>
    {projects.map((project) =>
    <Link to={`/projects/${project.id}`} key={project.id}>
        <div className="my-project-card" key={project.id}>
            <img
            className="my-project-image"
            alt={`${project.name}`}
            src={project.bannerImg}
            >
            </img>
        </div>
    </Link>
    )}
    </>
  )

}

export default MyProjects
