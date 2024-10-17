import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { loginRequest, loginSuccess, loginFailure } from '../slices/authSlice';

// API call function to handle login
function loginApi(credentials) {
    return axios.post('http://localhost:4000/api/v1/admin/login', credentials); // Adjust the API route as needed
}

// Worker Saga: Handles the login request
function* handleLogin(action) {
    try {
        const response = yield call(loginApi, action.payload);
        const { user, token } = response.data;

        // Dispatch success action with user and token
        yield put(loginSuccess({ user, token }));

        // Store the token in localStorage
        localStorage.setItem('token', token);
    } catch (error) {
        console.log(error)
        // Dispatch failure action with error message
        yield put(loginFailure(error.response.data));
    }
}

// Watcher Saga: Watches for loginRequest action
function* authSaga() {
    yield takeLatest(loginRequest.type, handleLogin);
}

export default authSaga;
