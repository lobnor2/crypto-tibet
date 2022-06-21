import {
  AppBar,
  Container,
  createTheme,
  makeStyles,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    fontWeight: "bold",
    cursor: "pointer",
  },

  icon: {
    fill: "white",
  },
  root: {
    color: "white",
  },
}));

const Header = () => {
  const classes = useStyles();

  // when click on the logo we want to go to home so we r using usehistory form react router dom
  // history will push that to particular page
  const history = useHistory();

  return (
    <AppBar color="primary" position="static">
      <Container>
        <Toolbar>
          {/* logo  */}
          {/* when we click on the crypto tibet it redirect to home page */}
          <Typography
            onClick={() => history.push("/")}
            variant="h5"
            className={classes.title}
          >
            Crypto Tibet
          </Typography>
          {/* select components  */}
          <Select
            variant="outlined"
            inputProps={{
              classes: {
                icon: classes.icon,
                root: classes.root,
              },
            }}
            style={{
              borderColor: "white",
              width: 100,
              height: 35,
              marginLeft: 15,
            }}
          >
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
