import { userType } from "@/types/data/user";
import { createSlice } from "@reduxjs/toolkit";

const initialState: userType = {
  userId: "",
  username: sessionStorage.getItem("username") || "",
  email: "",
  userRole: sessionStorage.getItem("user_type") || "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.userRole = action.payload.userRole;
    },
    removeUser(state) {
      state.userId = "";
      state.username = "";
      state.email = "";
      state.userRole = "";
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
