import { combineReducers } from "redux";
import authTokenReducer from "./authTokenReducer";
import postReducer from "./postReducer";
import userPostReducer from "./userPostReducer";
import userDetailsReducer from "./userDetailsReducer";
import loadingReducer from "./loadingReducer";
import adminChatreducer from "./adminChatreducer";


const reducers = combineReducers({
    authToken: authTokenReducer,
    post: postReducer,
    userPost: userPostReducer,
    userDetails: userDetailsReducer,
    loading: loadingReducer,
    adminChat: adminChatreducer
});

export default reducers;