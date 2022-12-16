import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getAllReviews, createReviews } from '../../store/reviews';
import { getOneSpot } from '../../store/SpotsReducer';
// import AllSpots from '../SpotsBrowser';

const CreateReview = ({closeModal}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  let { spotId } = useParams()
  spotId = parseInt(spotId)
  console.log(spotId, 'this is the spotid -------------')


  const sessionUser = useSelector(state => state.session.user)
  let userId
  if(sessionUser){
    userId = sessionUser.id
  }


  console.log(sessionUser, 'sessionusersssssssssssssssssssssssssssssssssssssssssss')
  const [stars, setStars] = useState(1)
  const [review, setReview] = useState("")
  const [validationErrors, setValidationErrors] = useState([])

  const updateReview = (e) => setReview(e.target.value)
  const updateStars = (e) => setStars(e.target.value)





  useEffect(() => {
    const errors = []
    if(stars < 1 || stars > 5) errors.push("Rating needs to be between 1 and 5")
    if(review.length > 254) errors.push("Reviews must be less than 255 characters")
    if(review.length < 1) errors.push('Please provide a review')
    if(!sessionUser) errors.push('User must be logged in to leave a review')

    setValidationErrors(errors)
  }, [stars, review])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      review,
      stars,
      spotId,
      userId
    }

    let createdReview = await dispatch(createReviews(payload))
    dispatch(getAllReviews(spotId))
    dispatch(getOneSpot(spotId))
    closeModal()
    history.push(`/spots/${spotId}`)
    // if(newReview) closeModal()

  }


  return (
    <div className='create-review-container'>
      <h1 className='title'>Create a Review</h1>
      <form onSubmit={handleSubmit}>
        <div className='errors'>
          {validationErrors.length > 0 &&
           validationErrors.map((error) => <div>{error}</div>)}
        </div>

        <input
          placeholder='Leave Review Here'
          required
          id='review'
          type='text'
          value={review}
          onChange={updateReview}
        />

        <input
          placeholder='Leave a Rating between 1-5'
          required
          id='stars'
          type='number'
          value={stars}
          onChange={updateStars}
        />

        <button className='submit-btn' disabled={validationErrors.length > 0} type='submit' >Create Review</button>



      </form>
    </div>

  )
}

export default CreateReview
