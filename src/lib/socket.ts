// lib/socket.ts
import io, { Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const connectSocket = (token: string) => {
 
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    //   autoConnect:false
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) throw new Error('Socket not initialized!');
  return socket;
};