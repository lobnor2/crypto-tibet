import { makeStyles } from "@material-ui/core";
import React from "react";

// dont forget to wrap parenthesis in makesytles
const useStyles = makeStyles(() => ({
  banner: {
    border: "1px solid white",
  },
}));
const Banner = () => {
  const classes = useStyles();

  return <div className={classes.banner}>Banner</div>;
};

export default Banner;
