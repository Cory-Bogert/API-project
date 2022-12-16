
import React, {  useEffect, useState } from 'react';
import { useParams,  NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './SpotDetail.css'
import { getAllSpots, deleteSpot, getOneSpot } from "../../store/SpotsReducer";
import { getAllReviews, createReviews } from '../../store/reviews';
import CreateReviewModal from '../CreateReviewForm';
import EditSpotFormModal from '../EditForm';
import AllReviews from '../Reviews';
// import ReviewsBrowser from '../Reviews';




const SpotDetails = () => {
    const dispatch = useDispatch()
    // const [isLoaded, setIsLoaded] = useState(false)
    const history = useHistory()
    let { spotId } = useParams()
    spotId = parseInt(spotId)
    // console.log(spotId, '------------------------')

    useEffect(() => {
        // dispatch((getAllSpots()))
        dispatch((getAllReviews(spotId)))
    }, [dispatch])

    const allSpots = useSelector(state =>Object.values(state.spots))
    // console.log(allSpots, 'asd;lfkjasdf')
    const spot = allSpots.find(spot => spot.id === spotId)
    // console.log(spot, 'adsl;kfjasd;lfk')

    const allReviews = useSelector(state=> Object.values(state.reviews))
    console.log(allReviews, allReviews.length, 'this is all the reviews')


    const user = useSelector(state => (state.session.user))
    console.log(user, 'this is the user')
    // console.log(spot, 'asdl;fkjads')



    // const allSpots = useSelector(state => Object.values(state.spot))
    // const { spotId } = useParams()

    // let sessionUser = useSelector(state => (state.session.user))
    // const spot = allSpots.find(spot => spot.id === +spotId)
    // const dispatch = useDispatch()



    useEffect(() => {
        dispatch(getAllSpots())
        dispatch(getAllReviews())
    }, [dispatch])

    // console.log(getAllReviews(), 'this is the getallreviews')

    const deleteThisSpot = () => {
        const sendThisSpotToOblivion = dispatch(deleteSpot(spotId))

    }



    return (
        <div className='spot-container'>
           <div className='spot-card'>
            <h1>{spot.name}</h1>
            {/* <button className='delete-btn' onClick={deleteThisSpot}>Delete Spot</button> */}
           </div>

           <div className='spot-details'>

             {spot.address} {spot.city} {spot.state}
           </div>

           <div>
            <img className='spot-image' src={spot.previewImage} alt='spot'/>
           </div>

           <div className='host-container'>
           {`${spot.name} hosted by Cory`}
           </div>

           <div className='description-container'>
            {spot.description}
           </div>

           <div>
            {`$${spot.price} per night`}
           </div>

           <div className='stars-rating'>
            ★{Number(spot.avgRating).toFixed(1)}
           </div>

           <div className='review-details'>
            <AllReviews />
           </div>

           {/* <ReviewsBrowser /> */}




           {user && user.id === spot.ownerId ? null : (
            <div className='create-review'>
                <CreateReviewModal />
            </div>
           )}

           <div>
            {user && user.id === spot.ownerId ? <EditSpotFormModal /> : null}
           </div>

           <footer>
            <div className='footer'>
                <p>© 2022 Airbnb, Inc.</p>
            </div>
           </footer>


        </div>
    )

}

export default SpotDetails
