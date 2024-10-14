// src/api/api.ts
import axios from 'axios';
import {categoryInterface} from "@/interface/categoryInterface";

const API_BASE_URL = 'http://localhost:4000/api/'; // Adjust the base URL as needed
export function createCategoryApi(payloads: categoryInterface) {

    // Get the token from localStorage
    const token = localStorage.getItem('token'); // Adjust the key if necessary

    // Set up the headers
    const headers = {
        Authorization: `Bearer ${token}`, // Add the Bearer token
        'Content-Type': 'application/json', // Ensure the correct content type
    };

    return axios.post(`${API_BASE_URL}v1/categories/create`, payloads, {headers}); // Adjust the endpoint as needed
}

export function fetchingCategoryApi(page: number, limit: number) {
    // Get the token from localStorage
    const token = localStorage.getItem('token'); // Adjust the key if necessary

    // Set up the headers
    const headers = {
        Authorization: `Bearer ${token}`, // Add the Bearer token
        'Content-Type': 'application/json', // Ensure the correct content type
    };

    return axios.get(`${API_BASE_URL}v1/categories?page=${page}&limit=${limit}`, {headers}); // Adjust the endpoint as needed
}


// You can add more API functions here as needed
