import { Box, Button, TextField } from "@material-ui/core";
import React from "react";
import { useState } from "react";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />

      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
