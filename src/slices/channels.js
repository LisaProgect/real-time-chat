import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
    currentChannel: null,
});

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        channelsReceived: (state, action) =>
            channelsAdapter.setAll(state, action.payload),
        channelsUpsertMany: (state, action) =>
            channelsAdapter.upsertMany(state, action.payload),
        setCurrentChannel: (state, action) => {
            state.currentChannel = action.payload;
        },
    },
});

export const { channelsReceived, channelsUpsertMany, setCurrentChannel } =
    channelsSlice.actions;

export default channelsSlice.reducer;

export const { selectAll: selectAllChannels } = channelsAdapter.getSelectors(
    (state) => state.channels
);

export const selectCurrentChannel = (state) => state.channels.currentChannel;
