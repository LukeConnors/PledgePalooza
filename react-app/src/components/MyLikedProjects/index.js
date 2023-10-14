import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loadMyLikes } from "../../store/likes";
import "./MyLikedProjects.css"

function MyLikedProjects() {
    const [likedProjects, setLikedProjects] = useState([]);
    const history = useHistory()
    const user = useSelector((state) => state.session.user)
    const likes =  useSelector(state => Object.values(state.like))
    console.log(likes);
    const dispatch = useDispatch()
    if(!user){
        history.push("/");
    }

    useEffect(() => {
        dispatch(loadMyLikes()).then(likedProjectsDetails => {
            setLikedProjects(likedProjectsDetails || []);
        })
    }, [user, dispatch]);
    console.log(likedProjects);


    return (
        <>
          <h1 className="my-liked-project-title">My Liked Projects:</h1>
          <div className="my-liked-project-box">
            {likedProjects.map((project) => (
              <>
                <div className="my-liked-project-card">
                  <Link to={`/projects/${project.id}`} key={project.id}>
                    <div key={project.id}>
                      <img
                        className="my-liked-project-image"
                        alt={`${project.name}`}
                        src={project.bannerImg}
                      ></img>
                      <div className="my-liked-name-holder">
                        <h2 className="my-liked-project-name" key={project.id}>
                          {project.name}
                        </h2>
                      </div>
                    </div>
                  </Link>
                </div>
              </>
            ))}
          </div>
        </>
      );
 }


export default MyLikedProjects;