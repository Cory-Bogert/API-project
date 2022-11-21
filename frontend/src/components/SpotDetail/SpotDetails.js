
import React, {  useEffect } from 'react';
import { useParams,  } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import './SpotDetail.css'

import { getAllSpots, deleteSpot } from "../../store/SpotsReducer";
import { getAllReviews } from '../../store/ReviewsReducer';
import CreateReviewModal from '../CreateReviewForm';
// import { deleteSpot } from '../../store/SpotsReducer';
// import DeleteSpot from '../DeleteSpot';

import EditSpotFormModal from '../EditForm';



const SpotDetails = () => {
    // const history = useHistory()
    const allSpots = useSelector(state => Object.values(state.spot))
    const { spotId } = useParams()
    // let allReviews = useSelector(state => Object.values(state.review))
    let sessionUser = useSelector(state => (state.session.user))
    const spot = allSpots.find(spot => spot.id === +spotId)
    const dispatch = useDispatch()



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
           <div className='spot-card'>
            <h1>{spot.name}</h1>
            <button onClick={deleteThisSpot}>Delete Spot</button>
           </div>

           <div>
            {/* <i className='fa-solid fa-star'></i> */}

             {spot.address} {spot.city} {spot.state}
           </div>

           <div>
            <img className='spot-image' src={spot.previewImage} alt='spot'/>
           </div>

           <div>
            {spot.description}
           </div>

           <div>
            {`$${spot.price} per night`}
           </div>

           <div>
            ★{!spot.avgRating ? '0' : spot.avgRating}
           </div>

           {/* {<reviewsReducer />} */}

           {sessionUser && sessionUser.id === spot.ownerId ? null : (
            <div className='create-review'>
                <CreateReviewModal />
            </div>
           )}

           <div>
            {sessionUser && sessionUser.id === spot.ownerId ? <EditSpotFormModal /> : null}
           </div>

           <footer>
            <div className='footer'>
                <p>© 2022 Airbnb, Inc.</p>
            </div>
           </footer>


        </>
    )

}

export default SpotDetails
