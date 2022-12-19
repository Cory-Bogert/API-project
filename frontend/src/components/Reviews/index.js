import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Route, useHistory, useParams } from 'react-router-dom'
import { getAllReviews } from "../../store/reviews";
import { getAllSpots, getOneSpot } from "../../store/SpotsReducer";
import { deleteReview } from "../../store/reviews";
import './reviews.css'

const AllReviews = () => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const history = useHistory()

    let sessionUserId
    if(sessionUser) {
         sessionUserId = sessionUser.id;
    }

    useEffect(() => {
        // dispatch(getOneSpot(spotId))
        dispatch(getAllReviews(spotId))
    }, [dispatch, spotId])

    let currentSpot = useSelector(state => state.spots)
    currentSpot = currentSpot[spotId]
    // console.log(currentSpot, '222222222222---this is current spot----22222222222')



    const allReviews = useSelector(state => Object.values(state.reviews))
    // console.log(allReviews, 'this is all of the reviews88888888888')
    const reviews = allReviews.filter(review => review.spotId === +spotId)

    const handleDelete = async (reviewId) => {
        await dispatch(deleteReview(reviewId))
        dispatch(getAllReviews(spotId))
        dispatch(getAllSpots(spotId))
        history.push(`/spots/${spotId}`)
    }


    return (
        <div className="outter-container-reviews">
            {reviews.map((review) => {
                return (
                    <div className="inner-container-reviews">
                        <div className="">{review.User.firstName}
                        ★{review.stars}
                        {review.review}
                        {sessionUserId === review.userId ?
                        <button className = 'deleteReviewButton' onClick = {() => handleDelete(review.id)}>Delete Review</button> : null}
                        </div>
                    </div>
                )
            })}
        </div>
    )

}

export default AllReviews
