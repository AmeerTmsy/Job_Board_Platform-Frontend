import { createSlice } from '@reduxjs/toolkit'

let initialState = {
    employeeSavedJobs:[],
    LoadingEmployeeSavedJobs:true
}

export const employeeSavedJobsSlice = createSlice({
  name: 'employeeSavedJobs',
  initialState,
  reducers: {
    setEmployeeSavedJobs: (state, action) => {
      
      state.employeeSavedJobs = action.payload;
      // console.log("action.payload", action.payload);
      // console.log("state.employeeSavedJobs", state.employeeSavedJobs);
    }
  }
})

export const { setEmployeeSavedJobs } = employeeSavedJobsSlice.actions

export default employeeSavedJobsSlice.reducer