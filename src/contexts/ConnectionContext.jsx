import React, { createContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';

import { addOneMessage } from '../slices/messages.js';

const ConnectionContext = createContext();

const ConnectionProvider = ({ children }) => {
    const socket = io();
    const dispatch = useDispatch();

    const addNewMessages = (message) => {
        socket.emit('newMessage', message);
    };

    socket.on('newMessage', (message) => {
        dispatch(addOneMessage({ ...message }));
    });

    const context = useMemo(
        () => ({
            addNewMessages,
        }),
        [addNewMessages]
    );

    return (
        <ConnectionContext.Provider value={context}>
            {children}
        </ConnectionContext.Provider>
    );
};

export { ConnectionContext, ConnectionProvider };
