import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";
// import reducer from "./reducers/bugReducer";
import combinedReducers from "./reducers/combinedReducers";

const store = configureStore({
    reducer: combinedReducers
});

// export const store = configureStore();
// export const store2 = createStore()

export default store;