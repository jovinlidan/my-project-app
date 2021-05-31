import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "./../contexts/AuthContext";
import { database } from "./../services/FirebaseService";
import profileImg from "./../assets/images/profile.png";
import "react-toastify/dist/ReactToastify.css";
import "./Authentication.css";

const Profile = () => {
  const usernameRef = useRef();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const { currentUser, getCurrentUsername, currentUsername } = useAuth();
  const history = useHistory();

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
  const handleSave = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    if (username.length < 5) return setError("Minimum 5 Letter!😠");
    let checkNewUsername = await database
      .ref("/username/" + username)
      .once("value");
    if (checkNewUsername.val() !== null)
      return setError("Can't Change Username or Username has been taken!💢");

    try {
      getCurrentUsername();
      database.ref("/users").child(currentUser.uid).set({ username });

      //   DELETE CURRENTUSERNAME THAT STORE IN DATABASE
      if (currentUsername !== "") {
        let usernameRef = database.ref("username/" + currentUsername);
        usernameRef?.remove();
      }
      ///////////////////////////

      //   SET NEW USERNAME TO DATABASE
      database.ref("/username/").child(username).set(currentUser.uid);
    } catch (err) {
      return setError(`${err}😢`);
    }

    setSuccess("Username has been changed!😂");
    history.push("/");
  };
  return (
    <div className="authentication-container">
      <div className="authentication-form">
        {error !== "" && showToast(error, 5000, "error")}
        {success !== "" && showToast(success, 5000, "success")}
        <p className="authentication-label">UPDATE YOUR PROFILE</p>
        <div
          className="profile-images"
          style={{
            backgroundImage: `url(${profileImg})`,
            backgroundSize: "cover",
            width: "200px",
            height: "200px",
            borderRadius: "60%",
            backgroundColor: "white",
            backgroundPositionY: "-17px",
            border: "1px solid white",
            position: "absolute",
            top: "-125px",
            transform: "scale(0.55)",
            alignSelf: "center",
          }}
        ></div>
        <div className="floating">
          <input
            id="input__username"
            className="floating__input"
            name="username"
            type="text"
            placeholder="Username"
            ref={usernameRef}
          />
          <label
            htmlFor="input__username"
            className="floating__label"
            data-content="Username(Min. 5 Letter)"
          >
            <span className="hidden--visually">Username</span>
          </label>
        </div>

        <button className="authentication-submit" onClick={handleSave}>
          Save
        </button>
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

export default Profile;
