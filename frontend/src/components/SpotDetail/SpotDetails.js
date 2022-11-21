
import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getAllSpots, deleteSpot, getOneSpot } from "../../store/SpotsReducer";
import { getAllReviews, createReviews, deleteReview } from '../../store/ReviewsReducer';
import CreateReviewModal from '../CreateReviewForm';
// import { deleteSpot } from '../../store/SpotsReducer';
// import DeleteSpot from '../DeleteSpot';

import EditSpotFormModal from '../EditForm';



const SpotDetails = () => {
    const history = useHistory()
    const allSpots = useSelector(state => Object.values(state.spot))
    const { spotId } = useParams()
    // let allReviews = useSelector(state => Object.values(state.review))
    let sessionUser = useSelector(state => (state.session.user))
    const spot = allSpots.find(spot => spot.id === +spotId)
    const dispatch = useDispatch()

    // const isUserOwner = (spot, user) => spot && user && spot.ownerId === user.id
    // const isUserReviewCreator = (review, user) => user && user.id === review.userId

    useEffect(() => {
        dispatch(getAllSpots())
        dispatch(getAllReviews())
    }, [dispatch])

    const deleteThisSpot = () => {
        const sendThisSpotToOblivion = dispatch(deleteSpot(spotId))
        // .then(() => dispatch(getAllSpots())).then(() => history.push(`/`))
    }



    return (
        <>
           <div>
            <h1>{spot.name}</h1>
            <button onClick={deleteThisSpot}>Delete Spot</button>
           </div>

           <div>
            {/* <i className='fa-solid fa-star'></i> */}

            ★{spot.avgRating} {spot.address} {spot.city} {spot.state}
           </div>

           <div>
            <img className='spot-image' src={spot.previewImage} />
           </div>

           <div>
            {spot.description}
           </div>

           <div>
            {`$${spot.price} per night`}
           </div>

           <div>
            {/* <i className='fa-solid fa-star'></i> */}
            ★{!spot.avgRating ? 'NEW' : spot.avgRating}
           </div>

           {/* {<reviewsReducer />} */}

           {sessionUser && sessionUser.id === spot.ownerId ? null : (
            <div className='create-review'>
                <CreateReviewModal />
            </div>
           )}

           <div>
            {sessionUser && sessionUser === spot.ownerId ? <EditSpotFormModal /> : null}
           </div>


        </>
    )

}

export default SpotDetails
