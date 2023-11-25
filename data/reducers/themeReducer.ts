import { createSlice } from "@reduxjs/toolkit";

type themeType = "light" | "dark" | "cupcake";
const initialState: themeType = "light";
const themeSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setTheme(state, action) {
      state = action.payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
