import axios from 'axios';
import { Server, Socket } from 'socket.io';

const sockets: Record<string, Socket> = {};

export default function handler(req: any, res: any) {
  if (res.socket.server.io) {
    console.log('Server already started!');
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: '/api/my_socket',
  });
  res.socket.server.io = io;

  const onConnection = (socket: Socket) => {
    console.log('Usuario conectado:', socket.id);
    // Store the socket in an object for later reference
    sockets[socket.id] = socket;

    // Manejar eventos
    socket.on('disconnect', () => {
      console.log('Usuario desconectado:', socket.id);
      delete sockets[socket.id];
    });

    socket.on('msjClient', (message) => {
      console.log('Mensaje del cliente:', message);
      io.emit('msjServer', message);
    });
  };

  io.on('connection', onConnection);

  console.log('Socket server started successfully!');
  res.end();
}
