import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Carousel from "./Carousel";

// dont forget to wrap parenthesis in makesytles
const useStyles = makeStyles(() => ({
  banner: {
    // border: "1px solid red",
    // minHeight: "80vh",
    backgroundImage: "url(./blacksand.jpeg)",
    // backgroundPosition: "center",
    backgroundSize: "cover",
    // opacity: 0.7,
  },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  //   tagline: {
  //     display: "flex",
  //     height: "40%",
  //     flexDirection: "column",
  //     justifyContent: "center",
  //     textAlign: "center",
  //   },
}));
const Banner = () => {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "500",
              textAlign: "center",
              color: "white",
            }}
          >
            Crypto Tibet
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Get all the Info regarding your favorite Crypto currencies
          </Typography>
        </div>

        {/* carousle imported from banner folder */}
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
