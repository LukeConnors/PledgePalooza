import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './MyBackedProjects.css'

function MyBackedProjects(){
    const [projects, setProjects] = useState([])
    const [backedProjects, setBackedProjects] = useState([])
    const [rewards, setRewards] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        fetch("/api/users/current/backed-projects")
            .then((res) => res.json())
            .then((data) => setBackedProjects(data.backed_projects))
            setIsLoaded(true)
    }, [])

    return (
        <>
        <h1 className="back-project-title">Backed Projects:</h1>
        <div className="back-project-box">
            {backedProjects.map((back) =>
            <>
            <Link to={`/projects/${back.projectId}`} key={back.id}>
                <div className="back-project-card" key={back.id}>
                    <img
                    className="back-project-image"
                    alt={`${back.projectName}`}
                    src={back.projectImg}
                    >
                    </img>
                    <div className="back-name-holder">
                    <h2 className="back-project-name" key={back.id}>{back.projectName}</h2>
                    </div>
                    <div className="amount-div">
                    <h4>Amount Contributed: {back.cost}</h4>
                    </div>
                    <div className="reward-div">
                    <h4>Reward: {back.rewardName}</h4>
                    </div>
                </div>
            </Link>
            </>
            )}
        </div>
    </>
    )

}

export default MyBackedProjects
