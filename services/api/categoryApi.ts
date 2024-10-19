// src/api/api.ts
import axios from 'axios';
import {categoryInterface} from "@/interface/category/categoryInterface";

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

export function updateCategoryApi(payloads: categoryInterface) {

    // Get the token from localStorage
    const token = localStorage.getItem('token'); // Adjust the key if necessary

    // Set up the headers
    const headers = {
        Authorization: `Bearer ${token}`, // Add the Bearer token
        'Content-Type': 'application/json', // Ensure the correct content type
    };

    return axios.put(`${API_BASE_URL}v1/categories/${payloads.id}`, payloads, {headers}); // Adjust the endpoint as needed
}

export function deleteCategoryApi(payloads: categoryInterface) {

    // Get the token from localStorage
    const token = localStorage.getItem('token'); // Adjust the key if necessary

    // Set up the headers
    const headers = {
        Authorization: `Bearer ${token}`, // Add the Bearer token
        'Content-Type': 'application/json', // Ensure the correct content type
    };

    return axios.delete(`${API_BASE_URL}v1/categories/${payloads.id}`, {headers}); // Adjust the endpoint as needed

}

export function fetchingCategoryApi(page: number, limit: number, query: { name: string, status: string }) {
    // Get the token from localStorage
    const token = localStorage.getItem('token'); // Adjust the key if necessary

    // Set up the headers
    const headers = {
        Authorization: `Bearer ${token}`, // Add the Bearer token
        'Content-Type': 'application/json', // Ensure the correct content type
    };

    return axios.get(`${API_BASE_URL}v1/categories?page=${page}&limit=${limit}&name=${query.name}&status=${query.status}`, {headers}); // Adjust the endpoint as needed
}


// You can add more API functions here as needed
