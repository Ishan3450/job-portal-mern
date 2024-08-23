import authSlice from "./authSlice";
import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "./jobSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    job: jobSlice,
  },
});

export default store;
