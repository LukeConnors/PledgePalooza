import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MyBackedProjects.css";

function MyBackedProjects() {
  const [backedProjects, setBackedProjects] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/users/current/backed-projects")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.backed_projects) {
          setBackedProjects(data.backed_projects);
        }
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoaded(true);
      });
  }, []);

  // Check if backedProjects is empty or undefined
  if (!isLoaded || backedProjects.length === 0) {
    return (
      <div className="no-projects">
        <p>No projects backed! Explore through the projects and discover new ones.</p>
      </div>
    );
  }

  console.log(backedProjects)

  return (
    <>
      <h1 className="back-project-title">Backed Projects:</h1>
      <div className="back-project-box">
        {backedProjects.map((back) => (
          <Link to={`/projects/${back.projectId}`} key={back.id}>
            <div className="back-project-card" key={back.id}>
              <img
                className="back-project-image"
                alt={`${back.projectName}`}
                src={back.projectImg}
              />
              <div className="back-name-holder">
                <h2 className="back-project-name" key={back.id}>
                  {back.projectName}
                </h2>
              </div>
              <div className="amount-div">
                <h4>Amount Contributed: ${back.cost}</h4>
              </div>
              <div className="reward-div">
                <h4>Reward: {back.rewardName ? back.rewardName : "None"}</h4>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}

export default MyBackedProjects;
