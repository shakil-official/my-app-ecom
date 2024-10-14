import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
});

export default rootReducer;
