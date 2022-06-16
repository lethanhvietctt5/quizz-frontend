import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";

function SlideQuizz() {
  return (
    <Flex px="4" mt="4">
      <Flex color="gray.600" direction="column" justify="center" gap="3" mr="2">
        <HiOutlineDocumentDuplicate />
        <RiDeleteBin6Line />
      </Flex>
      <Box
        h="32"
        flexGrow="1"
        color="gray.500"
        rounded="md"
        backgroundColor="gray.100"
        p="3"
      >
        <Flex direction="column" justify="space-between" h="full">
          <Text align="center" fontSize="sm">
            Question ?
          </Text>
          <Flex justify="center">
            <Avatar bg="gray.200" icon={<Text color="gray.400">20</Text>} />
          </Flex>
          <Flex color="gray.400" direction="column" gap="1">
            <Flex w="full" gap="2">
              <Box flex="1" h="3" border="1px" rounded="sm"></Box>
              <Box flex="1" h="3" border="1px" rounded="sm"></Box>
            </Flex>
            <Flex w="full" gap="2">
              <Box flex="1" h="3" border="1px" rounded="sm"></Box>
              <Box flex="1" h="3" border="1px" rounded="sm"></Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}

export default SlideQuizz;
