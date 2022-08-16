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
    value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJjYzYzYWIxY2ViNmU5MWRiMmRjMzAyIiwidXNlcm5hbWUiOiJkZW1vIn0sImlhdCI6MTY1OTY4NjUxMX0.LE3ONK3B74B6HSaUYo0gUppAGLqrez6V60xvLqDHz7I"
};

export const authTokenSlice = createSlice({
    name: 'authToken',
    initialState,
    reducers: {
        set: (state, action) => {
            state.value = action.payload.value
        },
        remove: (state) => {
            state.value = ""
        },
    },
})

// Action creators are generated for each case reducer function
export const { set, remove } = authTokenSlice.actions
export default authTokenSlice.reducer