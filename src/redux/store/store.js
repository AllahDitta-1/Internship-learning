import { configureStore } from '@reduxjs/toolkit';
import authUser from "../counterSlice"
export const store = configureStore({
  reducer: {
   Auth : authUser
  }
});
