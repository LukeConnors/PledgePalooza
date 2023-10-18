import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";
import { CiMail, CiLock } from "react-icons/ci";
import { Link } from "react-router-dom/cjs/react-router-dom";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };
  const handleDemo = () => {
    const email = "demo@aa.io";
    const password = "password";
    dispatch(login(email, password));
  };

  return (
    <>
      <div className="login-form-page-container">
        <form onSubmit={handleSubmit} className="login-form-page">
          <h1>Log In</h1>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="login-form-page-email">
            <label htmlFor="email">Email:</label>
            <div className="login-page-email">
              <CiMail className="email-icon" />
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                placeholder="Email"
                required
                style={{ paddingLeft: "30px" + (email ? " 20px" : "") }}
                className="email-input"
              />
            </div>
          </div>
          <div className="login-form-page-password">
            <div className="login-page-password">
              <label htmlFor="password">Password:</label>
              <CiLock className="lock-icon" />
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                style={{ paddingLeft: "30px" + (password ? " 20px" : "") }}
                className="password-input"
              />
            </div>
          </div>
          <p className="signup-here-btn">
            Don't have an account? Sign up <Link to="/signup">here</Link>!
          </p>
          <button className="login-form-page-btn" type="submit">
            Log In
          </button>
          <button className="login-form-page-btn" onClick={handleDemo}>
            Demo User
          </button>
        </form>
      </div>
    </>
  );
}

export default LoginFormPage;
