import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";

const Coinpage = () => {
  // return id variable from url
  const { id } = useParams();
  // to store whatever we get from api
  const [coin, setCoin] = useState();
  // currency and symbol are from context api
  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  const useStyles = makeStyles(() => ({}));
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>{/* sidebar */}</div>
      <div className={classes.chart}>
        {/* chart */}
        <CoinInfo coin={coin} />
      </div>
    </div>
  );
};

export default Coinpage;
