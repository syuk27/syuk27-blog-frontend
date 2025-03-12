import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, getUser } from "../api/user/user";
import { setAuthenticated } from "./authSlice";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    status: null,
    user: null,
    error: null,
  },
  reducers: {
    resetUser: (state) => {
      (state.loading = false), (state.status = null);
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = action.payload;
      })

      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          console.log("userSlice/rejected", state, action);
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const registerUser = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await createUser(userData);
      console.log("registerUser", response);
      return response.status;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetch",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await getUser();
      console.log("fetchUser", response);
      dispatch(setAuthenticated(true));
      return response.data;
    } catch (error) {
      console.log("fetchUser error", error);
      dispatch(setAuthenticated(false));
      return rejectWithValue(error.response?.data);
    }
  }
);

export default userSlice.reducer;

export const { resetUser } = userSlice.actions;
