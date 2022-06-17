import {
  Avatar,
  Box,
  Button,
  Flex,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import AnswerItem from "../components/AnswerItem";
import SlideQuizz from "../components/SlideQuizz";
import Question from "../types/question";
import { v4 as uuidv4 } from "uuid";
import Game from "types/game";
import api from "api";
import { useAppSelector } from "hooks";

const CreateGame: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([initEmptyQuestion()]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>(
    questions[0]
  );
  const [game, setGame] = useState<Game | null>(null);
  const gameNameRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLInputElement>(null);
  const auth = useAppSelector((state) => state.auth);
  const toast = useToast();

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.value = currentQuestion.content;
    }
  }, [currentQuestion]);

  function updateQuestion(
    crtQues: Question,
    key: keyof Question,
    value: string | number
  ) {
    let updatedQues = changeValue(crtQues, key, value);
    setCurrentQuestion(updatedQues);

    const newQuestions = questions.map((question, i) => {
      if (question.question_id === crtQues.question_id) return updatedQues;
      return question;
    });
    setQuestions([...newQuestions]);
  }

  function addQuestion() {
    setQuestions([...questions, initEmptyQuestion()]);
  }

  function duplicateQuestion() {
    let newQuestions: Question[] = [];
    questions.forEach((question) => {
      if (question.question_id === currentQuestion.question_id) {
        newQuestions.push(
          Object.assign({}, { ...question, question_id: uuidv4() })
        );
      }
      newQuestions.push(Object.assign({}, { ...question }));
    });

    setQuestions([...newQuestions]);
  }

  function deleteQuestion(question_id: string) {
    if (questions.length <= 1) {
      toastError("You must have at least one question");
      return;
    }

    let idx: number = questions.findIndex((question) => {
      return question.question_id === question_id;
    });

    if (idx === 0) {
      setCurrentQuestion(Object.assign({}, questions[0]));
    } else {
      setCurrentQuestion(Object.assign({}, questions[idx - 1]));
    }

    let newQuestions: Question[] = questions.filter((question) => {
      return question.question_id !== question_id;
    });

    setQuestions(newQuestions);
  }

  function toastError(message: string) {
    toast({
      title: message,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top",
    });
  }

  function changeCorrectAnser(ans: string) {
    let correctAns: string;
    if (currentQuestion.correct_ans.includes(ans)) {
      correctAns = currentQuestion.correct_ans.replace(ans, "");
      setCurrentQuestion({ ...currentQuestion, correct_ans: correctAns });
    } else {
      correctAns = currentQuestion.correct_ans + ans;
      setCurrentQuestion({ ...currentQuestion, correct_ans: correctAns });
    }

    let newQuestions = questions.map((question) => {
      if (question.question_id === currentQuestion.question_id) {
        return { ...question, correct_ans: correctAns };
      }
      return question;
    });

    setQuestions([...newQuestions]);
  }

  async function saveGame() {
    if (gameNameRef.current && gameNameRef.current.value.length === 0) {
      toastError("Please enter game name.");
      return;
    }

    for (let question of questions) {
      if (question.content.length === 0) {
        toastError("Please enter question content for all question.");
        return;
      }

      if (
        question.ans_A.length === 0 ||
        question.ans_B.length === 0 ||
        question.ans_C.length === 0 ||
        question.ans_D.length === 0
      ) {
        toastError("Please enter 4 answer for all question.");
        return;
      }

      if (question.correct_ans.length === 0) {
        toastError("Please select correct answer for all question.");
        return;
      }

      if (!question.duration_sec) {
        toastError("Invalid duration time.");
        return;
      }
    }

    let gameObj: Game | null = game;
    if (game == null) {
      const res = await api.post("/game", {
        name: gameNameRef.current?.value,
        author_id: auth.user_id,
      });

      if (res.status === 200) gameObj = res.data;
    } else {
      if (gameNameRef.current) {
        const res = await api.patch("/game/" + game.game_id, {
          name: gameNameRef.current.value,
        });

        if (res.status === 200) gameObj = res.data;
      }
    }

    if (gameObj) {
      setGame(gameObj);
      for await (let question of questions) {
        const res = await api.post("/question", {
          ...question,
          game_id: gameObj.game_id,
        });
        if (res.status !== 200) {
          toastError("Create game failed.");
          break;
        }
      }

      toast({
        title: "Game has saved successful.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  }

  return (
    <Box h="full">
      <Flex w="full" h="full">
        <Box w="15%" boxShadow="md" backgroundColor="white">
          <Flex py="3" h="full" direction="column" justify="space-between">
            <Box w="full" px="4" mb="2">
              <Input
                ref={gameNameRef}
                w="full"
                placeholder="Enter Game's name"
                focusBorderColor="green.300"
              />
            </Box>
            <Flex h="73vh" direction="column" overflowY="scroll">
              {questions.map((question, idx) => (
                <SlideQuizz
                  currentQuestion={currentQuestion}
                  duplicateQuestion={duplicateQuestion}
                  deleteQuestion={deleteQuestion}
                  key={question.question_id}
                  index={idx}
                  question={question}
                  setCurrentQuestion={setCurrentQuestion}
                />
              ))}
            </Flex>

            <Button
              mx="5"
              colorScheme="green"
              size="sm"
              variant="outline"
              onClick={addQuestion}
            >
              Add slide
            </Button>
            <Button
              mx="5"
              mt="2"
              colorScheme="green"
              size="sm"
              onClick={saveGame}
            >
              Save
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
                ref={contentRef}
                onChange={(e) => {
                  updateQuestion(currentQuestion, "content", e.target.value);
                }}
                defaultValue={currentQuestion.content}
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
                    min="5"
                    max="20"
                    onChange={(e) => {
                      updateQuestion(
                        currentQuestion,
                        "duration_sec",
                        e.target.value
                      );
                    }}
                    defaultValue={currentQuestion.duration_sec}
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
                  question={currentQuestion}
                  answer="ans_A"
                  changeCorrectAns={changeCorrectAnser}
                  correct_ans={currentQuestion.correct_ans}
                  updateQuestion={updateQuestion}
                />
                <AnswerItem
                  currentQuestion={currentQuestion}
                  index={1}
                  question={currentQuestion}
                  answer="ans_B"
                  changeCorrectAns={changeCorrectAnser}
                  correct_ans={currentQuestion.correct_ans}
                  updateQuestion={updateQuestion}
                />
              </Flex>
              <Flex w="full" gap="4" mb="4">
                <AnswerItem
                  currentQuestion={currentQuestion}
                  index={2}
                  question={currentQuestion}
                  answer="ans_C"
                  changeCorrectAns={changeCorrectAnser}
                  correct_ans={currentQuestion.correct_ans}
                  updateQuestion={updateQuestion}
                />
                <AnswerItem
                  currentQuestion={currentQuestion}
                  index={3}
                  question={currentQuestion}
                  answer="ans_D"
                  changeCorrectAns={changeCorrectAnser}
                  correct_ans={currentQuestion.correct_ans}
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

function changeValue<K extends keyof Question, V extends Question[K]>(
  obj: Question,
  field: K,
  v: V
) {
  const newObj = { ...obj };
  newObj[field] = v;
  return newObj;
}

function initEmptyQuestion() {
  return {
    question_id: uuidv4(),
    game_id: "",
    content: "",
    ans_A: "",
    ans_B: "",
    ans_C: "",
    ans_D: "",
    correct_ans: "",
    duration_sec: 10,
  };
}

export default CreateGame;
