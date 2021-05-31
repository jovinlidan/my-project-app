import React from "react";

import { Link } from "react-router-dom";
const Card = ({ src, name, location }) => {
  return (
    <div className="card-grid-space">
      <Link
        className="card"
        to={`${location.pathname}/${name.toLowerCase()}`}
        style={{
          backgroundImage: `url(${src})`,
        }}
      ></Link>

      <h1>{name}</h1>
    </div>
  );
};

export default Card;
