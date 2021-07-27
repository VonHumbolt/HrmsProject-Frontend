import axios from 'axios';
import {  ADD_FAVORITE, DELETE_FAVORITE, GET_FAVORITE } from '../actions/actions';
import {favoriteJobs} from "../initialValues/favoriteJobs"

const initialState = {
    favoriteJobs: favoriteJobs
}

export default function favoriteJobReducer(state = initialState, {type, payload}) {
    
    switch (type) {
        case ADD_FAVORITE:
            return {
                favoriteJobs: [...state.favoriteJobs, payload]
            }

        case DELETE_FAVORITE:
            let filteredAdvert = state.favoriteJobs.filter((f) => f.advertId !== payload.advertId) 
            return {
                favoriteJobs: filteredAdvert
            }
        case GET_FAVORITE:
            return {
                ...state,
                favoriteJobs: payload
            }
        default:
            return state;
    }
}

export function getAllFavorites(user){
    return async function getAll(dispatch, getState) {
        await axios.get("http://localhost:8080/api/favoriteJobAdverts/getFavoriteJobAdvertByJobSeekerId?jobSeekerId="+user.userId).then(
            response => dispatch({type:GET_FAVORITE, payload: response.data.data})
           
        )
    }
    
}

export function saveJobAdvertToFavorite(jobAdvert) {
    
    return async function saveFavoriteJobIntoDb(dispatch, getState) {
        await axios.post("http://localhost:8080/api/favoriteJobAdverts/add", jobAdvert).then(
            response => dispatch({type: ADD_FAVORITE, payload: jobAdvert})
        )
    }
}

export function deleteJobAdvertToFavorite(jobAdvert) {
    
    return async function deleteFavoriteJobIntoDb(dispatch, getState) {
        await axios.post("http://localhost:8080/api/favoriteJobAdverts/delete", jobAdvert).then(
            response => dispatch({type: DELETE_FAVORITE, payload: jobAdvert})
        )
    }
}

