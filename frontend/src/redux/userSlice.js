import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem("user");
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
