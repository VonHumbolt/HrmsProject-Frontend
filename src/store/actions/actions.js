
export const KEEP_USER_DATA = "KEEP_USER_DATA";
export const DELETE_USER_INFO = "DELETE_USER_INFO";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const DELETE_FAVORITE = "DELETE_FAVORITE";
export const GET_FAVORITE = "GET_FAVORITE";


export function addUserInfo(user) {
    return {
        type: KEEP_USER_DATA,
        payload: user
    }
}

export function deleteUserInfo(user) {
    return {
        type: DELETE_USER_INFO,
        payload: user
    }
}
