import React from "react";
import Banner from "../components/Banner/Banner";
import CoinsTable from "../components/CoinsTable";

const Homepage = () => {
  return (
    <>
      {/* for banner content     */}
      <Banner />
      {/* for coins table related  */}
      <CoinsTable />
    </>
  );
};

export default Homepage;
