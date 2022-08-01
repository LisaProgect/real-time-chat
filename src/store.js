import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/auth.js';
import messagesReducer from './slices/messages.js';
import channelsReducer from './slices/channels.js';

export default configureStore({
    reducer: {
        auth: authReducer,
        messages: messagesReducer,
        channels: channelsReducer,
    },
});
