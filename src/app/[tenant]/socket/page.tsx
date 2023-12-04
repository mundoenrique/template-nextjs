import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

const UpdatesPage = () => {
  useEffect(() => {
    // Configurar el cliente de socket.io
    const socket: Socket = io(`${process.env.NEXT_PUBLIC_BASE_URL}/cards/4/movements`);

    // Escuchar actualizaciones desde el servidor
    socket.on('actualizacion', (data: any) => {
      console.log('Actualización recibida:', data);
      // Actualizar la interfaz de usuario según sea necesario
    });

    // Limpiar el socket al desmontar el componente
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Escuchando actualizaciones...</h1>
      {/* Agrega cualquier contenido adicional que desees mostrar */}
    </div>
  );
};

export default UpdatesPage;
