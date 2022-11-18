import { csrfFetch } from './csrf';

/*********************************************ACTION TYPES*****************************************************/
export const GET_ALL_REVIEWS = "reviews/GET_ALL_REVIEWS"; //getting all reviews
export const CREATE_ONE = "reviews/CREATE_ONE"; //creating &
export const REMOVE_ONE = 'reviews/REMOVE_ONE';
/*********************************************ACTION CREATOR*****************************************************/
const getReviews = (reviews)=>({

    type: GET_ALL_REVIEWS,
    reviews

});

const postReviews = (review) => ({
    type: CREATE_ONE,
    review
});
const remove = (id) => ({
    type: REMOVE_ONE,
    // itemId,
    id
})
//console.log(reviews)
/*********************************************THUNK*****************************************************/

export const getAllReviewsBySpotId = (id) => async (dispatch) => { //getting all reviews
    const response = await csrfFetch(`/api/spots/${id}/reviews`);

    if (response.ok) {
        const list = await response.json();
        dispatch(getReviews(list))
    }
    return response;
}

export const createReviews = (id,data) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (response.ok) {
        const newReview = await response.json();
        dispatch(postReviews(newReview));
        return newReview
    }
}
export const deleteReview = (id) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        //const {id:deletedItemId} = await response.json();
        dispatch(remove(id));

    }
}
/*********************************************REDUCERS*****************************************************/
const initialState = {};

const reviewsReducer = (state = initialState,action)=>{
    let allReviews = {};
    switch(action.type){
        case GET_ALL_REVIEWS:
            action.reviews.Reviews.forEach(review =>{
                allReviews[review.id] = review;
            })
            return {
                ...allReviews
            };
            case  CREATE_ONE:
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
            case REMOVE_ONE:
            const newState = { ...state };
            delete newState[action.spotId];
            return newState;
            default:
            return state;
    }
}

export default reviewsReducer;
