import { CheckIcon } from "@chakra-ui/icons";
import { Avatar, Flex, Icon, Text } from "@chakra-ui/react";
import React from "react";
import Question from "../types/question";

type Props = {
  currentQuestion: number;
  index: number;
  question: Question;
  answerLabel: string;
  updateQuestion: (
    index: number,
    key: keyof Question,
    value: string | number | string[]
  ) => void;
};

function AnswerItem({
  currentQuestion,
  index,
  question,
  answerLabel,
  updateQuestion,
}: Props) {
  const bgColors = ["red.600", "blue.600", "yellow.600", "green.600"];

  return (
    <Flex
      flex="1"
      px="4"
      align="center"
      rounded="md"
      backgroundColor={bgColors[index]}
    >
      <Text color="white" fontSize="3xl">
        {answerLabel}
      </Text>
      <input
        type="text"
        defaultValue={question.answers[index]}
        onChange={(e) => {
          const newAnsers = question.answers;
          newAnsers[index] = e.target.value;
          updateQuestion(currentQuestion, "answers", newAnsers);
        }}
        className="w-full py-10 px-5 text-white bg-inherit rounded-md outline-none text-2xl"
      />
      <Avatar
        bg="white"
        icon={<Icon as={CheckIcon} h="8" w="8" color="green" />}
      />
    </Flex>
  );
}

export default AnswerItem;
