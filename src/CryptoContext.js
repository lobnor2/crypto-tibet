import React from "react";
import { useContext } from "react";
import { createContext } from "react";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  return <Crypto.Provider>{children}</Crypto.Provider>;
};

export default CryptoContext;

export const CryptoState = () => {
  useContext(Crypto);
};
