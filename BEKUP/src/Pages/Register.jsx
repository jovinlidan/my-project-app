import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "./../contexts/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import "./Authentication.css";
import validateEmail from "./../utils/EmailValidator";

const Register = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const repeatPassRef = useRef();
  const [error, setError] = useState();
  const { signup } = useAuth();
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
  const handleSignUp = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const repeatPassword = repeatPassRef.current.value;

    if (!validateEmail(email)) return setError("Email not valid!🙄");
    if (email === "") return setError("Email required!😑");
    if (password === "") return setError("Password required!🤦");
    if (repeatPassword === "") return setError("Repeat Password required!😓");
    if (password !== repeatPassword)
      return setError("Password must be same!🚫");

    try {
      await signup(email, password);
    } catch (err) {
      return setError(`${err}😢`);
    }
    history.push("/profile");
  };
  return (
    <div className="authentication-container">
      <form className="authentication-form">
        {error !== "" && showToast(error)}
        <p className="authentication-label">REGISTER</p>
        <div className="floating">
          <input
            id="input__username"
            className="floating__input"
            name="username"
            type="email "
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
            id="input__repeatpassword"
            type="password"
            className="floating__input"
            name="password"
            placeholder="Password"
            ref={passRef}
          />
          <label
            htmlFor="input__repeatpassword"
            className="floating__label"
            data-content="Password"
          >
            <span className="hidden--visually">Password</span>
          </label>
        </div>

        <div className="floating">
          <input
            id="input__password"
            type="password"
            className="floating__input"
            name="repeatpassword"
            placeholder="Repeat Password"
            ref={repeatPassRef}
          />
          <label
            htmlFor="input__password"
            className="floating__label"
            data-content="Repeat Password"
          >
            <span className="hidden--visually">Repeat Password</span>
          </label>
        </div>

        <button className="authentication-submit" onClick={handleSignUp}>
          Sign Up
        </button>
        <Link to="/forgotpassword" className="authentication-forgotpassword">
          Forgot my password
        </Link>
      </form>
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

export default Register;
