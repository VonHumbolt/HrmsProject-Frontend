import { DELETE_USER_INFO, KEEP_USER_DATA } from "../actions/actions";
import { userInfo } from "../initialValues/userInfos";

const initialState = {
    userInfo : userInfo
}

export default function userInfoReducer(state=initialState, {type, payload}){

    switch (type) {
        case KEEP_USER_DATA:
            if(userInfo.userId === payload.userId) {
                return {
                    ...state
                }
            }else {
                return {
                    ...state, 
                    userInfo: {...payload}
                }
            }
        
        case DELETE_USER_INFO:  
            let newUserInfo = {}
            return {
                ...state,
                userInfo: newUserInfo
            }

        default:
           return state;
    }
}