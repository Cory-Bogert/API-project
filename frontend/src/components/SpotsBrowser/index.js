import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/SpotsReducer";
import { Link } from 'react-router-dom'
// import CreateSpotModal from "../CreateSpotForm";


const AllSpots = () => {
    const dispatch = useDispatch()
    const spot = Object.values(useSelector(state => state.spot))


    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    if(!spot) return null


    return (
        <div className = 'cardOuterContainer'>
            <div className='cardInnerContainer'>

                {spot.map(spots => {
                    return (
                    <div className = 'spotCard'>
                    <Link key={spots.address} to={`/spots/${spots.id}`}>
                    <div className="all-spots">
                    <div><img className="spot-image" src={spots.previewImage} /></div>
                    <div className="spot-details">
                    <h4 className="address-text">{spots.city}, {spots.state}</h4>
                    <h4 className="avg-rating">★{spots.avgRating ? spots.avgRating : '0.0'}</h4>
                    </div>

                    <h6>{spots.name}</h6>
                    <h6>{spots.price} per night</h6>
                    </div>
                    </Link>
            </div>
                    )
                })}

            </div>

        </div>
    //  <NavLink key={spot.name} to={`/spots/${spot.id}`}>

    //     <div><img className='spotImage' src={spot.previewImage} width="200" height="150"></img></div>
    //     <div className = 'spot-details'>
    //     <div className = 'spotName'>{spot.name}</div>
    //     <div className = 'spotRating'><div className = "star"><i class="fa-sharp fa-solid fa-star fa-xs"></i></div>  <div className = "avgRating">{!spot.avgRating ? "0" : spot.avgRating}</div></div>
    //     </div>
    //     <div className='spotAddress'>{spot.city}, {spot.state}</div>
    //     <div className='spotPrice'>${spot.price}</div>

    // </NavLink>
        )

    }







    export default AllSpots
