import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import api from "api";
import { useAppSelector } from "hooks";
import React, { useEffect, useState } from "react";
import { default as dayjs } from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import Game from "types/game";
import { EditIcon } from "@chakra-ui/icons";

dayjs.extend(localizedFormat);

function Library() {
  const auth = useAppSelector((state) => state.auth);
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    async function fetchAllGames() {
      const res = await api.get("/game/all_games/" + auth.user_id);

      if (res.status === 200) {
        setGames(res.data);
      }
    }

    fetchAllGames();
  }, [auth]);
  return (
    <Box w="60%" mx="auto" mt="10">
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Quizz title</Th>
              <Th>Created at</Th>
              <Th>Edit</Th>
            </Tr>
          </Thead>
          <Tbody>
            {games.map((game) => (
              <Tr>
                <Td>{game.name}</Td>
                <Td>{dayjs(game.created_at).format("MMM D, h:mm A	")} </Td>
                <Td>
                  <Tooltip hasArrow label="Edit this game">
                    <EditIcon cursor="pointer" />
                  </Tooltip>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Library;
