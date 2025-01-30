// context/socket-context.tsx
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { connectSocket } from '../lib/socket';
import type { Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Only run on client side
    const user = JSON.parse(window.localStorage.getItem('user')!)
    console.log(user)
    
    if (user) {
      const newSocket =  connectSocket(user?.id);
      setSocket(newSocket);
    }
  }, []);
console.log(socket , "socket here ===============>")
  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  
//   if (socket == undefined) {
//     throw new Error('useSocket must be used within a SocketProvider');
//   }
  
  return socket;
};  