import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
		email: "",
		username: "",
		password: ""
	});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const validateEmail = (email) => {
		// Use a regular expression to validate the email
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formErrors = {};


    if(formData.username < 4){
      formErrors.username = "Username must be at least 4 characters long"
		}

    if(!formData.username){
      formErrors.username = "Username is required"
    }

    if(formData.username > 30){
      formErrors.username = "Username must be less than 30 characters long"
    }

    if(!validateEmail(formData.email)){
			formErrors.email = "Please provide a valid email address";
		}

    if(!formData.password){
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
      <div className="sign-form-container">
        <form onSubmit={handleSubmit} className="sign-form-page">
          <h1>Sign Up</h1>
          <div className="sign-form-amount">
            <label>
              Email
              <div className="errors">{errors.email}</div>
              <input
                type="text"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="sign-email-input"
              />
            </label>
            <label>
              Username
              <div className="errors">{errors.username}</div>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="sign-user-input"
              />
            </label>
            <label>
              Password
              <div className="errors">{errors.password}</div>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="sign-pass-input"
              />
            </label>
            <label>
              Confirm Password
              <div className="errors">{errors.conPassword}</div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="sign-conf-input"
              />
            </label>
          </div>
          <button className="sign-submit" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default SignupFormModal;
