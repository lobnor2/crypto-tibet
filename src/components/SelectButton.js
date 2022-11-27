import { makeStyles } from "@material-ui/styles";
import React from "react";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles({});
  const classes = useStyles();
  return (
    <span onclick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;
