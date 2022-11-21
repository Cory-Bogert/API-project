import { csrfFetch } from './csrf';

//action types
export const READ = "reviews/READ"; //getting all reviews
export const CREATE = "reviews/CREATE"; //creating &
export const REMOVE = 'reviews/REMOVE';
//actions
const getReviews = (reviews)=>({
    type: READ,
    reviews
});

const CreateReview = (review) => ({
    type: CREATE,
    review
});
const remove = (id) => ({
    type: REMOVE,
    // itemId,
    id
})

//thunk

export const getAllReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if(response.ok){
        const reviews = await response.json()
        dispatch(getReviews(reviews))
    }
}


export const createReviews = (payload, spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    if (response.ok) {
        const review = await response.json();
        dispatch(CreateReview(review));
        return review
    }
}
export const deleteReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    dispatch(remove(reviewId))
    return response
}
//Reducer
const initialState = {};

const reviewsReducer = (state = initialState, action)=>{
    let newState = {}
        switch (action.type){
            case READ:
            action.reviews.forEeach(review => newState[review.id] = review)
            return newState
        case REMOVE:
            newState= {...state}
            delete newState[action.reviewId]
            return newState
        case CREATE:
            newState = {...state}
            newState[action.review.id] = action.review
            return newState

        default:
            return state;
        }

 }


export default reviewsReducer;
