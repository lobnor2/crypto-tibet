import {
  AppBar,
  Container,
  makeStyles,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "gold",
    cursor: "pointer",
  },
}));

const Header = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  return (
    <AppBar color="transparent" position="static">
      <Container>
        <Toolbar>
          <Typography className={classes.title} onClick={() => navigate("/")}>
            Crypto Tibet
          </Typography>
          <Select
            label="Currency"
            variant="outlined"
            style={{
              width: 100,
              height: 40,
              marginLeft: 15,
            }}
          >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
