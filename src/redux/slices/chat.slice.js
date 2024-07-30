import { createSlice } from "@reduxjs/toolkit";

/**
 * chat=[
        {
            username:string,
            name:string,
            lastSeen:Date,
            avatar:string,
            chat:[]
        }
 * ]
 */
const initialState = {
    friends: [],
    chats: {},
    active: ""
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        // frined request
        setFriends: (state, action) => {
            state.friends = action.payload || [];
        },
        addFriend: (state, action) => {
            state.friends.push(action.payload);
        },
        removeFriend: (state, action) => {
            const data = action.payload;
            state.friends = state.friends.map(el => {
                return el.username != data.username;
            })
        },
        updateFriend: (state, action) => {
            const data = action.payload;
            state.friends = state.friends.map(el => {
                if (el.username == data.username) {
                    return {
                        ...el, status: 'NEW'
                    }
                } else
                    return el;

            })
        },

        // chat
        activeNewChat: (state, action) => {
            const username = action.payload;
            state.friends = state.friends.map(e => {
                if (e.username == username)
                    return { ...e, status: 'FRIEND' };
                else
                    return e;
            });
            state.active = username;
        },
        activeChat: (state, action) => {
            state.active = action.payload;
        },
        populateChat: (state, action) => {
            const { user, data } = action.payload;
            state.chats[user] = data;
            state.friends = state.friends.map(f => {
                if (f.username == user) {
                    return { ...f, messageCount: 0 }
                } else return f;
            })
        },
        pushChat: (state, action) => {
            const { user, data } = action.payload;
            if (state.active != user) {
                state.friends = state.friends.map(e => {
                    if (e.username == user)
                        return { ...e, messageCount: (e.messageCount || 0) + 1, status: 'FRIEND' };
                    else return e;
                })
            } else {
                state.chats[user].push(data);
            }
        },
        updateLastSeen: (state, action) => {
            const { user, lastSeen } = action.payload;
            state.friends = state.friends.map(friend => {
                if (friend.username == user)
                    return { ...friend, lastSeen }
                else return friend;
            })
        }
    }
})

export default chatSlice