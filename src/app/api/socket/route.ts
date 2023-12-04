import { Server } from 'socket.io';

export default async function handler(req, res) {
  // Configurar el servidor de socket.io
  const io = new Server();

  // Obtener el mensaje de la solicitud (puedes ajustar esto según tus necesidades)
  const data = req.body;

  // Emitir la actualización a todos los clientes conectados
  io.emit('actualizacion', data);

  res.status(200).json({ message: 'Actualización enviada con éxito' });
}
