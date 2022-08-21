// export default function authTokenReducer(state="", action){
//     if(action.type === "set"){
//         return action.payload.value;
//     }
//     else if(action.type === "remove"){
//         return "";
//     }
//     else{
//         return state;
//     }
// }

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: localStorage.getItem("authToken") ? localStorage.getItem("authToken") : ""
};

export const authTokenSlice = createSlice({
    name: 'authToken',
    initialState,
    reducers: {
        setAuthToken: (state, action) => {
            state.value = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setAuthToken } = authTokenSlice.actions
export default authTokenSlice.reducer