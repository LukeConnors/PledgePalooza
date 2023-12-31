import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBackedProjects } from "../../store/backed-projects";
import "./MyBackedProjects.css";

function MyBackedProjects() {
  // const [backedProjects, setBackedProjects] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const backedProjects = useSelector(state => state.backedProjects.backedProjects)

  useEffect(() => {
    dispatch(fetchBackedProjects())
        .then(() => setIsLoaded(true)) // If using redux-thunk with promise, set isLoaded to true when promise resolves
        .catch((error) => {
            console.error("Error fetching data:", error);
            setIsLoaded(true);
        });
}, [dispatch]);

  // Check if backedProjects is empty or undefined
  if (!isLoaded || backedProjects.length === 0) {
    return (
      <div className="no-projects">
        <p>No projects backed! Explore through the projects and discover new ones.</p>
      </div>
    );
  }


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
