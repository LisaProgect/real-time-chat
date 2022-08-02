import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
    currentChannel: null,
});

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        channelsReceived: channelsAdapter.setAll,
        channelsUpsertMany: channelsAdapter.upsertMany,
        channelRemoved: channelsAdapter.removeOne,
        channelUpdated: channelsAdapter.updateOne,
        setCurrentChannel: (state, action) => {
            state.currentChannel = action.payload;
        },
        channelAdded: channelsAdapter.addOne,
    },
});

export const {
    channelsReceived,
    channelsUpsertMany,
    setCurrentChannel,
    channelRemoved,
    channelUpdated,
    channelAdded,
} = channelsSlice.actions;

export default channelsSlice.reducer;

export const { selectAll: selectAllChannels, selectById: selectChannelById } =
    channelsAdapter.getSelectors((state) => state.channels);

export const selectCurrentChannel = (state) => state.channels.currentChannel;
