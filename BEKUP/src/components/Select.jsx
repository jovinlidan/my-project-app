/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ComboBox({ options, label, onChange }) {
  return (
    <Autocomplete
      id={label}
      options={options}
      getOptionLabel={(option) => option?.value}
      onChange={onChange}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label={label} variant="outlined" />
      )}
    />
  );
}
