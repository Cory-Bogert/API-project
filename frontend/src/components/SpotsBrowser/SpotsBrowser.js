import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, useParams, Link } from 'react-router-dom';
import './SpotsBrowser.css'

import { getAllSpots } from '../../store/spotsReducer';

const SpotsBrowser = () => {
    const dispatch = useDispatch()
    const spot = useSelector(state => {
        return state.spot
    })
    const spotArray = Object.values(spot)
    const [showForm, setShowFOrm] = useState(false)

    useEffect(() => {
        dispatch(getAllSpots())
    }, [dispatch])

    if(!spot){
        return null
    }
    return (
        <main>
            <div className='allSpotsDetails'>{
                spotArray.map((displayAllSpots) => {
                    return (
                        <Link key={displayAllSpots.address} to={`/spots/${displayAllSpots.id}`}>
                            {/* <SingleSpotDetail spotArray={spotArray} /> */}
                            <div className="allSpots">

                                <div ><img className="spotimages" src={displayAllSpots.previewImage} /></div>
                                <div className='details'>
                                    <div id="address-rating">
                                        <span> {displayAllSpots.address} </span>
                                        {/* {displayAllSpots.city}  */}
                                        <span className="rating-star"><i class="fa-solid fa-star"></i> {displayAllSpots.avgRating}

                                        </span>
                                    </div>

                                    <div id="address-rating">{displayAllSpots.state}, {displayAllSpots.country}</div>
                                    {/* <div><i class="fa-solid fa-star"></i> {displayAllSpots.avgRating} */}

                                    <div>${displayAllSpots.price} night</div>
                                    {/* <div>{displayAllSpots.city}</div> */}

                                    {/* <div>{displayAllSpots.numReviews}</div> */}
                                    {/* <div>{displayAllSpots.avgRating}</div> */}
                                    {/* <div>{displayAllSpots.url}</div> */}
                                </div>



                            </div>
                        </Link>

                    )
                })
            } </div>
        </main>
    )
}

export default SpotsBrowser
