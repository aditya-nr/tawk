import { store, persister } from './store'
import appSlice from './slices/app.slice';
import userSlice from './slices/user.slice';
import chatSlice from './slices/chat.slice';

export { store, persister }
export const { toggleTheme, changeTheme } = appSlice.actions;
export const { login, logout } = userSlice.actions;
export const { setFriends, addFriend, removeFriend, updateFriend, activeChat, activeNewChat, populateChat, pushChat, updateLastSeen } = chatSlice.actions;