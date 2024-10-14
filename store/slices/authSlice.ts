import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the shape of the authentication state
interface AuthState {
    user: User | null;       // Define User type based on your user structure
    token: string | null;
    loading: boolean;
    error: string | null;
    isLogin: boolean;
}

// Define User type according to your user model
interface User {
    id: string;
    email: string;
    // Add other user properties as needed
}

// Define the type for login credentials
interface LoginCredentials {
    email: string;
    password: string;
}

// Initial state
const initialState: AuthState = {
    user: null,
    token: null,
    loading: false,
    error: null,
    isLogin: false
};

// Create the auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        loginRequest(state, action: PayloadAction<LoginCredentials>) {
            state.loading = true;
            state.error = null; // Clear any previous errors
            state.isLogin = false;
        },
        loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.error = null;
            state.isLogin = true;
        },
        loginFailure(state, action: PayloadAction<string>) {
            console.log(action.payload)
            state.loading = false;
            state.error = action.payload;
            state.isLogin = false;
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.error = null;
            state.isLogin = false;
        },
    },
});

// Export actions and reducer
export const {loginRequest, loginSuccess, loginFailure, logout} = authSlice.actions;
export default authSlice.reducer;
