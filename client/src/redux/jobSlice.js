import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: {},
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJobDetail: (state, action) => {
      state.singleJob = action.payload;
    },
  },
});

export const { setAllJobs, setSingleJobDetail } = jobSlice.actions;
export default jobSlice.reducer;
