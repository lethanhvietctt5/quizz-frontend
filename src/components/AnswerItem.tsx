import { CheckIcon } from "@chakra-ui/icons";
import { Avatar, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import Question from "../types/question";

type Props = {
  currentQuestion: Question;
  index: number;
  question: Question;
  answer: string;
  correct_ans: string;
  changeCorrectAns: (ans: string) => void;
  updateQuestion: (
    crt: Question,
    key: keyof Question,
    value: string | number
  ) => void;
};

function AnswerItem({
  currentQuestion,
  index,
  question,
  answer,
  correct_ans,
  updateQuestion,
  changeCorrectAns,
}: Props) {
  const ansRef = useRef<HTMLInputElement>(null);

  const bgColors = ["red.600", "blue.600", "yellow.600", "green.600"];

  useEffect(() => {
    if (ansRef.current) {
      ansRef.current.value = currentQuestion[
        answer as keyof Question
      ] as string;
    }
  }, [currentQuestion, answer]);

  return (
    <Flex
      flex="1"
      px="4"
      align="center"
      rounded="md"
      backgroundColor={bgColors[index]}
    >
      <Text color="white" fontSize="3xl">
        {answer[answer.length - 1] + "."}
      </Text>
      <input
        type="text"
        ref={ansRef}
        defaultValue={question[answer as keyof Question]}
        onChange={(e) => {
          updateQuestion(
            currentQuestion,
            answer as keyof Question,
            e.target.value
          );
        }}
        className="w-full py-10 px-5 text-white bg-inherit rounded-md outline-none text-2xl"
      />
      {correct_ans.includes(answer[answer.length - 1]) ? (
        <Avatar
          bg="white"
          icon={<Icon as={CheckIcon} h="8" w="8" color="green" />}
          cursor="pointer"
          onClick={() => changeCorrectAns(answer[answer.length - 1])}
        />
      ) : (
        <Avatar
          bg="white"
          cursor="pointer"
          onClick={() => changeCorrectAns(answer[answer.length - 1])}
        />
      )}
    </Flex>
  );
}

export default AnswerItem;
