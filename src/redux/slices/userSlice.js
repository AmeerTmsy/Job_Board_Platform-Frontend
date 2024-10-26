import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    user:{},
    isLoggedIn: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authenticatUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      
    },
    unAuthenticatUser: (state, action) => {
      state.user = {};
      state.isLoggedIn = false;
    }
  }
})

export const { authenticatUser, unAuthenticatUser } = userSlice.actions

export default userSlice.reducer