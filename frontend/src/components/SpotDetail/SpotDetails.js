import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import UpdateSpotForm from '../UpdateSpotForm';
// import { deleteSpot } from '../../store/spots';
import { useHistory } from 'react-router-dom';
// import AllReviewsSpot from '../AllReviewsSpot';
// import CreateReview from '../CreateReview';
import { getAllSpots } from "../../store/SpotsReducer";
// import { getReviews } from '../../store/reviews';
import { getAllReviewsBySpotId } from '../../store/ReviewsReducer';

const SpotDetails = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user)
    const reviews = useSelector(state => Object.values(state.reviews))
    const allReviews = useSelector(state => Object.values(state.reviews))
    const reviewsArr = reviews.filter(review => review.spotId === +spotId)
    const allSpots = useSelector(state => Object.values(state.spot))
    const spot = allSpots.find(spot => spot.id === +spot.id)

    let currentReviews = []
    let sessionUserId

    if(sessionUser){
        sessionUserId = sessionUser.id;
    }

    const userReview = reviewsArr.filter(oneReview => oneReview.userId === sessionUserId)


    useEffect(() => {
        dispatch((getAllSpots()))
        dispatch((getAllReviewsBySpotId(spotId)))
    }, dispatch)


}

export default SpotDetails
