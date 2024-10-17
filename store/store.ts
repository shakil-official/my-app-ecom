import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer'; // Import the root reducer
import rootSaga from "@/store/sagas";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the Redux store
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// Run the root saga
sagaMiddleware.run(rootSaga);

// Define the RootState type based on the store's state
export type RootState = ReturnType<typeof store.getState>;

// Export the store
export default store;
