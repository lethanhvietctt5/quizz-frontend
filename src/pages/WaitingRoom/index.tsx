import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Player from 'types/player';
import api from 'api';
import Game from 'types/game';
import { useAppDispatch, useAppSelector } from 'hooks';
import Question from 'types/question';
import { setHost, setListPlayers, setListQuestions, setReportId } from 'redux/slices/game';
import socket from 'socket/socket-service';
import Report from 'types/report';
import logo from 'assets/Logo.png';

const WaitingRoom = () => {
  const { id: report_id } = useParams();
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [game, setGame] = useState<Game | undefined>(undefined);
  const [questions, setQuestions] = useState<Array<Question>>([]);
  const [report, setReport] = useState<Report | undefined>(undefined);
  const auth = useAppSelector(state => state.auth);
  const gameState = useAppSelector(state => state.game);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on('play', () => {
      navigate('/play');
    });
  }, [socket]);

  useEffect(() => {
    socket.on('new_player', (player: Player) => {
      setPlayers(old => [...old, player]);
    });
  }, []);

  useEffect(() => {
    async function fetchReport() {
      const res = await api.get(`report/${report_id}`);

      if (res.status === 200) {
        setReport(res.data);
      }
    }

    fetchReport();
  }, [report_id]);

  useEffect(() => {
    async function fetchPlayers() {
      const res = await api.get(`report/list_players/${report_id}`);

      if (res.status === 200) {
        setPlayers(res.data);
      }
    }

    fetchPlayers();
  }, [report_id]);

  useEffect(() => {
    async function fetchGame() {
      const res = await api.get(`/game/gameByReport/${report_id}`);
      if (res.status === 200) {
        setGame(res.data);
      }
    }

    if (report_id !== undefined) {
      fetchGame();

      dispatch(setReportId(report_id));
    }
  }, [report_id, dispatch]);

  useEffect(() => {
    async function fetchQuestions() {
      const res = await api.get(`/game/getQuestions/${game?.game_id}`);
      if (res.status === 200) {
        setQuestions(res.data);
      }
    }

    if (game) {
      fetchQuestions();

      if (game.author_id === auth.user_id) {
        dispatch(setHost(true));
      }
    }
  }, [game, dispatch, auth]);

  useEffect(() => {
    dispatch(setListPlayers(players));
  }, [players, dispatch]);

  useEffect(() => {
    dispatch(setListQuestions(questions));
  }, [dispatch, questions]);

  return (
    <div className="w-full min-h-screen bg-green-500 text-white">
      <div className="flex items-center justify-evenly bg-green-600 mb-4 py-3">
        <div className="flex items-center justify-center space-x-5">
          <div className="w-72">
            <img src={logo} alt="" className="w-full" />
          </div>
          <div className="bg-white text-[#333333] rounded-lg border-b-4 px-10 py-3">
            <div className="text-xl mb-[-20px]">Game PIN:</div>
            <div className="text-[67px] mb-[-20px]">{report?.pin_code}</div>
          </div>
        </div>

        {gameState.isHost && gameState.players.length > 0 && (
          <div>
            <button
              className="text-2xl px-[16px] py-3 bg-white text-[#333333] rounded-lg border-b-4"
              onClick={e => {
                socket.emit('play', gameState.reportId);
              }}
            >
              Start
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-center flex-wrap">
        {players.map(player => (
          <div
            key={player.player_id}
            className="bg-green-700 px-[23px] py-[10px] mr-2 mb-2 text-xl text-[28px] font-semibold text-white rounded-md"
          >
            {player.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaitingRoom;
