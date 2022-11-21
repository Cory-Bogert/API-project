import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Route, useParams } from 'react-router-dom'
import { deleteReview, getAllReviews } from "../../store/ReviewsReducer";
import { getAllSpots, getOneSpot } from "../../store/SpotsReducer";
import { deleteReview } from "../../store/ReviewsReducer";

const AllReviews = () => {
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const spotsArr = useSelector(state => Object.values(state.spots))
    const spot = spotsArr.find(oneSpot => oneSpot.id === +spotId)

    let sessionUserId
    if(sessionUser) {
         sessionUserId = sessionUser.id;
    }

    useEffect(() => {
        dispatch(getAllReviews(spotId))
        // dispatch(getOneSpot(spotId))
    }, [dispatch, spotId])

    const allReviews = useSelector(state => Object.values(state.reviews))
    const reviews = allReviews.filter(review => review.spotId === +spotId)

    const handleDelete = async (reviewId) => {
        const deleteReview = await dispatch(deleteReview(reviewId)).then (() => dispatch(getOneSpot(spotId)))
    }

    if(!spot) return null

    return (
        <div className="outter-container-reviews">
            {reviews.map((review) => {
                return (
                    <div className="inner-container-reviews">
                        <div>{review.User.firstName}★{review.stars} {sessionUserId === review.userId ? <button className = 'deleteReviewButton' onClick = {() => handleDelete(review.id)}>Delete Review</button> : null}</div>
                    </div>
                )
            })}
        </div>
    )

}

export default AllReviews
