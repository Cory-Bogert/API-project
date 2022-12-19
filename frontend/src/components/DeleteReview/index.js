// import React, { useState } from 'react'
// import { useDispatch, useSelector } from "react-redux";
// import { deleteReview } from '../../store/reviews';
// import { useHistory, useParams } from "react-router-dom";
// import './index.css'

// const DeleteReview = () => {
//     const dispatch = useDispatch()
//     const history = useHistory()
//     let { reviewId } = useParams()
//     reviewId = parseInt(reviewId)

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         let deletedReview = await dispatch(deleteReview(reviewId))
//         history.push(`/current/reviews`)
//     }
// }
