import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import "./CoinPage.css";
// import parse from "html-react-parser";

// import ReactHtmlParser from "react-html-parser";
// import ReactHtmlParser, {
//   processNodes,
//   convertNodeToElement,
//   htmlparser2,
// } from "react-html-parser";

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
        <div className="coinpage_description">{coin?.description.en}</div>
      </div>
      {/* chart */}
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage;
