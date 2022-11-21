import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/SpotsReducer";
import { Link } from 'react-router-dom'
import './AllSpots.css'
// import CreateSpotModal from "../CreateSpotForm";


const AllSpots = () => {
    const dispatch = useDispatch()
    const spot = Object.values(useSelector(state => state.spot))


    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    if(!spot) return null


    return (
        <>

            <div className='cardInnerContainer'>

                {spot.map(spots => {
                    return (
                        <div className = 'spotCard'>
                    <Link className="spot-link" key={spots.address} to={`/spots/${spots.id}`}>
                    <div className="all-spots">
                    <div><img className="spot-image" src={spots.previewImage} /></div>
                    <div className="spot-details">
                    <h4 className="address-text">{spots.city}, {spots.state}</h4>
                    <h4 className="avg-rating">★{spots.avgRating ? spots.avgRating : '0.0'}</h4>
                    </div>

                    <h6 className="spot-name">{spots.name}</h6>
                    <h6 className="spot-price">{spots.price} per night</h6>
                    </div>
                    </Link>
            </div>
                    )
                })}



            </div>

<footer>
<div className='footer'>
    <p>© 2022 Airbnb, Inc.</p>
</div>
</footer>
                </>




        )

    }







    export default AllSpots
