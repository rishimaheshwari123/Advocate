import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import companySlice from "./companySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    company: companySlice,
  },
});

export default store;
