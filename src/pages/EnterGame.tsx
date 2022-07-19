import { Button, Image, Input } from '@chakra-ui/react';
import api from 'api';
import { useCustomToast } from 'hooks/useCustomToast';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from 'socket/socket-service';
import logo from '../assets/Logo.png';

function Game() {
  const gamePinRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const { toastError } = useCustomToast();
  const navigate = useNavigate();

  async function handleEnterGame() {
    const game = gamePinRef.current?.value;
    const name = nameRef.current?.value;

    if (!game) {
      toastError('Game pin is required');
      return;
    }

    if (!name) {
      toastError('Name is required');
      return;
    }

    const res = await api.get(`/report/reportByPin/${game}`);
    if (res.status === 200) {
      socket.emit('join_game', { report_id: res.data.report_id, name: name });

      navigate(`/waiting/${res.data.report_id}`, {
        state: {
          report: res.data,
        },
      });
    }
  }

  return (
    <div className="w-full h-screen flex justify-center bg-gray-200">
      <div className="w-1/3 flex flex-col items-center justify-center space-y-12 bg-white my-20 rounded-3xl">
        <div>
          <Image h="100" src={logo} />
        </div>
        <div className="w-full px-20 flex flex-col space-y-6">
          <div>
            <Input ref={gamePinRef} type="text" placeholder="Game pin" focusBorderColor="green.300" />
          </div>
          <div>
            <Input ref={nameRef} type="text" placeholder="Enter name" focusBorderColor="green.300" />
          </div>
          <Button backgroundColor="green.600" colorScheme="green" color="white" size="md" onClick={handleEnterGame}>
            Enter
          </Button>
          <Button variant="outline" colorScheme="green" size="md" onClick={() => navigate('/login')}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Game;
