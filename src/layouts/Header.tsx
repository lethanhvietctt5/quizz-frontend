import { Box, Button, Flex, Image } from "@chakra-ui/react";
import React from "react";
import { VscLibrary } from "react-icons/vsc";
import { IoStatsChartOutline, IoCreateOutline } from "react-icons/io5";
import HeaderMenuItem from "../components/HeaderMenuItem";

import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Box boxShadow="md" borderBottom="1px" borderColor="gray.100">
      <Flex
        w="80%"
        mx="auto"
        align="center"
        justify="space-between"
        fontWeight="bold"
        letterSpacing="tight"
        py="4"
      >
        <Flex align="center" gap="20">
          <Image h="12" src={logo} />
          <Flex gap="10">
            <HeaderMenuItem Icon={VscLibrary} label="Library" />
            <HeaderMenuItem Icon={IoStatsChartOutline} label="Report" />
            <Link to="/create">
              <HeaderMenuItem Icon={IoCreateOutline} label="Create" />
            </Link>
          </Flex>
        </Flex>

        <Flex gap="4">
          <Link to="/login">
            <Button colorScheme="green" size="sm">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button colorScheme="teal" variant="outline" size="sm">
              Register
            </Button>
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
