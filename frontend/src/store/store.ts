import { configureStore } from '@reduxjs/toolkit';
import invoicesReducer from './invoicesSlice';
import authReducer, { loginSuccess } from './authSlice'; 

export const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    auth: authReducer, 
  },
});

const localStorageTokenKey = import.meta.env.VITE_TOKEN_KEY_LOCAL || 'tok123';
const token = localStorage.getItem(localStorageTokenKey);
if (token) {
  store.dispatch(loginSuccess(token)); // Hydrate Redux state with token if it exists
}


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;