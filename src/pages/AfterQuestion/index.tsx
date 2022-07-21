import { Box, Table, TableContainer, Tbody, Td, Thead, Tr } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nextQuesion, removePlayer, resetGame, setListPlayers } from 'redux/slices/game';
import socket from 'socket/socket-service';
import Player from 'types/player';

const AfterQuestion = () => {
  const game = useAppSelector(state => state.game);
  const [rank, setRank] = useState<number>(0);
  const dispatch = useAppDispatch();
  const [player, setPlayer] = useState<Player | undefined>();
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit('update_players', game.reportId);
  }, [game.reportId]);

  useEffect(() => {
    socket.on('update_players', (players: Array<Player>) => {
      if (players) {
        dispatch(setListPlayers(players));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    socket.on('end_game', () => {
      navigate('/', { replace: true });
    });

    socket.on('player_leave', (player_id: string) => {
      dispatch(removePlayer(player_id));
    });
  }, []);

  useEffect(() => {
    for (let i = 0; i < game.players.length; i++) {
      if (game.players[i].player_id === socket.id) {
        setRank(i + 1);
        setPlayer(game.players[i]);
        break;
      }
    }
  }, [game, socket]);

  useEffect(() => {
    socket.on('next_question', () => {
      dispatch(nextQuesion());
      navigate('/play', {
        replace: true,
      });
    });
  }, []);

  useEffect(() => {
    if (game.currentQuestion === game.questions.length - 1) {
      socket.emit('end_game', game.reportId);
    }
  }, [game.reportId, game.questions, game.currentQuestion]);

  if (!game.isHost && game.currentQuestion < game.questions.length - 1) {
    if (game.currentAns.length > 0 && game.questions[game.currentQuestion].correct_ans.includes(game.currentAns)) {
      return (
        <div className="w-full h-screen flex justify-center items-center bg-green-500">
          <div>
            <div className="w-full text-center text-7xl mb-10">{rank} th</div>
            <div className="w-min mx-auto rounded-full px-10 py-10 bg-white text-green-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="5em"
                height="5em"
                viewBox="0 0 48 48"
              >
                <mask id="IconifyId18207a8920bff12ab37">
                  <path
                    fill="#fff"
                    fillRule="evenodd"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="m4 24l5-5l10 10L39 9l5 5l-25 25L4 24Z"
                    clipRule="evenodd"
                  ></path>
                </mask>
                <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#IconifyId18207a8920bff12ab37)"></path>
              </svg>
            </div>
            <div className="text-white text-3xl mt-10">Correct Answer</div>
            <div className="w-full text-center text-2xl">Score: {player?.score} </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="w-full h-screen flex justify-center items-center bg-green-500">
          <div>
            <div className="w-full text-center text-7xl mb-10">{rank} th</div>
            <div className="w-min mx-auto text-9xl text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="1em"
                height="1em"
                viewBox="0 0 48 48"
                className="bg-white rounded-full w-min"
              >
                <path
                  fill="currentColor"
                  d="M24 4c11.046 0 20 8.954 20 20s-8.954 20-20 20S4 35.046 4 24S12.954 4 24 4Zm-6.116 12.116l-.102-.091a1.25 1.25 0 0 0-1.564 0l-.102.091l-.091.102a1.25 1.25 0 0 0 0 1.564l.091.102L22.233 24l-6.117 6.116l-.091.102a1.25 1.25 0 0 0 0 1.564l.091.102l.102.091a1.25 1.25 0 0 0 1.564 0l.102-.091L24 25.767l6.116 6.117l.102.091a1.25 1.25 0 0 0 1.564 0l.102-.091l.091-.102a1.25 1.25 0 0 0 0-1.564l-.091-.102L25.767 24l6.117-6.116l.091-.102a1.25 1.25 0 0 0 0-1.564l-.091-.102l-.102-.091a1.25 1.25 0 0 0-1.564 0l-.102.091L24 22.233l-6.116-6.117l-.102-.091l.102.091Z"
                ></path>
              </svg>
            </div>
            <div className="text-white text-3xl mt-10">Wrong Answer</div>
            <div className="w-full text-center text-2xl">Score: {player?.score} </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="w-full min-h-screen bg-green-500">
      <div className="w-full text-center text-4xl py-10 text-white">
        Score Board ({game.currentQuestion + 1} / {game.questions.length})
      </div>
      <div className="flex justify-center">
        {game.currentQuestion < game.questions.length - 1 ? (
          game.isHost && (
            <button
              className="text-2xl px-[16px] py-3 bg-white text-[#333333] rounded-lg border-b-4"
              onClick={e => {
                socket.emit('next', game.reportId);
              }}
            >
              Next
            </button>
          )
        ) : game.isHost ? (
          <button
            className="text-2xl px-[16px] py-3 bg-white text-[#333333] rounded-lg border-b-4"
            onClick={e => {
              navigate('/library', { replace: true });
              dispatch(resetGame());
            }}
          >
            Go to Library
          </button>
        ) : (
          <button
            className="text-2xl px-[16px] py-3 bg-white text-[#333333] rounded-lg border-b-4"
            onClick={e => {
              navigate('/');
              dispatch(resetGame());
            }}
          >
            Home
          </button>
        )}
      </div>
      <Box w="60%" mx="auto">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Td className="text-gray-600">Rank</Td>
                <Td className="text-gray-600">Player Name</Td>
                <Td className="text-gray-600">Score</Td>
              </Tr>
            </Thead>
            <Tbody className="text-white">
              {game.players &&
                game.players.map((player, index) => (
                  <Tr
                    _hover={{
                      color: 'green',
                    }}
                    key={player.player_id}
                  >
                    <Td>{index + 1}</Td>
                    <Td>{player.name}</Td>
                    <Td>{player.score}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};

export default AfterQuestion;
