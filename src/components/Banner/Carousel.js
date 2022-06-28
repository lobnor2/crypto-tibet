import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
    border: "1px solid blue",
    // fontSize: 30,
  },
  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
    justifyContent: "center",
    border: "1px solid white",
    margin: 2,
    backgroundColor: "rgba(4,5,6,0.7)",
    paddingTop: 20,
    paddingBottom: 20,
  },
}));

// function to add comma in large numbers
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  // initial trending is empty array and settrending in axios part where you will get data
  const [trending, setTrending] = useState([]);
  const classes = useStyles();

  //   get currency and symbol from crypto context which is managing global state
  const { currency, symbol } = CryptoState();

  // fetch data from api
  const fetchTrendingCoins = async () => {
    // tredingcoins are from api.js
    // pass the currency which you get from cryptostate context
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };
  //   call fetchtrendingcoins when you first render the component
  //   console.log(trending);
  useEffect(() => {
    fetchTrendingCoins();

    // everytime currency changes fetchtrendingcoins will render again coz currency has changed
  }, [currency]);

  // all the items are coming from trending state
  const items = trending.map((coin) => {
    // for percentage changes
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      // link is use to navigate from one page to other
      <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        {/* symbol of the coin */}
        <span style={{ fontSize: 16 }}>
          {coin?.symbol}
          {/* nbsp is for giving some space */}
          &nbsp;
          {/* percentage change in the profit or loss */}
          <span style={{ fontSize: 16, color: profit > 0 ? "green" : "red" }}>
            {profit && "+"}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span
          style={{
            fontSize: 18,
            fontWeight: 500,
            marginTop: 7,
          }}
        >
          {symbol}
          {numberWithCommas(
            coin.current_price < 1000000
              ? coin.current_price.toFixed(2)
              : coin.current_price.toFixed(0)
          )}
        </span>
      </Link>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };
  return (
    <div className={classes.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        // responsive means how many items u want to see at a time
        responsive={responsive}
        autoPlay
        // total items u want to show in carousel
        items={items}
        disableButtonsControls
      />
    </div>
  );
};

export default Carousel;
