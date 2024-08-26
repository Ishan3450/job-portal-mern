import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name: "company",
    initialState: {
        companies: []
    },
    reducers:{
        setCompaniesBulk: (state, action) => {
            state.companies = action.payload;
        }
    },
})

export const {setCompaniesBulk} = companySlice.actions;
export default companySlice.reducer;