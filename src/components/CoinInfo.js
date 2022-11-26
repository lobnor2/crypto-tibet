import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  coininfo: {
    border: "1px solid red",
  },
}));
const CoinInfo = () => {
  const classes = useStyles();
  return <div className={classes.coininfo}>CoinInfo</div>;
};

export default CoinInfo;
