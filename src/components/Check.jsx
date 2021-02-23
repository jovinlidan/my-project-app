import React from "react";
import { Form } from "react-bootstrap";

const Check = ({ type, label, id, name, classes }) => {
  return (
    <Form.Check
      type={type}
      id={id}
      label={label}
      name={name}
      className={classes}
    />
  );
};

export default Check;
