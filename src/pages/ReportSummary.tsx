import {
  Box,
  Text,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  Input,
  useEditableControls,
  ButtonGroup,
  Flex,
  Editable,
  EditablePreview,
  EditableInput,
  IconButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  HStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { default as dayjs } from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { ImClock, ImQuestion, ImUser } from 'react-icons/im';
import ReportModel from 'types/report';
import api from 'api';
import { useParams } from 'react-router-dom';
import DonutChart from 'components/DonutChart';
import TabPlayer from 'components/TabPlayer';
import TabQuestion from 'components/TabQuestion';

dayjs.extend(localizedFormat);

function ReportSummary() {
  const { report_id } = useParams();
  const [tabIndex, setTabIndex] = React.useState(0);
  const handleTabsChange = (index: React.SetStateAction<number>) => {
    setTabIndex(index);
  };
  const [report, setReport] = useState<ReportModel>();

  useEffect(() => {
    async function fetchReports() {
      const res = await api.get('/report/' + report_id);
      if (res.status === 200) {
        setReport(res.data);
      }
    }
    fetchReports();
  }, [report_id]);

  function EditableControls() {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps, getEditButtonProps } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" size="sm">
        <IconButton icon={<CheckIcon />} aria-label="check" {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon />} aria-label="close" {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent="center">
        <IconButton size="sm" aria-label="edit" icon={<EditIcon />} {...getEditButtonProps()} />
      </Flex>
    );
  }

  return (
    <Box w="60%" mx="auto" mt="10">
      <Text fontSize="3xl">Report</Text>
      <Editable textAlign="center" defaultValue="Rasengan ⚡️" fontSize="2xl" isPreviewFocusable={false}>
        <EditablePreview />
        {/* Here is the custom input */}
        <Input as={EditableInput} />
        <EditableControls />
      </Editable>
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList>
          <Tab>Summary</Tab>
          <Tab isSelected>Player ({report?.count_players})</Tab>
          <Tab>Questions ({report?.count_questions})</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <HStack spacing={4}>
              <Box p={5} maxW="60%" height={200} borderWidth="1px" borderRadius="lg" overflow="hidden">
                <HStack spacing={4}>
                  <DonutChart value={55} valuelabel={'correct'} size={116} strokewidth={15} />
                  <Box maxW="70%">
                    <Text fontSize="3xl">Well played</Text>
                    <Text>
                      Play again and let the same group improve their score or see if new players can beat this result.
                    </Text>
                    <Button colorScheme="blue">Play agian</Button>
                  </Box>
                </HStack>
              </Box>
              <Box maxW="40%" height={200} borderWidth="1px" borderRadius="lg" overflow="hidden">
                <Flex minH="100%" alignItems="center" justifyContent="center">
                  <TableContainer minH="100%">
                    <Table variant="unstyled">
                      <Tbody>
                        <Tr>
                          <Td>
                            <ImUser size={25} color="purple" />
                          </Td>
                          <Td>
                            <Text _hover={{ color: 'green', cursor: 'pointer' }} onClick={() => handleTabsChange(1)}>
                              Players
                            </Text>
                          </Td>
                          <Td isNumeric>
                            <Text align="right">{report?.count_players}</Text>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>
                            <ImQuestion size={25} color="blue" />
                          </Td>
                          <Td>
                            <Text _hover={{ color: 'green', cursor: 'pointer' }} onClick={() => handleTabsChange(2)}>
                              Questions
                            </Text>
                          </Td>
                          <Td isNumeric>
                            <Text align="right">{report?.count_questions}</Text>
                          </Td>
                        </Tr>
                        <Tr border="0">
                          <Td>
                            <ImClock size={25} color="green" />
                          </Td>
                          <Td>Time</Td>
                          <Td isNumeric>
                            <Text align="right">1 min</Text>
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                </Flex>
              </Box>
            </HStack>
          </TabPanel>
          <TabPanel>{report ? <TabPlayer report_id={report.report_id} /> : <></>}</TabPanel>
          <TabPanel>{report ? <TabQuestion game_id={report.game_id} /> : <></>}</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default ReportSummary;
