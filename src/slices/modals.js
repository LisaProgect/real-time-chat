import { createSlice } from '@reduxjs/toolkit';

const initialState = { id: null, status: false, type: null };
const modalsSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        showModal: (state, action) => {
            const { id, type } = action.payload;
            state.id = id;
            state.type = type;
            state.status = true;
        },
        hideModal: (state) => {
            state.id = null;
            state.status = false;
            state.type = null;
        },
    },
});

export const { showModal, hideModal } = modalsSlice.actions;

export default modalsSlice.reducer;
