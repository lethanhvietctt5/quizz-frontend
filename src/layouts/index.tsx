import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function MainLayout() {
  return (
    <Flex h="100vh" direction="column">
      <Header />
      <Box flexGrow="1">
        <Outlet />
      </Box>
    </Flex>
  );
}

export default MainLayout;
