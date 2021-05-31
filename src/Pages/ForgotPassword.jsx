import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./../contexts/AuthContext";
import { useToast } from "./../contexts/ToastContext";
import validateEmail from "./../utils/EmailValidator";
import "./Authentication.css";

const ForgotPassword = () => {
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { resetPassword } = useAuth();
  const { showToast } = useToast();
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
        {error !== "" && showToast(error, null, "error", setError)}
        {success !== "" && showToast(success, null, "success", setSuccess)}
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
    </div>
  );
};

export default ForgotPassword;
