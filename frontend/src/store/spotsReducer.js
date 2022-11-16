import { csrfFetch } from "./csrf";

export const GETALL_SPOTS = "spots/GETALL_SPOTS"
export const UPDATE_SPOT = "spots/UPDATE_SPOT"
export const REMOVE_SPOT = "spots/REMOVE_SPOT"
export const ADD_SPOT = "spots/ADD_SPOT"


const get = (spots) => ({
    type: GETALL_SPOTS,
    spots,
})

const update = (spot) => ({
    type: UPDATE_SPOT,
    spot
})

const remove = (spotId) => ({
    type: REMOVE_SPOT,
    spotId
})

const add = (spot) => ({
    type: ADD_SPOT,
    spot
})

export const getAllSpots = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots')

    if(response.ok){
        const list = await response.json()
        dispatch(get(list))
    }
    return response
}

export const updateSpot = (payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if(response.ok){
        const updatedSpot = await response.json();
        dispatch(update(updatedSpot))
        return updatedSpot
    }
}

export const createSpot = (image, data) => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })

    const newSpot = await response.json();
    const imageResponse = await csrfFetch(`/api/spots/${newSpot.id}/images`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(image)
    })

    if(response.ok && imageResponse.ok){
        dispatch(add(newSpot))
        return newSpot
    }
}

export const deleteSpot = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
    if(response.ok){
        dispatch(remove(spotId))
    }
}

const initialState = {};

const spotsReducer = (state = initialState, action) => {
    let allSpots = {};
    switch (action.type) {
        case GETALL_SPOTS:


            action.spots.Spots.forEach(spot => {
                allSpots[spot.id] = spot;
            })
            return {
                ...state,
                ...allSpots
            };
        case ADD_SPOT:
            if (!state[action.spot.id]) {
                const newState = {
                    ...state,
                    [action.spot.id]: action.spot
                }
                return newState;
            }
            return {
                ...state,
                [action.spot.id]: {
                    ...state[action.spot.id],
                    ...action.spot
                }
            };
            case  REMOVE_SPOT:
            if (!state[action.spot.id]) {
                const newState = {
                    ...state,
                    [action.spot.id]: action.spot
                }
                return newState;
            }
            return {
                ...state,
                [action.spot.id]: {
                    ...state[action.spot.id],
                    ...action.spot
                }
            };
        case REMOVE_SPOT:
            const newState = { ...state };
            delete newState[action.spotId];
            return newState;
        default:
            return state;
    }
}

export default spotsReducer
