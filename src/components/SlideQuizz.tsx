import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import { HiOutlineDocumentDuplicate } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Question from '../types/question';

type Props = {
  index: number;
  question: Question;
  currentQuestion: Question;
  setCurrentQuestion: React.Dispatch<React.SetStateAction<Question>>;
  duplicateQuestion: () => void;
  deleteQuestion: (question_id: string) => void;
};

function SlideQuizz({
  index,
  question,
  currentQuestion,
  setCurrentQuestion,
  duplicateQuestion,
  deleteQuestion,
}: Props) {
  const bgColor = currentQuestion.question_id === question.question_id ? 'blue.100' : 'white';

  const cloneQues = question.question_id === currentQuestion.question_id ? currentQuestion : question;

  return (
    <Flex w="full" px="4" py="2" backgroundColor={bgColor}>
      <Flex color="gray.600" direction="column" justify="center" gap="3" mr="2">
        <HiOutlineDocumentDuplicate cursor="pointer" onClick={duplicateQuestion} />
        <RiDeleteBin6Line cursor="pointer" onClick={() => deleteQuestion(question.question_id)} />
      </Flex>
      <Box
        h="32"
        flexGrow="1"
        color="gray.500"
        maxW="90%"
        rounded="md"
        backgroundColor="gray.100"
        p="3"
        onClick={() => {
          setCurrentQuestion(question);
        }}
      >
        <Flex w="full" direction="column" justify="space-between" h="full">
          <Text w="full" align="center" fontSize="sm" noOfLines={1}>
            {question.content}
          </Text>
          <Flex justify="center">
            <Avatar
              bg="gray.200"
              icon={
                <Text maxW="full" maxH="full" overflow="hidden" color="gray.400">
                  {cloneQues.duration_sec}
                </Text>
              }
            />
          </Flex>
          <Flex color="gray.400" direction="column" gap="1">
            <Flex w="full" gap="2">
              <Box flex="1" h="3" border="1px" rounded="sm">
                {cloneQues.correct_ans.includes('A') ? <Box h="2" w="2" bg="green.400" rounded="full" /> : null}
              </Box>
              <Box flex="1" h="3" border="1px" rounded="sm">
                {cloneQues.correct_ans.includes('B') ? <Box h="2" w="2" bg="green.400" rounded="full" /> : null}
              </Box>
            </Flex>
            <Flex w="full" gap="2">
              <Box flex="1" h="3" border="1px" rounded="sm">
                {cloneQues.correct_ans.includes('C') ? <Box h="2" w="2" bg="green.400" rounded="full" /> : null}
              </Box>
              <Box flex="1" h="3" border="1px" rounded="sm">
                {cloneQues.correct_ans.includes('D') ? <Box h="2" w="2" bg="green.400" rounded="full" /> : null}
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
}

export default SlideQuizz;
