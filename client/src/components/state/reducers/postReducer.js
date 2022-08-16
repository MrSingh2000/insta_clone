import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.value = [...state.value, action.payload.url]
        },
        removePost: (state, action) => {
            state.value = state.value.filter((item) => {
                return item !== action.payload.url
            })
        },
    },
})

// Action creators are generated for each case reducer function
export const { addPost, removePost } = postSlice.actions
export default postSlice.reducer