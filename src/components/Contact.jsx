import React from "react";

const Contact = ({ id, name, onDelete, onClick }) => {
  return (
    <div className="contact">
      <div className="contact-bubble" onClick={() => onClick(id, name)}>
        <div className="name">{name}</div>
      </div>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

export default Contact;
