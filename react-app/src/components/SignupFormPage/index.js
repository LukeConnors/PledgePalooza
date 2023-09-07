import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import { CiMail, CiUser, CiLock } from "react-icons/ci";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(["Confirm Password field must be the same as the Password field"]);
    }
  };

  return (
    <>
      <div className="signup-page-container">
        <form className="signup-page" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="signup-form-page-email">
            <label htmlFor="email">Email:</label>
            <div className="signup-page-email">
              <CiMail className="signup-email-icon" />
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ paddingLeft: "30px" + (email ? " 20px" : "") }}
                className="signup-email-input"
              />
            </div>
          </div>
          <div className="signup-form-page-username">
            <label htmlFor="username">Username:</label>
            <div className="signup-page-username">
              <CiUser className="signup-username-icon" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ paddingLeft: "30px" + (email ? " 20px" : "") }}
                className="signup-username-input"
              />
            </div>
          </div>
          <div className="signup-form-page-password">
            <label htmlFor="password">Password:</label>
            <div className="signup-page-password">
              <CiLock className="signup-password-icon" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ paddingLeft: "30px" + (email ? " 20px" : "") }}
                className="signup-password-input"
              />
            </div>
          </div>
          <div className="signup-form-page-confirm-password">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <div className="signup-page-confirm-password">
              <CiLock className="signup-confirm-password-icon" />
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{ paddingLeft: "30px" + (email ? " 20px" : "") }}
                className="signup-confirm-password-input"
              />
            </div>
          </div>
          <p className="login-here">
            Already have an account? Log in <Link to="/login"> here</Link>
          </p>
          <button className="signup-form-page-btn" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupFormPage;
