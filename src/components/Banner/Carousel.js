import { makeStyles } from "@material-ui/core";
import React from "react";
import { TrendingCoins } from "../../config/api";
import axios from "axios";
import { CryptoState } from "../../CryptoContext";

const useStyles = makeStyles(() => ({
  carousel: {
    height: "40%",
    display: "flex",
    alignItems: "center",
    border: "1px solid white",
  },
}));

const Carousel = () => {
  const { currency } = CryptoState();
  const classes = useStyles();
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
  };
  return <div className={classes.carousel}>Carousel</div>;
};

export default Carousel;
