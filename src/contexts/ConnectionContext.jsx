import React, { createContext, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import { addOneMessage } from '../slices/messages.js';
import { hideModal } from '../slices/modals.js';
import {
    channelAdded,
    channelRemoved,
    channelUpdated,
    setCurrentChannel,
} from '../slices/channels.js';

const ConnectionContext = createContext();

const ConnectionProvider = ({ children }) => {
    const socket = io();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const addNewMessages = (message) => {
        socket.emit('newMessage', message);
    };

    const addNewChannel = (channel) => {
        socket.emit('newChannel', channel);
    };

    const removeChannel = (channelId) => {
        socket.emit('removeChannel', channelId);
    };

    const renameChannel = (channel) => {
        socket.emit('renameChannel', channel);
    };

    socket.on('removeChannel', ({ id }) => {
        dispatch(channelRemoved(id));
        dispatch(setCurrentChannel(1));
        dispatch(hideModal());
        toast.success(t('channel removed'));
    });

    socket.on('renameChannel', ({ id, name }) => {
        dispatch(channelUpdated({ id, changes: { name } }));
        dispatch(hideModal());
        toast.success(t('channel renamed'));
    });

    socket.on('newChannel', (channel) => {
        dispatch(channelAdded({ ...channel }));
        dispatch(hideModal());
        toast.success(t('channel created'));
    });

    socket.on('newMessage', (message) => {
        dispatch(addOneMessage({ ...message }));
    });

    socket.on('disconnect', () => {
        toast.error(t('connection error'));
    });

    const context = useMemo(
        () => ({
            addNewMessages,
            addNewChannel,
            removeChannel,
            renameChannel,
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
