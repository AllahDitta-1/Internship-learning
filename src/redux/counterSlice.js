import { createSlice } from '@reduxjs/toolkit';
const savedUser=JSON.parse(localStorage.getItem("users"))||null
const initialState={
  user:savedUser,
  isAuthenticated:!!savedUser
}
const authUser = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload; 
      state.isAuthenticated = true; 
      localStorage.setItem("user",JSON.stringify(action.payload))
    },
  
  logout:(state)=>{
    state.user=null;
    state.isAuthenticated=false;
    localStorage.removeItem("user")
  }
},
});

export const { login ,logout} = authUser.actions;
export default authUser.reducer;
