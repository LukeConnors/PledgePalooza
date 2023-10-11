import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout, login } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import "./Navigation.css"

function ProfileButton({ user }) {
  const history = useHistory()
  const dispatch = useDispatch();
  const [results, setResults] = useState([])
  const [input, setInput] = useState("")
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const handleDemo = () => {
    const email = "demo@aa.io";
    const password = "password";
    dispatch(login(email, password));
    setShowMenu(false);
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    setShowMenu(false);
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <div>
      <div className="search-profile">
        <div className="search-div">
          <SearchBar setResults={setResults} input={input} setInput={setInput} />
          <div className="search-results">
            <SearchResults results={results} setResults={setResults} input={input} setInput={setInput} />
          </div>
        </div>
        <button className="icon" onClick={openMenu}>
          <i className="fas fa-user-circle" />
        </button>
      </div>
      <ul className={user ? ulClassName : `${ulClassName} no-user`} ref={ulRef}>
        {user ? (
          <>
            <li className="user-details">Hi, {user.username}!</li>
            <li className="user-details">{user.email}</li>
            <li className="user-details">
              <Link to='/my-projects'>
                View Projects
              </Link>
            </li>
            <li className="user-details">
              <Link to='/users/current/backed-projects'>
                View Backed Projects
              </Link>
            </li>
            <li className="list-btn">
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <>
            <div className="login-signup">
              <OpenModalButton
                buttonText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />

              <OpenModalButton
                buttonText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />

              <button onClick={handleDemo}>Demo User</button>
            </div>
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;
