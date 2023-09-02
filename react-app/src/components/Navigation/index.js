import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  return (
    <>
      <div className="nav-bar">
        <NavLink to="/">Start a project</NavLink>
        <NavLink exact to="/">
          Pledge Palooza
        </NavLink>
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </>
  );
}

export default Navigation;
