import { Container, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import Carousel from "./Carousel";

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(./blacksky.jpeg)",
    backgroundPosition: "top right",
    backgroundSize: "310%",
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  // tagline: {
  //   fontSize: "30px",
  //   textAlign: "center",
  //   fontWeight: "bold",
  // },
}));

const Banner = () => {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h3"
            style={{
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 20,
            }}
          >
            Welcome to Crypto Tibet
          </Typography>
          <Typography
            variant="subtitle2"
            style={{ textAlign: "center", textTransform: "capitalize" }}
          >
            Get all the info regarding your favorite crypto currency{" "}
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
