import {
  Container,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "./Banner/Carousel";

// styling for textfield
const useStyles = makeStyles(() => ({
  floatingLabelFocusStyle: { color: "#fff" },
}));
// we are using coin list api from api.js
const CoinsTable = () => {
  const classes = useStyles();

  // coins contains all of our coins from coinlist api from api.js and empty array initailly
  const [coins, setCoins] = useState([]);
  // initally loading is false
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const history = useHistory();
  const { currency, symbol } = CryptoState();

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

  //   function for handle search
  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <Container style={{ textAlign: "center" }}>
      <Typography variant="h5" style={{ marginTop: 20 }}>
        Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField
        fullWidth
        label="Search for Crypto Currency.."
        variant="outlined"
        style={{ marginTop: 15 }}
        // input label color and attribures chanes
        InputLabelProps={{
          className: classes.floatingLabelFocusStyle,
        }}
        // everything you typed will go and update by setsearch
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* for table content */}
      <TableContainer>
        {loading ? (
          <LinearProgress style={{ backgroundColor: "gold" }} />
        ) : (
          //  if linear progress is false table will load
          <Table style={{ marginTop: 10 }}>
            <TableHead
              style={{
                border: "1px solid white",
              }}
            >
              <TableRow>
                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                  <TableCell
                    style={{
                      color: "gold",
                      fontWeight: "500",
                    }}
                    key={head}
                    align={head === "Coin" ? "" : "right"}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {/* handleSearch returns us array of filtered coins and if we dont type any in seach box it will show all of the coins */}
            <TableBody>
              {handleSearch().map((row) => {
                const profit = row.price_change_percentage_24h > 0;

                return (
                  // if we click on any of this row this should take us to that particular coin page
                  <TableRow
                    onClick={() => history.push(`/coins/${row.id}`)}
                    className={classes.row}
                    key={row.name}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      style={{
                        display: "flex",
                        gap: 15,
                        // border: "1px solid white",
                        marginBottom: 5,
                      }}
                    >
                      {/* for coin image */}
                      <img
                        src={row?.image}
                        alt={row.name}
                        height="50"
                        style={{
                          marginBottom: 10,
                          // border: "1px solid white"
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          //   border: "1px solid white",
                        }}
                      >
                        {/* for coin symbol */}
                        <span
                          style={{
                            textTransform: "uppercase",
                            fontSize: 20,
                            color: "white",
                          }}
                        >
                          {row.symbol}
                        </span>
                        {/* for coin name */}
                        <span style={{ color: "darkgrey" }}>{row.name}</span>
                      </div>
                    </TableCell>

                    {/* for coin price */}
                    <TableCell align="right">
                      <span style={{ color: "white", fontSize: "18px" }}>
                        {symbol}
                        {numberWithCommas(row.current_price.toFixed(2))}
                      </span>
                    </TableCell>

                    {/* for 24h change */}
                    <TableCell
                      align="right"
                      style={{
                        // if profit is greater than 0 show green and else red
                        color: profit > 0 ? "rgb(14,203,129" : "red",
                        fontWeight: 500,
                        fontSize: "18px",
                      }}
                    >
                      {profit && "+"}
                      {row.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>

                    {/* for market cap */}
                    <TableCell
                      align="right"
                      style={{ color: "white", fontSize: "18px" }}
                    >
                      {symbol}
                      {numberWithCommas(row.market_cap)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Container>
  );
};

export default CoinsTable;
