 import axios from 'axios';
import {countryInterface} from "@/interface/country/CountryInterface";

const API_BASE_URL = 'http://localhost:4000/api/'; // Adjust the base URL as needed
export function createCountryApi(payloads: countryInterface) {

    // Get the token from localStorage
    const token = localStorage.getItem('token'); // Adjust the key if necessary

    // Set up the headers
    const headers = {
        Authorization: `Bearer ${token}`, // Add the Bearer token
        'Content-Type': 'application/json', // Ensure the correct content type
    };

    return axios.post(`${API_BASE_URL}v1/countries/create`, payloads, {headers}); // Adjust the endpoint as needed
}

export function updateCountryApi(payloads: countryInterface) {

    // Get the token from localStorage
    const token = localStorage.getItem('token'); // Adjust the key if necessary

    // Set up the headers
    const headers = {
        Authorization: `Bearer ${token}`, // Add the Bearer token
        'Content-Type': 'application/json', // Ensure the correct content type
    };

    return axios.put(`${API_BASE_URL}v1/countries/${payloads.id}`, payloads, {headers}); // Adjust the endpoint as needed
}

export function deleteCountryApi(payloads: countryInterface) {

    // Get the token from localStorage
    const token = localStorage.getItem('token'); // Adjust the key if necessary

    // Set up the headers
    const headers = {
        Authorization: `Bearer ${token}`, // Add the Bearer token
        'Content-Type': 'application/json', // Ensure the correct content type
    };

    return axios.delete(`${API_BASE_URL}v1/countries/${payloads.id}`, {headers}); // Adjust the endpoint as needed

}

export function fetchingCountryApi(page: number, limit: number, query: { name: string, status: string }) {
    // Get the token from localStorage
    const token = localStorage.getItem('token'); // Adjust the key if necessary

    // Set up the headers
    const headers = {
        Authorization: `Bearer ${token}`, // Add the Bearer token
        'Content-Type': 'application/json', // Ensure the correct content type
    };

    return axios.get(`${API_BASE_URL}v1/countries?page=${page}&limit=${limit}&name=${query.name}&status=${query.status}`, {headers}); // Adjust the endpoint as needed
}


// You can add more API functions here as needed
