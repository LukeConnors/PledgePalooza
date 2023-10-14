import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { loadMyLikes } from "../../store/likes";
import { deleteLike } from "../../store/likes";
import "./MyLikedProjects.css";
import thumbsUp from "../../assets/thumbs-up-icon.png"

function MyLikedProjects() {
    const [likedProjects, setLikedProjects] = useState([]);
    const history = useHistory()
    const user = useSelector((state) => state.session.user)
    const likes =  useSelector(state => Object.values(state.like))
    const dispatch = useDispatch()
    if(!user){
        history.push("/");
    }

    const handleLikeClick = async (projectId, e) => {
        e.preventDefault();
        console.log('projectId:', projectId)
          dispatch(deleteLike(null, projectId));  
          setLikedProjects(likedProjects?.filter(id => id !== projectId));
        }

    useEffect(() => {
        dispatch(loadMyLikes()).then(likedProjectsDetails => {
            setLikedProjects(likedProjectsDetails || []);
        })
    }, [user, dispatch, likedProjects]);
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
                      <img
                        className="my-like-logo" 
                          src={thumbsUp}
                          alt="thumbs up icon"
                          onClick={(e) => handleLikeClick(project.id, e)}
                        />
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