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
/*********************************************REDUCERS*****************************************************/
const initialState = {};

const reviewsReducer = (state = initialState,action)=>{
    let allReviews = {};
    switch(action.type){
        case READ:
            action.reviews.Reviews.forEach(review =>{
                allReviews[review.id] = review;
            })
            return {
                ...state,
                ...allReviews
            };
            case  CREATE:
            if (!state[action.review.id]) {
                const newState = {
                    ...state,
                    [action.review.id]: action.review
                }
                return newState;
            }
            return {
                ...state,
                [action.review.id]: {
                    ...state[action.review.id],
                    ...action.review
                }
            };
            case REMOVE:
            const newState = { ...state };
            delete newState[action.spotId];
            return newState;
            default:
            return state;
    }
}

export default reviewsReducer;
