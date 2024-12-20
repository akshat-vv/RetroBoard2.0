import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';

// Function to save state to sessionStorage
const saveToSessionStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem('reduxState', serializedState);
    } catch (error) {
        console.error('Could not save state to sessionStorage:', error);
    }
};

// Function to load state from sessionStorage
const loadFromSessionStorage = () => {
    try {
        const serializedState = sessionStorage.getItem('reduxState');
        if (!serializedState) return undefined; // Return undefined for initial state
        return JSON.parse(serializedState);
    } catch (error) {
        console.error('Could not load state from sessionStorage:', error);
        return undefined;
    }
};

// Load the persisted state
const persistedState = loadFromSessionStorage();

// Create the Redux store
export const store = configureStore({
    reducer: {
        user: userReducer,
    },
    preloadedState: persistedState, // Load persisted state here
});

// Subscribe to store changes and save to sessionStorage
store.subscribe(() => {
  saveToSessionStorage(store.getState()); // Save the complete state
});
