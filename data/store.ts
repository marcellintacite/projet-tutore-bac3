import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import themeReducer from "./reducers/themeReducer";

export default configureStore({
  reducer: {
    user: userReducer,
    theme: themeReducer,
  },
});
