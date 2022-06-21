import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";
import Coinpage from "./pages/Coinpage";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  // for styles we normally use css but in mui we use usestyles for styling

  const classes = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />

        <Route path="/" exact component={Homepage} />
        <Route path="/coins/:id" component={Coinpage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
