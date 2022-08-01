import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

import AuthService from '../services/auth.service.js';
import { refreshStatus } from './messages.js';

const user = JSON.parse(localStorage.getItem('user'));

const register =
    (service) =>
    async ({ userName, password }, thunkAPI) => {
        try {
            const data = await service(userName, password);
            thunkAPI.dispatch(refreshStatus());
            return { user: data };
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
    };

export const login = createAsyncThunk(
    'auth/login',
    register(AuthService.login)
);

export const signup = createAsyncThunk(
    'auth/signup',
    register(AuthService.signup)
);

export const logout = createAsyncThunk('auth/logout', async () => {
    await AuthService.logout();
});

const initialState = user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: null };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
            })
            .addCase(login.rejected, (state) => {
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.isLoggedIn = true;
                state.user = action.payload.user;
            })
            .addCase(signup.rejected, (state) => {
                state.isLoggedIn = false;
                state.user = null;
            });
    },
});

export default authSlice.reducer;
