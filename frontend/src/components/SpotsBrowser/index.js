import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/SpotsReducer";
import { Link } from 'react-router-dom'
import './AllSpots.css'



const AllSpots = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    let spots = useSelector(state => state.spots)
    let spotsArr = Object.values(spots)
    if(!spotsArr) return null

    return (
        <>

            <div className='cardInnerContainer'>

                {spotsArr.map(spots => {
                    return (
                    <Link className="spot-link" key={spots.address} to={`/spots/${spots.id}`}>
                    <div className = 'spotCard'>
                    <div className="all-spots">
                    <div><img className="spot-image" src={spots.previewImage} alt='' /></div>
                    <div className="spot-details">
                    <h4 className="address-text">{spots.city}, {spots.state}</h4>
                    <h4 classNumberName="avg-rating">★{Number(spots.avgRating).toFixed(1) ? Number(spots.avgRating).toFixed(1) : '0.0'}</h4>
                    </div>
                    <h6 className="spot-name">{spots.name}</h6>
                    <h6 className="spot-price">${spots.price} per night</h6>
                    </div>
                    </div>
                    </Link>
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
