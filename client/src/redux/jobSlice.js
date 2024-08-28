import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    singleJob: {},
    appliedJobs: [],
    jobSearchKeyword: ""
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJobDetail: (state, action) => {
      state.singleJob = action.payload;
    },
    setAppliedJobs: (state, action) => {
      state.appliedJobs = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.jobSearchKeyword = action.payload;
    }
  },
});

export const { setAllJobs, setSingleJobDetail, setAppliedJobs, setSearchQuery } = jobSlice.actions;
export default jobSlice.reducer;
