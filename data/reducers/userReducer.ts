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
      state.isLogged = true;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
