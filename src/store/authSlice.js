import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null }; // 초기 상태 설정

const authSlice = createSlice({
    name: "auth",
    initialState, //반드시 추가!
    reducers: {
      login: (state, action) => {
        state.user = action.payload;
      },
      logout: (state) => {
        state.user = null;
      },
    },
  });
  
  export const { login, logout } = authSlice.actions;

export default authSlice.reducer;