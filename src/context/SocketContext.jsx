import React, { createContext, useContext, useEffect, useState } from 'react'
import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);

const createSocket = () => {
    const token = window.localStorage.getItem('auth-token');
    if (!token) return null;
    return io(BASE_URL, {
        auth: { token },
        // withCredentials: true,
    })
}


const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        setSocket(createSocket());

        return () => {
            socket?.disconnect();
        }
    }, [])
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider