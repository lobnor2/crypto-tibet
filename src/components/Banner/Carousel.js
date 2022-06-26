import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";

const useStyles = makeStyles((theme) => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
    border: "1px solid red",
    // fontSize: 30,
  },
}));
const Carousel = () => {
  // initial trending is empty array and settrending in axios part where you will get data
  const [trending, setTrending] = useState([]);
  const classes = useStyles();

  //   get currency from crypto context which is managing global state
  const { currency } = CryptoState();

  // fetch data from api
  const fetchTrendingCoins = async () => {
    // tredingcoins are from api.js
    // pass the currency which you get from cryptostate context
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };
  //   call fetchtrendingcoins when you first render the component
  console.log(trending);
  useEffect(() => {
    fetchTrendingCoins();

    // everytime currency changes fetchtrendingcoins will render again coz currency has changed
  }, [currency]);

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
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
};

export default Carousel;
