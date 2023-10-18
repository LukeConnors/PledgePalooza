import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { CiMail, CiLock } from "react-icons/ci";
import { Link } from "react-router-dom/cjs/react-router-dom";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  const handleClose = () => {
    closeModal();
  };

  const handleDemo = () => {
    const email = "demo@aa.io";
    const password = "password";
    dispatch(login(email, password));
    closeModal();
  };

  return (
    <>
      <div className="modal-login-form-page-container">
        <form onSubmit={handleSubmit} className="modal-login-form-page">
          <h1>Log In</h1>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="modal-login-form-page-email">
            <label htmlFor="email">Email:</label>
            <div className="modal-login-page-email">
              <CiMail className="modal-email-icon" />
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                placeholder="Email"
                style={{ paddingLeft: "30px" + (email ? " 20px" : "") }}
                className="modal-email-input"
              />
            </div>
          </div>
          <div className="modal-login-form-page-password">
            <div className="modal-login-page-password">
              <label htmlFor="password">Password:</label>
              <CiLock className="modal-signup-lock-icon" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={{ paddingLeft: "30px" + (password ? " 20px" : "") }}
                className="modal-password-input"
              />
            </div>
          </div>
          <p className="modal-signup-here-btn">
            Don't have an account? Sign up{" "}
            <Link to="/signup" onClick={handleClose}>
              here
            </Link>
            !
          </p>
          <button className="modal-login-form-page-btn" type="submit">
            Log In
          </button>
          <button className="modal-login-form-page-btn" onClick={handleDemo}>
            Demo User
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginFormModal;
