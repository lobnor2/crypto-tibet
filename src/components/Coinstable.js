import {
  Container,
  createTheme,
  LinearProgress,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "./Banner/Carousel";

const useStyles = makeStyles((theme) => ({
  row: {
    backgroundColor: "#16171a",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#131111",
    },
  },
}));

const Coinstable = () => {
  const [search, setSearch] = useState("");
  const { currency, symbol, coins, loading, fetchCoins } = CryptoState();

  const navigate = useNavigate();
  const classes = useStyles();

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant="h5" style={{ margin: 18 }}>
          Cryptocurrency Prices by Market Cap
        </Typography>
        <hr />
        <TextField
          label="Search For a Crypto Currency..."
          variant="outlined"
          //   fullWidth
          style={{ marginBottom: 20, marginTop: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {[
                    "Coin",
                    "Current Price",
                    "24h Change",
                    "Market Cap",
                    "Volume",
                    "High24h",
                    "Low24h",
                    "Price change 24h",
                    "Circulating Supply",
                    "Max Supply",
                    "ATH",
                  ].map((head) => (
                    <TableCell
                      style={{ color: "black", fontWeight: "400" }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch().map((row) => {
                  const profit = row.price_change_percentage_24h > 0;
                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      className={classes.row}
                      key={row.name}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{
                          display: "flex",
                          //   flexDirection: "row",
                          alignItems: "center",
                          // justifyContent: "flexstart",
                          gap: 10,
                        }}
                      >
                        <img
                          src={row?.image}
                          alt={row.name}
                          height="30"
                          style={{ marginBottom: 10 }}
                        />
                        <span>
                          <div>{row.symbol.toUpperCase()}</div>
                          <div>{row.name}</div>
                        </span>
                      </TableCell>
                      <TableCell align="right" style={{ width: "6ch" }}>
                        {symbol}
                        {numberWithCommas(
                          row.current_price > 1000
                            ? row.current_price.toFixed(0)
                            : row.current_price.toFixed(2)
                        )}
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          color: profit > 0 ? "rgb(14,203,129)" : "red",
                          fontWidht: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>
                      <TableCell align="right">
                        {symbol}
                        {row.market_cap.toString().slice(0, -9) >= 1
                          ? row.market_cap.toString().slice(0, -9) + "B"
                          : row.market_cap.toString().slice(0, -6) + "M"}
                      </TableCell>
                      <TableCell align="right">
                        {symbol}
                        {row.total_volume.toString().slice(0, -9) >= 1
                          ? row.total_volume.toString().slice(0, -9) + "B"
                          : row.total_volume.toString().slice(0, -6) + "M"}
                      </TableCell>
                      <TableCell align="right">
                        {symbol}
                        {numberWithCommas(
                          row.high_24h > 1000
                            ? row.high_24h.toFixed(0)
                            : row.high_24h.toFixed(2)
                        )}
                      </TableCell>

                      <TableCell align="right">
                        {symbol}
                        {numberWithCommas(
                          row.low_24h > 1000
                            ? row.low_24h.toFixed(0)
                            : row.low_24h.toFixed(2)
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {symbol}
                        {row.price_change_24h == "0"
                          ? "Unch"
                          : row.price_change_24h.toFixed(2)}
                      </TableCell>
                      <TableCell align="right">
                        {(row.circulating_supply / 1000000).toFixed(2) >= 1000
                          ? (row.circulating_supply / 1000000000).toFixed(2) +
                            "B"
                          : (row.circulating_supply / 1000000).toFixed(2) + "M"}
                      </TableCell>

                      <TableCell align="right">
                        {row?.max_supply
                          ? row.max_supply / 1000000 >= 1000
                            ? (row.max_supply / 1000000000).toFixed(2) + "B"
                            : (row.max_supply / 1000000).toFixed(2) + "M"
                          : "Infinite Supply"}
                      </TableCell>
                      <TableCell align="right">
                        {symbol}
                        {row.ath}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default Coinstable;
