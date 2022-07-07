import { LinearProgress, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import ReactHtmlParser from "react-html-parser";
import { numberWithCommas } from "../components/Banner/Carousel";

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

  const useStyles = makeStyles((theme) => ({
    container: {
      // container will have flex when display is full screen
      display: "flex",
      // if less than md then display column
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },

      display: "flex",
      flexDirection: "center",
      aligntItems: "center",
      marginTop: 25,
      borderRight: "2px soid grey",
    },

    heading: {
      fontWeight: "bold",
      marginBottom: 20,
    },
    description: {
      width: "100%",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
  }));
  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <div className={classes.container}>
      <div className={classes.sidebar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>

        {/* for descriptions */}
        <Typography>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}
        </Typography>
        <div className={classes.marketData}>
          <span style={{ display: "flex" }}>
            <Typography variant="h4" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">{coin?.market_cap_rank}</Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h4" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h4" className={classes.heading}>
              Market Cap:{" "}
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5">
              {symbol}{" "}
              {coin?.market_cap[currency.toLowerCase()].toString().slice(0, -6)}
              M
            </Typography>
          </span>
        </div>
      </div>

      {/* chart */}
      <CoinInfo coin={coin} />
    </div>
  );
};

export default Coinpage;
