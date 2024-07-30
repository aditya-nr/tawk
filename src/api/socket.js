const BASE_URL = import.meta.env.VITE_SERVER_URL;
const DEV_ENV = import.meta.env.VITE_DEV;
const token = window.localStorage.getItem('token');



export const socketApi = {
    emitFriendRequest: async (socket, username) => {
        const data = { to: username };
        try {
            let res = await socket.timeout(5000).emitWithAck('friend-request', data);
            return res;
        } catch (error) {
            DEV_ENV && console.log(error);
            return {
                status: 'ERROR',
                message: error.message || 'Something went wrong!'
            }
        }
    },
    emitAcceptFriendRequest: async (socket, username) => {
        const data = { to: username };
        try {
            let res = await socket.timeout(5000).emitWithAck('friend-accept', data);
            return res;
        } catch (error) {
            DEV_ENV && console.log(error);
            return {
                status: 'ERROR',
                message: error.message || 'Something went wrong!'
            }
        }
    },
    emitTextMessage: async (socket, to, text) => {
        const data = { to, text };
        try {
            let res = await socket.timeout(5000).emitWithAck('text-message', data);
            return res;
        } catch (error) {
            DEV_ENV && console.log(error);
            return {
                status: 'ERROR',
                message: error.message || 'Something went wrong!'
            }
        }
    },
    emitFileMessage: async (socket, to, type, key) => {
        const data = { to, type, key };
        try {
            let res = await socket.timeout(5000).emitWithAck('file-message', data);
            return res;
        } catch (error) {
            DEV_ENV && console.log(error);
            return {
                status: 'ERROR',
                message: error.message || 'Something went wrong!'
            }
        }
    },
}