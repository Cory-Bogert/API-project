
import React, {  useEffect, useState } from 'react';
import { useParams,  NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './SpotDetail.css'
import { getAllSpots, deleteSpot, getOneSpot } from "../../store/SpotsReducer";
import { getAllReviews } from '../../store/reviews';
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

    // useEffect(() => {
    //     // dispatch((getAllSpots()))
    //     dispatch((getAllReviews(spotId)))
    // }, [dispatch])

    const allSpots = useSelector(state =>Object.values(state.spots))
    // console.log(allSpots, 'asd;lfkjasdf')
    const spot = allSpots.find(spot => spot.id === spotId)
    // console.log(spot, 'adsl;kfjasd;lfk')

    const allReviews = useSelector(state=> Object.values(state.reviews))
    // console.log(allReviews, allReviews.length, 'this is all the reviews')


    const user = useSelector(state => state.session.user)
    // console.log(user, 'this is the user')
    // console.log(spot, 'asdl;fkjads')


    useEffect(() => {
        dispatch(getAllSpots())
        // dispatch(getAllReviews())
    }, [dispatch])

    // console.log(getAllReviews(), 'this is the getallreviews')

    const deleteThisSpotBtn = (e) => {
        e.preventDefault()
        dispatch(deleteSpot(spotId))
        history.push('/')

        // const sendThisSpotToOblivion = dispatch(deleteSpot(spotId))

    }

    // const history = useHistory()
    // const dispatch = useDispatch()
    // const { spotId } = useParams()
    // const userId = useSelector(state => state.session.user?.id)
    // const ownerId = useSelector(state => state.spots.)



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
           <div className='small-img-container'>

           {/* <div className="stock-images">
                        <div>
                            <img className='thumbnail' src={'https://a0.muscache.com/im/pictures/prohost-api/Hosting-20959187/original/008c0a3a-04b7-4e29-912f-615d00de8f7b.jpeg?im_w=720'} alt='interior image' />
                        </div>
                        <div>
                            <img className='thumbnail' src={'https://a0.muscache.com/im/pictures/prohost-api/Hosting-20959187/original/3da605b6-fe1d-4efa-ac5b-27e858873ed8.jpeg?im_w=720'} alt='interior image' />
                        </div>
                        <div className='stock-images'>
                            <img className='thumbnail' src={'https://a0.muscache.com/im/pictures/prohost-api/Hosting-20959187/original/726e44c6-0498-4e6e-96be-b4ac6791d6d6.jpeg?im_w=720'} alt='interior image' />
                        <div >
                            <img className='thumbnail' src={'https://a0.muscache.com/im/pictures/prohost-api/Hosting-20959187/original/b8f79fb6-f16b-43bc-8108-1671bc2bef97.jpeg?im_w=720'} alt='interior image' />
                        </div>
                    </div>
                    </div> */}

           <div className='host-container'>
           {`${spot.name} hosted by Cory`}
           </div>

           <div className='description-container'>
            {spot.description}
           </div>

           <div className='description-container'>
            {`$${spot.price} per night`}
           </div>

           <div className='description-container'>
            ★{Number(spot.avgRating).toFixed(1)}
           </div>

           <div className='review-details'>
            <AllReviews />
           </div>

           {/* <ReviewsBrowser /> */}
           </div>




           {user && user.id === spot.ownerId ? null : (
            <div className='create-review'>
                <CreateReviewModal />
            </div>
           )}

           <div>
            {user && user.id === spot.ownerId ? <EditSpotFormModal /> : null}
           </div>

           <div>
            {user && user.id === spot.ownerId ? <button className='delete-btn' onClick={deleteThisSpotBtn}>Delete</button> : null}
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
