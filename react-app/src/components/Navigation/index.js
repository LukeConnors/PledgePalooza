import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import logo from "../../assets/LOGO.png";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <>
      <div className="nav-bar">
        {sessionUser ? (
          <NavLink className="start-project" exact to="/new-project">
            Start a project
          </NavLink>
        ) : (
          <NavLink exact to="/login" className="start-project">
            Start a project
          </NavLink>
        )}
        <div className="logo">
          <NavLink className="logo" exact to="/">
            <img alt="pledge palooza" src={logo}></img>
          </NavLink>
        </div>
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
      <div className="cat-bar">
        <div className="cat-contents">
        <NavLink exact to="/projects/category/1">
          Board Games
        </NavLink>
        <NavLink exact to="/projects/category/2">
          Video Games
        </NavLink>
        <NavLink exact to="/projects/category/3">
          Technology
        </NavLink>
        <NavLink exact to="/projects/category/4">
          Retail
        </NavLink>
        <NavLink exact to="/projects/category/5">
          Cooking
        </NavLink>
        </div>
      </div>
    </>
  );
}

export default Navigation;
