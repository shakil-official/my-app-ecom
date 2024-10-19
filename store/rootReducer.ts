import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import categoryReducer from './slices/categorySlice';
import countryReducer from './slices/countrySlice';

// Combine reducers
const rootReducer = combineReducers({
    auth: authReducer,
    category: categoryReducer,
    country: countryReducer,
});

export default rootReducer;
