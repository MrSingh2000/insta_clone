import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false
};

export const loadingSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.value = action.payload.value
        }
    },
})

// Action creators are generated for each case reducer function
export const { setLoading } = loadingSlice.actions
export default loadingSlice.reducer