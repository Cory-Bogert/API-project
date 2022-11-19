import { csrfFetch } from "./csrf";

//action types
const READ_SPOTS = 'spots/READ'
const READ_SINGLE_SPOT = 'spots/READ_SINGLE_SPOT'
const CREATE = 'spots/CREATE'
const DELETE = 'spots/DELETE'
// const UPDATE = 'spots/UPDATE'


//action creators
const getAll = spots => ({
    type: READ_SPOTS,
    spots
})

const getOne = spot => ({
    type: READ_SINGLE_SPOT,
    spot
})

const create = spot => ({
    type: CREATE,
    spot
})

const remove = spotId => ({
    type: DELETE,
    spotId
})

//thunks
// read all spots
export const getAllSpots = () => async dispatch => {
    const response = await fetch(`/api/spots`);
    if(response.ok){
        const spotsList = await response.json()
        dispatch(getAll(spotsList))
    }
}

//read one spot
export const getOneSpot = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`)
    if(response.ok){
        const spot = await response.json()
        dispatch(getOne(spot))
    }
}

//create spot
export const createSpot = (imagePayload, payload) => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
        const spot = await response.json();
        const image = await csrfFetch(`/api/spots/${spot.id}/images`,{
            method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(imagePayload)
        })

    if(response.ok && image.ok ){
        dispatch(create(spot));
         return spot
    }

}

//update
export const updateSpot = payload => async dispatch => {
    const response = await csrfFetch(`/api/spots/${payload.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if(response.ok) {
        const spot = await response.json()
        dispatch(create(spot))
        return spot
    }
}

//delete
export const deleteSpot = spotId => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if(response.ok){
        dispatch(remove(spotId))
        return response
    }
}


//reducer
const initialState = {}

const spotsReducer = (state = initialState, action) => {
    switch(action.type){
        case READ_SPOTS:
            const allSpots = {}
            action.spots.Spots.forEach(spot => {
                allSpots[spot.id] = spot
            })
            return {
                ...state,
                ...allSpots
            }

        case READ_SINGLE_SPOT:
            const oneState = {...state}
            oneState[action.spot.id] = action.spot
            return oneState

        case CREATE:
            const createState = {...state}
            createState[action.spot.id] = action.spot
            return createState

        case DELETE:
            const deleteState = {...state}
            delete deleteState[action.spotId]
            return deleteState
        default:
            return state
    }
}

export default spotsReducer
