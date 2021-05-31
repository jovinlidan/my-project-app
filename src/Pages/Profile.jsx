import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "./../contexts/AuthContext";
import { useToast } from "./../contexts/ToastContext";
import { database } from "./../services/FirebaseService";
import profileImg from "./../assets/images/profile.png";
import "react-toastify/dist/ReactToastify.css";
import "./Authentication.css";

const Profile = () => {
  const usernameRef = useRef();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [currentUsername, setCurrentUsername] = useState();
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const history = useHistory();

  useEffect(() => {
    getCurrentUsername().then((res) => setCurrentUsername(res));
  }, []);
  async function getCurrentUsername() {
    try {
      let snap = await database
        .ref("users/" + currentUser?.uid + "/username")
        .once("value");
      return snap.val();
    } catch (err) {}
  }

  const handleSave = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    for (let i = 0; i < username.length; i++) {
      if (
        username[i] === "." ||
        username[i] === "#" ||
        username[i] === "$" ||
        username[i] === "[" ||
        username[i] === "]"
      )
        return setError("Username can't contain any ][.#$ 😎");
    }
    if (username.length < 5) return setError("Minimum 5 Letter!😠");
    if (username.length > 20) return setError("Maximum 20 Letter!😠");
    let checkNewUsername = await database
      .ref("/username/" + username)
      .once("value");
    if (checkNewUsername.val() !== null)
      return setError("Can't Change Username or Username has been taken!💢");

    try {
      // GET USERNAME

      //SET USERNAME BY UID
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
    localStorage.setItem("username", username);
    setSuccess("Username has been changed!😂");
    history.push("/");
    history.go(0);
  };
  return (
    <div className="authentication-container">
      <div className="authentication-form">
        {error !== "" && showToast(error, 5000, "error", setError)}
        {success !== "" && showToast(success, 5000, "success", setSuccess)}
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
    </div>
  );
};

export default Profile;
