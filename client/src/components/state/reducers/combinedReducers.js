import { combineReducers } from "redux";
import authTokenReducer from "./authTokenReducer";
import postReducer from "./postReducer";
import userPostReducer from "./userPostReducer";
import userDetailsReducer from "./userDetailsReducer";
import loadingReducer from "./loadingReducer";


const reducers = combineReducers({
    authToken: authTokenReducer,
    post: postReducer,
    userPost: userPostReducer,
    userDetails: userDetailsReducer,
    loading: loadingReducer,
});

export default reducers;