import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import api from 'api';
import { useEffect, useState } from 'react';
import Players from '../../../types/player';

type Props = {
  report_id: string;
};

function TabPlayer({ report_id }: Props) {
  const [players, setPlayers] = useState<Players[]>([]);

  useEffect(() => {
    async function fetchReports() {
      const res = await api.get('/report/list_players/' + report_id);
      if (res.status === 200) {
        setPlayers(res.data);
      }
    }
    fetchReports();
  }, [report_id]);

  return (
    <TableContainer minH="60%">
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th isNumeric>Correct answers</Th>
            <Th isNumeric>Final score</Th>
          </Tr>
        </Thead>
        <Tbody>
          {players.map(player => (
            <Tr>
              <Td>{player.name}</Td>
              <Td isNumeric>{player.correct_count}</Td>
              <Td isNumeric>{player.score}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default TabPlayer;
