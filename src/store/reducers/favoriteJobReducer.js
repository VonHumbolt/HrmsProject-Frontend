import axios from 'axios';
import {  ADD_FAVORITE, DELETE_FAVORITE, GET_FAVORITE } from '../actions/actions';

const initialState = [
    
]

export default function favoriteJobReducer(state = initialState, {type, payload}) {
    
    switch (type) {
        case ADD_FAVORITE:
            return [... state.favoritesJob.payload, payload]
            

        case DELETE_FAVORITE:
            let favoritejobs = state.favoritesJob.filter((f) => f.advertId !== payload.advertId) 
            return {
                favoritejobs
            }
        case GET_FAVORITE:
            return {
                payload
            }
        default:
            return state;
    }
}

export async function getAllFavorites(dispatch, getState) {
    await axios.get("http://localhost:8080/api/favoriteJobAdverts/getFavoriteJobAdvertByJobSeekerId?jobSeekerId=1").then(
        response => dispatch({type:GET_FAVORITE, payload: response.data.data})
       
    )
}

export function saveJobAdvertToFavorite(jobAdvert) {
    console.log(jobAdvert)
    
    return async function saveFavoriteJobIntoDb(dispatch, getState) {
        console.log([...getState().favoritesJob.payload , jobAdvert])

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

