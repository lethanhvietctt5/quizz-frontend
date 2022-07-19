import { Box, Button, Flex, Image } from '@chakra-ui/react';
import React from 'react';
import { VscLibrary } from 'react-icons/vsc';
import { IoStatsChartOutline, IoCreateOutline } from 'react-icons/io5';
import HeaderMenuItem from '../components/HeaderMenuItem';

import logo from '../assets/Logo.png';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks';
import { logout } from 'redux/slices/auth';

function Header() {
  const auth = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <Box boxShadow="md" borderBottom="1px" borderColor="gray.100">
      <Flex w="80%" mx="auto" align="center" justify="space-between" fontWeight="bold" letterSpacing="tight" py="1">
        <Flex align="center" gap="20">
          <Link to="/home">
            <Image h="12" src={logo} />
          </Link>
          <Flex gap="16">
            <HeaderMenuItem Icon={VscLibrary} label="Library" />
            <HeaderMenuItem Icon={IoStatsChartOutline} label="Report" />
            <HeaderMenuItem Icon={IoCreateOutline} label="Create" />
          </Flex>
        </Flex>

        {!auth.email ? (
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
        ) : (
          <Button colorScheme="green" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Flex>
    </Box>
  );
}

export default Header;
