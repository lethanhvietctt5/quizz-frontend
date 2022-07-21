import { CheckIcon } from '@chakra-ui/icons';
import { Avatar, Flex, Icon } from '@chakra-ui/react';
import { useAppSelector } from 'hooks';
import React from 'react';
import Question from 'types/question';

interface Props {
  index: number;
  question: Question;
  answer: string;
  selectedAns: string;
  handleSelect: (ans: string) => void;
}

const AnswerSelector: React.FC<Props> = ({ index, question, answer, handleSelect, selectedAns }) => {
  const bgColors = ['red.600', 'blue.600', 'yellow.600', 'green.600'];
  const game = useAppSelector(state => state.game);

  return (
    <Flex flex="1" px="4" align="center" rounded="md" backgroundColor={bgColors[index]}>
      <div className="w-full py-10 px-5 text-white bg-inherit rounded-md outline-none text-2xl">
        {answer[answer.length - 1] + '. '}
        {question[answer as keyof Question]}
      </div>
      {!game.isHost &&
        (selectedAns.includes(answer[answer.length - 1]) ? (
          <Avatar bg="white" cursor="pointer" icon={<Icon as={CheckIcon} h="8" w="8" color="green" />} />
        ) : (
          <Avatar bg="white" cursor="pointer" onClick={e => handleSelect(answer[answer.length - 1])} />
        ))}
    </Flex>
  );
};

export default AnswerSelector;
