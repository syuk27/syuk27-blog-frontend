import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { excuteAuthenticate, expiresAuthenticate } from "../api/user/auth";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: false,
    status: null,
    error: null,
  }, // 초기상태 반드시 추가
  reducers: {
    resetAuth: (state) => {
      state.loading = null;
      state.status = null;
      state.error = null;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  }, // 비동기 처리 불가 -> extraReducers 가능
  extraReducers: (builder) => {
    builder

      .addCase(login.fulfilled, (state, action) => {
        // fulfilled 상태는 createAsyncThunk에서 비동기 작업이 성공하면 자동으로 실행됨
        state.loading = false;
        state.isAuthenticated = true;
        state.status = action.payload; // createAsyncThunk에서 return 한 값
      })

      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.status = action.payload;
      })

      .addMatcher(
        // addMatcher 공통 처리 addClass 뒤에 와야 함
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload; // rejectWithValue
        }
      );
  },
});

// pending → 비동기 요청이 시작되었을 때
// fulfilled → 요청이 성공적으로 완료되었을 때
// rejected → 요청이 실패했을 때

export const login = createAsyncThunk(
  "authenticate/login", // id 역할
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await excuteAuthenticate(credentials);
      console.log("login response", response);
      return response.status;
    } catch (error) {
      console.log("login error", error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const logout = createAsyncThunk("authenticate/logout", async () => {
  const response = await expiresAuthenticate();
  return response.status;
});

export default authSlice.reducer;

export const { resetAuth, setAuthenticated } = authSlice.actions;
