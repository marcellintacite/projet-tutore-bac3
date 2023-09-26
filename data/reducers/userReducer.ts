import { userType } from "@/types/data/user";
import { createSlice } from "@reduxjs/toolkit";

const initialState: userType = {
  userId: "",
  username: "",
  email: "",
  isLogged: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.isLogged = window.sessionStorage.getItem("access") ? true : false;
    },
    removeUser(state) {
      state.userId = "";
      state.username = "";
      state.email = "";
      state.isLogged = false;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
