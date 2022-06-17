import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Question from "../types/question";

type Props = {
  index: number;
  question: Question;
};

function SlideQuizz({ index, question }: Props) {
  return (
    <Flex w="full" px="4" mt="4">
      <Flex color="gray.600" direction="column" justify="center" gap="3" mr="2">
        <HiOutlineDocumentDuplicate />
        <RiDeleteBin6Line />
      </Flex>
      <Box
        h="32"
        flexGrow="1"
        color="gray.500"
        maxW="90%"
        rounded="md"
        backgroundColor="gray.100"
        p="3"
      >
        <Flex w="full" direction="column" justify="space-between" h="full">
          <Text w="full" align="center" fontSize="sm" noOfLines={1}>
            {question.quiz}
          </Text>
          <Flex justify="center">
            <Avatar
              bg="gray.200"
              icon={<Text color="gray.400">{question.duration}</Text>}
            />
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
