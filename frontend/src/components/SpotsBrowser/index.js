import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/SpotsReducer";
import { Link, NavLink } from 'react-router-dom'
// import CreateSpotModal from "../CreateSpotForm";


const AllSpots = () => {
    const dispatch = useDispatch()
    const spots = Object.values(useSelector(state => state.spots))

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    if(!spots) {
        return null
    }

    return (
        <div className = 'cardOuterContainer'>
            <div className='cardInnerContainer'>

                {spots.map(spot => {
                    return (
                    <div className = 'spotCard'>
                    <NavLink key={spot.name} to={`/spots/${spot.id}`}>

                        <div><img className='spotImage' src={spot.previewImage} width="200" height="150"></img></div>
                        <div className = 'spotDeets'>
                        <div className = 'spotName'>{spot.name}</div>
                        <div className = 'spotRating'><div className = "star"><i class="fa-sharp fa-solid fa-star fa-xs"></i></div>  <div className = "avgRating">{!spot.avgRating ? "0" : spot.avgRating}</div></div>
                        </div>
                        <div className='spotAddress'>{spot.city}, {spot.state}</div>
                        <div className='spotPrice'>${spot.price}</div>

                    </NavLink>
                </div>
                    )
                })}

            </div>

        </div>
        )

    }

export default AllSpots
