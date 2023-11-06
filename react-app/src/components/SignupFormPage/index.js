import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import { CiMail, CiUser, CiLock } from "react-icons/ci";
import "./SignupForm.css";

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: ""
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  if (sessionUser) return <Redirect to="/" />;

  const validateEmail = (email) => {
    // Use a regular expression to validate the email
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};




    if (!formData.username) {
      formErrors.username = "Username is required"
    } else if (formData.username.length < 4) {
      formErrors.username = "Username must be at least 4 characters long"
    } else if (formData.username.length > 30) {
      formErrors.username = "Username must be less than 30 characters long"
    }

    if (!validateEmail(formData.email)) {
      formErrors.email = "Please provide a valid email address";
    }

    if (!formData.password) {
      formErrors.password = "Password is required"
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (formData.password === confirmPassword) {
      const data = await dispatch(signUp(formData.username, formData.email, formData.password));
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      formErrors.conPassword = "Confirm Password field must be the same as the Password field"
      setErrors(formErrors);
    }
  };

  return (
    <>
      <div className="signup-page-container">
        <form className="signup-page" onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          <div className="signup-form-page-email">
            <label htmlFor="email">Email:</label>
            <div className="errors">{errors.email}</div>
            <div className="signup-page-email">
              <CiMail className="signup-email-icon" />
              <input
                id="email"
                type="text"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ paddingLeft: "30px" + (formData.email ? " 20px" : "") }}
                className="signup-email-input"
              />
            </div>
          </div>
          <div className="signup-form-page-username">
            <label htmlFor="username">Username:</label>
            <div className="errors">{errors.username}</div>
            <div className="signup-page-username">
              <CiUser className="signup-username-icon" />
              <input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                style={{ paddingLeft: "30px" + (formData.email ? " 20px" : "") }}
                className="signup-username-input"
              />
            </div>
          </div>
          <div className="signup-form-page-password">
            <label htmlFor="password">Password:</label>
            <div className="errors">{errors.password}</div>
            <div className="signup-page-password">
              <CiLock className="signup-password-icon" />
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                style={{ paddingLeft: "30px" + (formData.email ? " 20px" : "") }}
                className="signup-password-input"
              />
            </div>
          </div>
          <div className="signup-form-page-confirm-password">
            <label htmlFor="confirm-password">Confirm Password:</label>
            <div className="errors">{errors.conPassword}</div>
            <div className="signup-page-confirm-password">
              <CiLock className="signup-confirm-password-icon" />
              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{ paddingLeft: "30px" + (formData.email ? " 20px" : "") }}
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
