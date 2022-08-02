import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
    createSelector,
} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import _ from 'lodash';

import DataService from '../services/data.service.js';
import { channelsUpsertMany, setCurrentChannel } from './channels.js';

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState({
    status: 'idle',
    error: null,
});

export const fetchMessages = createAsyncThunk(
    'messages/fetchMessages',
    async (__, thunkAPI) => {
        try {
            const { messages, channels, currentChannelId } =
                await DataService.getData();
            thunkAPI.dispatch(channelsUpsertMany(channels));
            thunkAPI.dispatch(setCurrentChannel(currentChannelId));
            return messages;
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            toast.error(message);
            return thunkAPI.rejectWithValue();
        }
    }
);

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addOneMessage: messagesAdapter.addOne,
        addMessages: messagesAdapter.addMany,
        refreshStatus: (state) => {
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMessages.fulfilled, (state, actions) => {
                state.status = 'succeeded';
                messagesAdapter.upsertMany(state, actions.payload);
            })
            .addCase(fetchMessages.rejected, (state, actions) => {
                state.status = 'failed';
                state.error = actions.error.message;
            });
    },
});

export const { addOneMessage, addMessages, refreshStatus } =
    messagesSlice.actions;

export default messagesSlice.reducer;

export const { selectAll: selectAllMessages } = messagesAdapter.getSelectors(
    (state) => state.messages
);

export const selectMessageByChannels = createSelector(
    [selectAllMessages, (state, channelId) => channelId],
    (messages, channelId) =>
        messages.filter((message) => message.channel === channelId)
);

export const selectUsersByMessage = createSelector(
    [selectMessageByChannels],
    (messages) => _.uniqBy(messages, 'user.userId').map(({ user }) => user)
);
