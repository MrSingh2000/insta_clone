import { combineReducers } from "redux";
import authTokenReducer from "./authTokenReducer";

const reducers = combineReducers({
    authToken: authTokenReducer,
});

export default reducers;