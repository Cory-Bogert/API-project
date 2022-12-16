import { csrfFetch } from './csrf';


//action types
export const READ_REVIEWS = "reviews/READ_REVIEWS";
export const CREATE_REVIEW = "reviews/CREATE_REVIEW";
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW';
//actions

const getReviews = (reviews)=>({
    type: READ_REVIEWS,
    reviews
});

const createReview = (review) => ({
    type: CREATE_REVIEW,
    review

});
const removeReview = (review) => ({
    type: DELETE_REVIEW,
    review
})

//thunk

export const getAllReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)
    if(response.ok){
        const reviewsList = await response.json()
        // console.log(reviewsList, '************************')
        dispatch(getReviews(reviewsList))
    }

}


export const createReviews = (payload) => async dispatch => {
    let spotId = payload.spotId
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
             'Content-Type': 'application/json'
            },
        body: JSON.stringify(payload)
    })

    if(response.ok){
        const review = await response.json()
        dispatch(createReview(review))
        return review
    }
}



export const deleteReview = (reviewId) => async dispatch => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });
    if(response.ok){
        dispatch(removeReview(reviewId))
    }
}


//Reducer
const initialState = {};

const reviewsReducer = (state = initialState, action)=>{
        switch (action.type){
            case READ_REVIEWS:
            const spotReviews = {}
            action.reviews.Reviews.forEach(review => spotReviews[review.id] = review)
            // console.log(spotReviews, '888888888888888888888')
            return {...spotReviews}
        case DELETE_REVIEW:
            let deletedReview= {...state}
            delete deletedReview[action.reviewId]
            return deletedReview
        case CREATE_REVIEW:
            let createdReview = {...state}
            createdReview[action.review.id] = action.review
            return createdReview

        default:
            return state;
        }

 }


export default reviewsReducer;
