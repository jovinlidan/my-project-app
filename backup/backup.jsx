import React from "react";
const Select = ({ name, options, classes }) => {
  return (
    <div className={classes}>
      <select name={name} id={name}>
        <option value="">Select Your {name}</option>
        {options.map((option, index) => (
          <option key={index} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
