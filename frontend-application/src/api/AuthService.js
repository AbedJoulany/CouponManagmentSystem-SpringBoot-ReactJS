// AuthService.js
import axios from 'axios';
import {getAuthToken} from "./axiosHelper";

const BASE_URL = 'http://localhost:8080'; // Replace with your backend URL

const AuthService = {
    login: async (email, password, selectedClientType) => {
        const headers = {
            'Authorization': `Bearer ${getAuthToken()}`, // Set the Authorization header
            'Content-Type': 'application/json' // Set the Content-Type header
        };
        const requestData = {
            email,
            password,
            clientType: selectedClientType
        };
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, requestData, { headers });
            return response.data; // Return the JWT token
        } catch (error) {
            throw error; // Throw the error to be caught and handled in the component
        }
    },
};

export default AuthService;
