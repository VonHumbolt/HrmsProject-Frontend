import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools, devToolsEnhancer } from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import  thunkMiddleware  from "redux-thunk";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export function configureStore() {
    return createStore(rootReducer, composedEnhancer)
}