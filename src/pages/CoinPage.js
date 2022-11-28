import { Button, LinearProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { numberWithCommas } from "../components/Banner/Carousel";
import CoinInfo from "../components/CoinInfo";
import { db } from "../components/firebase";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import "./CoinPage.css";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const navigate = useNavigate();

  const { currency, symbol, user } = CryptoState();

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

  const addToWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);

    try {
      await setDoc(coinRef, {
        coins: watchlist ? [...watchlist, coin?.id] : [coin?.id],
      });
    } catch (error) {}
  };

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
          {user && (
            <Button
              variant="contained"
              style={{
                backgroundColor: "#EEcb1D",
                width: "100%",
                height: 40,
                marginTop: 20,
              }}
              onClick={addToWatchlist}
            >
              Add to Watchlist
            </Button>
          )}
        </div>

        {/* <Button
          variant="contained"
          style={{ backgroundColor: "#EEcb1D" }}
          // onClick={navigate("/")}
        >
          Go Home
        </Button> */}
      </div>
      {/* chart */}
      {/* <CoinInfo coin={coin} /> */}
    </div>
  );
};

export default CoinPage;
