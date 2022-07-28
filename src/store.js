import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth.js';
import messageReducer from './slices/message.js';

export default configureStore({
    reducer: {
        auth: authReducer,
        message: messageReducer,
    },
});
