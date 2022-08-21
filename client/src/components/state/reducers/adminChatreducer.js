import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
};

export const adminChatSlice = createSlice({
    name: 'authToken',
    initialState,
    reducers: {
        updateAdminChat: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateAdminChat } = adminChatSlice.actions
export default adminChatSlice.reducer