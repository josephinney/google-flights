import axios from 'axios'

const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'sky-scrapper.p.rapidapi.com';

export const apiClient = axios.create({
    baseURL: `https://sky-scrapper.p.rapidapi.com/api/v1`,
    headers: {
        'x-rapidapi-key': RAPIDAPI_KEY,
        'x-rapidapi-host': RAPIDAPI_HOST,
        'Content-Type': 'application/json',
    },
});

// Interceptors for centralized error handling or in case need i them
apiClient.interceptors.response.use(
    (response) => response, 
    (error) => {
        
        console.error('API Error:', error.response?.data || error.message);
        
        return Promise.reject(error);
    }
);