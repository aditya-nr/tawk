const BASE_URL = import.meta.env.VITE_SERVER_URL;
const DEV_ENV = import.meta.env.VITE_DEV;
const post = async (url, data) => {
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

export const authApi = {
    register: async (data) => {
        data.mode = 'EMAIL'
        try {
            let res = await post(`${BASE_URL}/auth/register`, data);
            return res;
        } catch (error) {
            DEV_ENV && console.log(error);
            return {
                status: 'ERROR',
                message: error.message || 'Something went wrong !'
            }
        }
    },
    isUsernameAvilable: async (username) => {
        const data = { username };
        try {
            let res = await post(`${BASE_URL}/auth/username-avilable`, data);
            return res.status == 'OK';
        } catch (error) {
            DEV_ENV && console.log(error);
            return {
                status: 'ERROR',
                message: error.message || 'Something went wrong !'
            }
        }
    },
    requestOtp: async (email) => {
        const data = { email, mode: 'EMAIL' };
        try {
            let res = await post(`${BASE_URL}/auth/otp`, data);
            return res;
        } catch (error) {
            DEV_ENV && console.log(error);
            return {
                status: 'ERROR',
                message: error.message || 'Something went wrong !'
            }
        }
    },
    login: async (username, password) => {
        const data = { username, password };
        try {
            let res = await post(`${BASE_URL}/auth/login`, data);
            return res;
        } catch (error) {
            DEV_ENV && console.log(error);
            return {
                status: 'ERROR',
                message: error.message || 'Something went wrong !'
            }
        }
    }
};