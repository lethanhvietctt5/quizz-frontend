import { io, Socket } from 'socket.io-client';

class SocketService {
  public socket: Socket;

  constructor() {
    this.socket = io('http://localhost:5000', {
      transports: ['websocket'],
      upgrade: false,
    });
  }
}

const socketService = new SocketService();
const { socket } = socketService;

export default socket;
