import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {}
};

export const userDetailsSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        updateUserDetails: (state, action) => {
            state.value = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { updateUserDetails } = userDetailsSlice.actions
export default userDetailsSlice.reducer