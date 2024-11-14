import React from "react";
import { Button, Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import CreatePage from "./Pages/CreatePage";
import NavBar from "./Components/NavBar";
import { useColorModeValue } from "@chakra-ui/react";

export default function App() {
  return (
    <div>
      <Box minH={"100vh"}  bg={useColorModeValue("gray.100","gray.900")}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create/" element={<CreatePage />} />
        </Routes>
      </Box>
    </div>
  );
}
