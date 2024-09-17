/* eslint-disable no-unused-vars */
import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    Login(state) {
      state.isLoggedIn = true;
    },
    Logout(state) {
      state.isLoggedIn = false;
    }
  }
});

export const authActions = authSlice.actions;
export const store = configureStore({
  reducer: authSlice.reducer,
});
