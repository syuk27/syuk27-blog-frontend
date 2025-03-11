import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUser, getUser } from "../api/user/user";

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {},
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
      console.log("registerUser", response)
      return response.status;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUser();
      return response.data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export default userSlice.reducer;
