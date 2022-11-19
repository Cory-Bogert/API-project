import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, NavLink, Link } from "react-router-dom";
import { getAllSpots } from "../../store/SpotsReducer";
// import SpotDetails from "../SpotDetail/SpotDetails";
// import { deleteSpot } from "../../store/SpotsReducer";
import { useEffect } from "react";

const currentUserSpots = () => {
    const dispatch = useDispatch()
    const spots = useSelector(state => state.spots)
    const spotsArr = Object.values(spots)
    const sessionUser = useSelector(state => state.session.user)
    const userId = sessionUser.id
    const userSpots = spotsArr.filter(spot => spot.ownerId === userId)



    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    if(!spots) return null

    return (
        <>
        <title>
        <h1>{`${sessionUser.firstName}'s Spots`}</h1>
        </title>

        <div className="outer-container">
            <div className="inner-container">
                {!userSpots.length ? (<h2 className="no-spots">No spots found.</h2>):
                 (userSpots.map(spot => {
                    return (
                        <div className="spot-card">
                            <Link key={spot.name} to={`/spots/${spot.id}`}>
                                <div><img className="image-container" src={spot.previewImage}></img></div>
                                <div className="text-container">
                                    <div className='spot-details'>{`${spot.city}, ${spot.state}`}</div>
                                    <div className="rating-container">
                                        <div className="star">
                                            <i className="fa-solid fa-star"></i>
                                            {!spot.avgRating ? "0" : spot.avgRating}
                                        </div>
                                    <div className="spot-price">{`${spot.price} per night`}</div>
                                    </div>
                                </div>
                            </Link>
                        {/* <div className="btn-container">
                            <button><NavLink to={`/spots${spot.id}`}>Edit</NavLink></button>
                            <button><NavLink to={`/spots${spot.id}`}>Delete</NavLink></button>
                        </div> */}

                        </div>
                    )
                 }))
            }

            </div>

        </div>


        </>
    )
}

export default currentUserSpots;
