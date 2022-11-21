import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getAllReviews, createReviews, deleteReview } from '../../store/ReviewsReducer';
import { getOneSpot } from '../../store/SpotsReducer';

const CreateReview = ({closeModal}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { spotId } = useParams()


  const [stars, setStars] = useState(1)
  const [review, setReview] = useState("")
  const [validationErrors, setValidationErrors] = useState([])

  const updateReview = (e) => setReview(e.target.value)
  const updateStars = (e) => setStars(e.target.value)

  useEffect(() => {
    const errors = []
    if(stars < 1 || stars > 5) errors.push("Rating needs to be between 1 and 5")
    if(review.length > 254) errors.push("Reviews must be less than 255 characters")

    setValidationErrors(errors)

  }, [stars, review])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewPayload = {
      review,
      stars,
      spotId
    }

    const newReview = await dispatch(createReviews(reviewPayload))
    dispatch(getAllReviews(spotId))
    dispatch(getOneSpot(spotId))
    closeModal()
    history.push(`/spots/${spotId}`)
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
