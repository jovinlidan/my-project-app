import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "./../contexts/AuthContext";

import validateEmail from "./../utils/EmailValidator";
import "react-toastify/dist/ReactToastify.css";
import "./Authentication.css";

const Login = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const [error, setError] = useState();
  const { login } = useAuth();
  const history = useHistory();
  const showToast = (text, delay = 5000) => {
    toast.error(text, {
      position: "bottom-center",
      autoClose: delay,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setError("");
  };

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
  };
  return (
    <div className="authentication-container">
      <div className="authentication-form">
        {error !== "" && showToast(error)}
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
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
