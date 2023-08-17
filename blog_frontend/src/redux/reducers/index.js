import {combineReducers} from "redux";

import posts from "./posts"
import AuthReducer from "./AuthReducer";

export default combineReducers({
    posts,
    AuthReducer,
})