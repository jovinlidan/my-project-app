import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import validateEmail from "./../utils/EmailValidator";
import "./Authentication.css";
import { useAuth } from "./../contexts/AuthContext";

const ForgotPassword = () => {
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { resetPassword } = useAuth();
  const showToast = (text, delay = 5000, type) => {
    toast[type](text, {
      position: "bottom-center",
      autoClose: delay,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    if (type === "error") setError("");
    if (type === "success") setSuccess("");
  };
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    if (!validateEmail(email)) return setError("Email not valid!🙄");

    try {
      await resetPassword(email);
    } catch (err) {
      return setError(`${err}😢`);
    }
    return setSuccess("Email Confirmation has been sent!😃");
  };
  return (
    <div className="authentication-container">
      <div className="authentication-form">
        {error !== "" && showToast(error, 5000, "error")}
        {success !== "" && showToast(success, 5000, "success")}
        <p className="authentication-label">Forgot Password</p>
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

        <button
          className="authentication-submit"
          onClick={handleForgotPassword}
        >
          Send
        </button>
        <Link className="authentication-forgotpassword" to="/login">
          Log In
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

export default ForgotPassword;
