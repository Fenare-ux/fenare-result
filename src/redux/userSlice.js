// redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: null,  // { ad, soyad, email, unvan, kartNomresi }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signUp: (state, action) => {
      state.userInfo = action.payload;
      // LocalStorage-a da yazaq ki, yadda saxlanılsın
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    loadUserFromStorage: (state) => {
      const storedUser = localStorage.getItem('userInfo');
      if (storedUser) {
        state.userInfo = JSON.parse(storedUser);
      }
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    }
  }
});

export const { signUp, loadUserFromStorage, logout } = userSlice.actions;

export default userSlice.reducer;
