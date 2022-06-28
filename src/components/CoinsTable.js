import { Container, TextField, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
// we are using coin list api from api.js
const CoinsTable = () => {
  // coins contains all of our coins from coinlist api from api.js and empty array initailly
  const [coins, setCoins] = useState([]);
  // initally loading is false
  const [loading, setLoading] = useState(false);
  const { currency } = CryptoState();

  const fetchCoins = async () => {
    setLoading(true);
    // we are getting CoinList from api.js
    // we are destructuring whatever we got from api in data
    // this currency is coming from context api
    const { data } = await axios.get(CoinList(currency));

    // setting data that receive from api
    setCoins(data);
    setLoading(false);
  };
  useEffect(() => {
    fetchCoins();
    // everytime currency changes fetchCoins will rerender
  }, [currency]);
  return (
    <Container style={{ textAlign: "center" }}>
      <Typography variant="h5" style={{ marginTop: 10 }}>
        Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField
        fullWidth
        label="Search for Crypto Currency.."
        variant="outlined"
        style={{ marginTop: 15, color: "white", borderColor: "white" }}
      />
    </Container>
  );
};

export default CoinsTable;
