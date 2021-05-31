import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function CustomizedSelects({
  name,
  options,
  onChange,
  currentSelected,
}) {
  const classes = useStyles();

  return (
    <div>
      <FormControl className={classes.margin}>
        <InputLabel
          className="select-label"
          htmlFor="demo-customized-select-native"
          style={{ color: "white" }}
        >
          City
        </InputLabel>
        <NativeSelect
          id="demo-customized-select-native"
          value={currentSelected}
          onChange={onChange}
          input={<BootstrapInput />}
        >
          <option aria-label="None" value="ERROR">
            "Select Your {name}"
          </option>
          {options.map((option) =>
            Array.isArray(option) ? (
              option.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.label}
                </option>
              ))
            ) : (
              <option value={option._id} key={option._id}>
                {option.name}
              </option>
            )
          )}
        </NativeSelect>
      </FormControl>
    </div>
  );
}
