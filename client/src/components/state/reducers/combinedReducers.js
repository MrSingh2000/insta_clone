import { combineReducers } from "redux";
import authTokenReducer from "./authTokenReducer";
import postReducer from "./postReducer";
import userPostReducer from "./userPostReducer";
import userDetailsReducer from "./userDetailsReducer";


const reducers = combineReducers({
    authToken: authTokenReducer,
    post: postReducer,
    userPost: userPostReducer,
    userDetails: userDetailsReducer
});

export default reducers;