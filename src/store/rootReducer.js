import { combineReducers } from "redux";
import favoriteJobReducer from "./reducers/favoriteJobReducer";
import userInfoReducer from "./reducers/userInfoReducer";

const rootReducer = combineReducers({
    user : userInfoReducer,
    favoritesJob: favoriteJobReducer
})

export default rootReducer;