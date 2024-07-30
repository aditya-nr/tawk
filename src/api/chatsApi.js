const BASE_URL = import.meta.env.VITE_SERVER_URL;
const DEV_ENV = import.meta.env.VITE_DEV;

const post = async (url, data) => {
    const token = window.localStorage.getItem('auth-token');
    data.token = token;
    try {
        let res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(data), // Convert the data object to a JSON string
        });

        res = await res.json(); // Parse the response as JSON
        return res;
    } catch (error) {
        throw error;
    }
};

export const chatApi = {
    searchUser: async (data) => {
        try {
            let res = await post(`${BASE_URL}/chat/user-search`, data);
            return res;
        } catch (error) {
            DEV_ENV && console.log(error);
            return {
                status: 'ERROR',
                message: error.message || 'Something went wrong !'
            }
        }
    },
    getUserDetails: async (data) => {
        try {
            let res = await post(`${BASE_URL}/chat/user-details`, data);
            return res;
        } catch (error) {
            DEV_ENV && console.log(error);
            return {
                status: 'ERROR',
                message: error.message || 'Something went wrong !'
            }
        }
    },
    getFriends: async () => {
        const data = {};
        try {
            let res = await post(`${BASE_URL}/chat/get-friends`, data);
            console.log(`getFrineds:: `, res);
            return res;
        } catch (error) {
            DEV_ENV && console.log(error);
            return {
                status: 'ERROR',
                message: error.message || 'Something went wrong !'
            }
        }
    },
    getChats: async (username) => {
        const data = { username };
        try {
            let res = await post(`${BASE_URL}/chat/get-chats`, data);
            console.log(`getChats:: `, res);
            return res;
        } catch (error) {
            DEV_ENV && console.log(error);
            return {
                status: 'ERROR',
                message: error.message || 'Something went wrong !'
            }
        }
    },
    uploadFile: async (file) => {
        try {
            let res = await post(`${BASE_URL}/chat/get-upload-url`, {
                filename: file.name,
                type: file.type
            })
            if (res.status == 'OK') {
                await fetch(res.url, {
                    method: 'PUT',
                    body: file,
                    headers: {
                        'Content-Type': file.type,
                    },
                })

                return {
                    status: 'OK',
                    key: res.key
                }
            }
        } catch (error) {
            console.log(error);
            return {
                status: 'ERROR',
                message: 'Network Error!'
            }
        }
    },
    getFile: async (key) => {
        try {
            let res = await post(`${BASE_URL}/chat/get-file-url`, { key })
            return res;
        } catch (error) {
            console.log(error);
            return {
                status: 'ERROR',
                message: 'Network Error!'
            }
        }
    },
};