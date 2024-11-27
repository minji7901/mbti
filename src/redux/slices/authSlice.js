import { createSlice } from "@reduxjs/toolkit";
import { getUserProfile } from "../../api/auth";

const initialState = {
  isLogin: !!localStorage.getItem("accessToken"),
  user: JSON.parse(localStorage.getItem("user")) || null,
  accessToken: localStorage.getItem("accessToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;

      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.isLogin = false;
      state.user = null;
      state.accessToken = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
    setUser: (state, action) => {
      state.user = action.payload;

      localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;
export default authSlice.reducer;

export const fetchUserInfo = () => async (dispatch) => {
  const userProfile = await getUserProfile();
  if (userProfile) {
    dispatch(setUser(userProfile));
  }
};
