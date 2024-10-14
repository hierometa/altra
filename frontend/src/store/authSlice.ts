import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  uid: number | null;
  email: string | null;
  name: string | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  uid: null,
  email: null,
  name: null,
};

const localStorageTokenKey = import.meta.env.VITE_TOKEN_KEY_LOCAL || 'tok123';
const localStorageUserKey = import.meta.env.VITE_USER_KEY_LOCAL || 'use321';

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<string>) => {
      // console.log('loginSuccess---action', action);
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem(localStorageTokenKey, action.payload); // For persistence/hydration
      
      const userInfo = localStorage.getItem(localStorageUserKey);
      if (userInfo) {
        const parsedUser = JSON.parse(userInfo);
        state.uid = parsedUser.uid;
        state.email = parsedUser.email;
        state.name = parsedUser.name;
      }
    },
    setUserData: (
      state, 
      action: PayloadAction<{ uid: number; email: string; name: string }>
    ) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.name = action.payload.name;
      localStorage.setItem(localStorageUserKey, JSON.stringify({
        uid: action.payload.uid,
        email: action.payload.email,
        name: action.payload.name,
      }));
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem(localStorageTokenKey);
      localStorage.removeItem(localStorageUserKey);
    },
  },
});

export const { loginSuccess, logout, setUserData } = authSlice.actions;

export default authSlice.reducer;