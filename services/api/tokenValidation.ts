import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/'; // Adjust the base URL as needed

const validateToken = async (token: string | null | undefined) => {

    // Send a POST request to the /validate-token endpoint with the token in the Authorization header
    return await axios.post(`${API_BASE_URL}auth/validate-token`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

export default validateToken;
