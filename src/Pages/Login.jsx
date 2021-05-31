import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useToast } from "../contexts/ToastContext";
import { useAuth } from "./../contexts/AuthContext";
import validateEmail from "./../utils/EmailValidator";
import "react-toastify/dist/ReactToastify.css";
import "./Authentication.css";

const Login = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const [error, setError] = useState();
  const { login, currentUser } = useAuth();
  const { showToast } = useToast();
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passRef.current.value;

    if (!validateEmail(email)) return setError("Email not valid!🙄");
    if (email === "") return setError("Email required!😑");
    if (password === "") return setError("Password required!🤦");

    try {
      await login(email, password);
    } catch (err) {
      return setError(`${err}😢`);
    }
    history.push("/");
    history.go(0);
  };
  return (
    <div className="authentication-container">
      <div className="authentication-form">
        {error !== "" && showToast(error, null, "error", setError)}
        <p className="authentication-label">LOGIN</p>
        <div className="floating">
          <input
            id="input__username"
            className="floating__input"
            name="username"
            type="text"
            placeholder="Username"
            ref={emailRef}
          />
          <label
            htmlFor="input__username"
            className="floating__label"
            data-content="Email"
          >
            <span className="hidden--visually">Username</span>
          </label>
        </div>

        <div className="floating">
          <input
            id="input__password"
            type="password"
            className="floating__input"
            name="password"
            placeholder="Password"
            ref={passRef}
          />
          <label
            htmlFor="input__password"
            className="floating__label"
            data-content="Password"
          >
            <span className="hidden--visually">Password</span>
          </label>
        </div>

        <button className="authentication-submit" onClick={handleLogin}>
          Log In
        </button>
        <Link to="/register" className="authentication-forgotpassword">
          Register Now!
        </Link>
      </div>
    </div>
  );
};

export default Login;
