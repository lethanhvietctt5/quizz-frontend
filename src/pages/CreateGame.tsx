import { CheckIcon } from "@chakra-ui/icons";
import { Avatar, Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { useState } from "react";
import AnswerItem from "../components/AnswerItem";
import SlideQuizz from "../components/SlideQuizz";
import Question from "../types/question";

const emptyQuestion: Question = {
  quiz: "",
  duration: 10,
  answers: [],
  correctAnswer: [],
};

function changeValue<K extends keyof Question, V extends Question[K]>(
  obj: Question,
  field: K,
  v: V
) {
  const newObj = { ...obj };
  newObj[field] = v;
  return newObj;
}

const CreateGame: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([
    { ...emptyQuestion },
  ]);

  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  function updateQuestion(
    index: number,
    key: keyof Question,
    value: string | number | string[]
  ) {
    let updatedQues = changeValue(questions[index], key, value);
    const newQuestions = questions.map((question, i) => {
      if (i === index) {
        return updatedQues;
      }
      return question;
    });
    setQuestions([...newQuestions]);
  }

  return (
    <Box h="full">
      <Flex w="full" h="full">
        <Box w="15%" boxShadow="md" backgroundColor="white">
          <Flex py="5" h="full" direction="column" justify="space-between">
            <Box>
              {questions.map((question, idx) => (
                <SlideQuizz key={idx} index={idx} question={question} />
              ))}
            </Box>

            <Button mx="5" colorScheme="green" size="sm">
              Add slide
            </Button>
          </Flex>
        </Box>
        <Box flexGrow="1" backgroundColor="gray.200">
          <Flex
            h="full"
            direction="column"
            justify="space-between"
            align="center"
            py="4"
            px="8"
          >
            <Box w="full" boxShadow="md" mt="10">
              <input
                type="text"
                onChange={(e) => {
                  updateQuestion(currentQuestion, "quiz", e.target.value);
                }}
                defaultValue={questions[currentQuestion].quiz}
                className="w-full py-3 rounded-md outline-none px-10 text-5xl text-center font-medium"
              />
            </Box>

            <Flex align="center">
              <Avatar
                bg="gray.400"
                size="2xl"
                icon={
                  <input
                    type="number"
                    defaultValue={questions[currentQuestion].duration}
                    className="w-full bg-inherit outline-none m-5 text-white text-center"
                  />
                }
              />
              <Text ml="3" color="gray" fontSize="3xl">
                seconds
              </Text>
            </Flex>

            <Box w="full">
              <Flex w="full" gap="4" mb="4">
                <AnswerItem
                  currentQuestion={currentQuestion}
                  index={0}
                  question={questions[currentQuestion]}
                  answerLabel="A."
                  updateQuestion={updateQuestion}
                />
                <AnswerItem
                  currentQuestion={currentQuestion}
                  index={1}
                  question={questions[currentQuestion]}
                  answerLabel="B."
                  updateQuestion={updateQuestion}
                />
              </Flex>
              <Flex w="full" gap="4" mb="4">
                <AnswerItem
                  currentQuestion={currentQuestion}
                  index={2}
                  question={questions[currentQuestion]}
                  answerLabel="C."
                  updateQuestion={updateQuestion}
                />
                <AnswerItem
                  currentQuestion={currentQuestion}
                  index={3}
                  question={questions[currentQuestion]}
                  answerLabel="D."
                  updateQuestion={updateQuestion}
                />
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default CreateGame;
