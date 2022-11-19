import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateSpot } from '../../store/SpotsReducer';
import { getOneSpot, getAllSpots } from '../../store/SpotsReducer';
// import SpotDetails from '../SpotDetail/SpotDetails';

const EditFormSpot = ({ closeModal }) => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const allSpots = useSelector(state => Object.values(state.spots))
  const currentSpot = allSpots.find(spot => spot.id === spotId)
  const history = useHistory();


  const [name, setName] = useState(currentSpot.name)
  const [address, setAddress] = useState(currentSpot.address)
  const [city, setCity] = useState(currentSpot.city)
  const [state, setState] = useState(currentSpot.state)
  const [country, setCountry] = useState(currentSpot.country)
  const [description, setDescription] = useState(currentSpot.description)
  const [price, setPrice] = useState(currentSpot.price)
  const [validationErrors, setValidationErrors] = useState([])

  const updateName = (e) => setName(e.target.value)
  const updateAddress = (e) => setAddress(e.target.value)
  const updateCity = (e) => setCity(e.target.value)
  const updateState = (e) => setState(e.target.value)
  const updateCountry = (e) => setCountry(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)
  const updatePrice = (e) => setPrice(e.target.value)

  useEffect(() => {
    const errors = []
    if(price < 0) {errors.push('Minimum price must be at least $0')}
    if(description.length > 254){errors.push("Description can't exceed 255 characters")}

    setValidationErrors(errors)
  }, [price, description])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
        ...currentSpot,
        name,
        address,
        city,
        state,
        country,
        description,
        price
    }

    const updatedSpot = await dispatch(updateSpot(payload))
    dispatch(getOneSpot(spotId))
    closeModal()
    history.push(`/spots/${spotId}`)
  }

  return (
    <>
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Edit Spot</h1>
        <div>
          {validationErrors.length > 0 &&
          validationErrors.map((error) => <div className="errors-container" key={error}>{error}</div>)}
        </div>

        <input
        placeholder="Name your spot"
        id="name"
        type="string"
        required
        value={name}
        onChange={updateName} />

        <input
        placeholder="Address"
        id="address"
        type="string"
        required
        value={address}
        onChange={updateAddress} />

        <input
        placeholder="City"
        id="city"
        type="string"
        required
        value={city}
        onChange={updateCity} />

        <input
        placeholder="State"
        id="state"
        type="string"
        required
        value={state}
        onChange={updateState} />

        <input
        placeholder="Country"
        id="country"
        type="string"
        required
        value={country}
        onChange={updateCountry} />

        <input
        placeholder="Description"
        id="description"
        type="string"
        required
        value={description}
        onChange={updateDescription} />

        <input
        placeholder="Price"
        id="price"
        type="number"
        required
        min={"0"}
        value={price}
        onChange={updatePrice} />


        <button className="submitButton" type="submit" disabled = {validationErrors.length > 0}>Update Spot</button>

      </form>
    </div>
    </>



  )

}

export default EditFormSpot
