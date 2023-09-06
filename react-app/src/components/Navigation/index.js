import React from "react";
import { NavLink, Redirect } from "react-router-dom";
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
          <NavLink className="start-project" exact to="/login">
            Start a project
          </NavLink>
        )}
        <NavLink className="logo" exact to="/">
          <img alt="pledge palooza" src={logo}></img>
        </NavLink>
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </>
  );
}

export default Navigation;
