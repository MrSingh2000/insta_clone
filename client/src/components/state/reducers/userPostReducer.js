import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
};

export const userPostSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        updatePosts: (state, action) => {
            state.value = [...action.payload]
        }
    },
})

// Action creators are generated for each case reducer function
export const { updatePosts } = userPostSlice.actions
export default userPostSlice.reducer