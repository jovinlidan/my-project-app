import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
const Card = ({ src, name, location }) => {
  const { currentUser } = useAuth();
  const checkChat = () => {
    if (name.toLowerCase() === "chatroom") {
      if (!currentUser) return "/login";
      else if (localStorage.getItem("username") === "null") return "/profile";
    }
    return `${location.pathname}/${name.toLowerCase()}`;
  };
  return (
    <div className="card-grid-space">
      <Link
        className="card"
        to={checkChat}
        style={{
          backgroundImage: `url(${src})`,
        }}
      ></Link>

      <h1 style={{ fontVariant: "small-caps" }}>{name}</h1>
    </div>
  );
};

export default Card;
