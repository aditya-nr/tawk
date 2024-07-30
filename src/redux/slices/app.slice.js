import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    theme: 'init'
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        toggleTheme: (state, action) => {
            state.theme = state.theme == 'light' ? 'dark' : 'light';
        },
        changeTheme: (state, action) => {
            if (state.theme == 'init')
                state.theme = action.payload
        }
    }
})

export default appSlice