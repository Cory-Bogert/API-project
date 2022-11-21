import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { deleteSpot } from "../../store/SpotsReducer";
import { useHistory } from "react-router-dom";
import './index.css'

const DeleteSpot = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const spotArr = useSelector(state => state.spots)
    const spots = Object.values(spotArr)
    const spot = spots[0]

    const submitDelete = (e) => {
        e.preventDefault()
        dispatch(deleteSpot(spot.id))
        history.push('/')
    }

    return (
        <div>
            <button className='delete-btn' onClick={submitDelete}>Delete</button>
        </div>
    )
}

export default DeleteSpot
