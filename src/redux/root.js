import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import appSlice from './slices/app.slice.js';
import userSlice from './slices/user.slice.js';
import chatSlice from './slices/chat.slice.js';

// ----------------------------------------------------------------------

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    //   whitelist: [],
    // blacklist: ['app', 'user', 'chat'],
};

// ---------------------------------------------------------------------

const rootReducer = combineReducers({
    app: appSlice.reducer,
    user: userSlice.reducer,
    chat: chatSlice.reducer
});

// ---------------------------------------------------------------------

export { rootPersistConfig, rootReducer };