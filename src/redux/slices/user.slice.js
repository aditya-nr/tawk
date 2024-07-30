import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    token: "",
    username: "",
    name: "",
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            const { token, username, name } = action.payload;

            state.isLoggedIn = true;
            state.token = token;
            state.name = name;
            state.username = username;

            window.localStorage.setItem('auth-token', token);
            window.location.reload();
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.token = '';
            state.name = '';
            state.username = '';
            window.localStorage.setItem('auth-token', '');
            // window.location.reload();
            action.payload?.disconnect();
        }

    }
})

export default userSlice