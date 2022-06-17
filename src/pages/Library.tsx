import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { default as dayjs } from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { EditIcon } from "@chakra-ui/icons";
import { ImRocket } from "react-icons/im";
import Game from "types/game";
import api from "api";
import { useAppSelector } from "hooks";
import { Link } from "react-router-dom";

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
              <Th>Start game</Th>
            </Tr>
          </Thead>
          <Tbody>
            {games.map((game) => (
              <Tr
                _hover={{
                  color: "green",
                }}
              >
                <Td>{game.name}</Td>
                <Td>{dayjs(game.created_at).format("MMM D, h:mm A	")} </Td>
                <Td>
                  <Tooltip hasArrow label="Edit this game">
                    <Link to={`/edit/${game.game_id}`}>
                      <EditIcon />
                    </Link>
                  </Tooltip>
                </Td>
                <Td>
                  <Button colorScheme="red" leftIcon={<ImRocket />} size="sm">
                    Start
                  </Button>
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
