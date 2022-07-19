import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import api from 'api';
import { useEffect, useState } from 'react';
import Questions from '../types/question';

type Props = {
  game_id: string;
};

function TabQuestion({ game_id }: Props) {
  const [questions, setQuestions] = useState<Questions[]>([]);

  useEffect(() => {
    async function fetchReports() {
      const res = await api.get('/report/list_questions/' + game_id);
      if (res.status === 200) {
        setQuestions(res.data);
      }
    }
    fetchReports();
  }, [game_id]);

  return (
    <TableContainer minH="60%">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>Question</Th>
            <Th>Correct Answer</Th>
          </Tr>
        </Thead>
        <Tbody>
          {questions.map(question => (
            <Tr>
              <Td>{question.question_id}</Td>
              <Td>{question.content}</Td>
              <Td>{question.correct_ans}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TabQuestion;
