import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Checkbox,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Stack,
  Input,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { default as dayjs } from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { DeleteIcon } from '@chakra-ui/icons';
import ReportModel from 'types/report';
import api from 'api';
import { useAppSelector } from 'hooks';
import { Link } from 'react-router-dom';
import { VscKebabVertical } from 'react-icons/vsc';
import ExportExcel from './components/ExportExcel';

dayjs.extend(localizedFormat);

function Report() {
  const auth = useAppSelector(state => state.auth);
  const [reports, setReports] = useState<ReportModel[]>([]);

  useEffect(() => {
    async function fetchAllReports() {
      const res = await api.get('/report/all_reports/' + auth.user_id);

      if (res.status === 200) {
        setReports(res.data);
      }
    }

    fetchAllReports();
  }, [auth]);
  return (
    <Box w="60%" mx="auto" mt="10">
      <Stack direction="row" spacing={4}>
        <Input variant="outline" placeholder="Search" />
        <Button leftIcon={<DeleteIcon />} colorScheme="gray" variant="solid">
          Trash
        </Button>
      </Stack>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>
                <Checkbox></Checkbox>
              </Th>
              <Th>Name</Th>
              {/* <Th></Th> */}
              <Th>Date</Th>
              <Th isNumeric>No. of players</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {reports.map(report => (
              <Tr>
                <Td>
                  <Checkbox></Checkbox>
                </Td>
                <Td _hover={{ color: 'blue' }}>
                  <Link to={`/report/${report.report_id}`}>{report.name}</Link>
                </Td>
                {/* <Td><Badge variant='outline' colorScheme='green'>Finish</Badge></Td> */}
                <Td>{dayjs(report.started_at).format('MMM D, h:mm A	')}</Td>
                <Td isNumeric>{report.count_players}</Td>
                <Td>
                  <Menu isLazy>
                    <MenuButton
                      as={IconButton}
                      aria-label="Options"
                      icon={<VscKebabVertical />}
                      variant="solid"
                      backgroundColor="white"
                    >
                      Open menu
                    </MenuButton>
                    <MenuList>
                      <MenuItem>
                        <ExportExcel />
                      </MenuItem>
                      <MenuItem>Open Report</MenuItem>
                      <MenuItem>Play again</MenuItem>
                      <MenuItem>Rename</MenuItem>
                      <MenuItem>Move to Trash</MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
          {/* <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot> */}
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Report;
