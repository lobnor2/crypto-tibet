import { LinearProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { numberWithCommas } from "../components/Banner/Carousel";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import "./CoinPage.css";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
  }, []);

  const useStyles = makeStyles((theme) => ({
    // container: {
    //   display: "flex",
    //   [theme.breakpoints.down("md")]: {
    //     flexDirection: "column",
    //     alignItems: "center",
    //   },
    // },
  }));
  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className="coinpage">
      <div className="coinpage_sidebar">
        {/* sidebar */}
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className="coinpage_heading">
          {coin?.name}
        </Typography>
        {/* <div className="coinpage_description">{coin?.description.en}</div> */}
        <div className="coinpage_marketdata">
          <div style={{ display: "flex", marginTop: 20 }}>
            <Typography variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp;
            <Typography variant="h5">{coin?.market_cap_rank}</Typography>
          </div>
          <div style={{ display: "flex", marginTop: 20 }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            <Typography variant="h5">
              &nbsp;
              {symbol}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </div>
          <div style={{ display: "flex", marginTop: 20 }}>
            <Typography variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            {/* &nbsp; &nbsp; */}
            <Typography variant="h5">
              &nbsp;{symbol}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </div>
        </div>
      </div>
      {/* chart */}
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
