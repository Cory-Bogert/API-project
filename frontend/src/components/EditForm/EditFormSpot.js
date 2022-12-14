import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateSpot } from '../../store/SpotsReducer';
import { getAllSpots } from '../../store/SpotsReducer';
// import SpotDetails from '../SpotDetail/SpotDetails';

const EditFormSpot = ({ closeModal }) => {

  const dispatch = useDispatch();
  let { spotId } = useParams();
  spotId = parseInt(spotId)
  // const currentSpot = useSelector(state => state.spot[spotId])
  // console.log(state, 'I am the current spot refresh me')
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllSpots(spotId))
  }, [dispatch, spotId])

  // const currentSpot = useSelector(state => state.spot)

  const allSpots = useSelector(state => Object.values(state.spots))
  let currentSpot = allSpots.find(spot => spot.id === spotId)


  const [name, setName] = useState(currentSpot.name)
  const [address, setAddress] = useState(currentSpot.address)
  const [city, setCity] = useState(currentSpot.city)
  const [state, setState] = useState(currentSpot.state)
  const [country, setCountry] = useState(currentSpot.country)
  const [description, setDescription] = useState(currentSpot.description)
  const [price, setPrice] = useState(currentSpot.price)
  const [previewImage, setPreviewImage] = useState(currentSpot.previewImage)
  const [validationErrors, setValidationErrors] = useState([])

  const updateName = (e) => setName(e.target.value)
  const updateAddress = (e) => setAddress(e.target.value)
  const updateCity = (e) => setCity(e.target.value)
  const updateState = (e) => setState(e.target.value)
  const updateCountry = (e) => setCountry(e.target.value)
  const updateDescription = (e) => setDescription(e.target.value)
  const updatePrice = (e) => setPrice(e.target.value)
  const updatePreviewImage = (e) => setPreviewImage(e.target.value)

  useEffect(() => {
    const errors = []
    if(price < 0) {errors.push('Minimum price must be at least $0')}
    if(description.length > 254){errors.push("Description can't exceed 255 characters")}
    if(!address.length) {errors.push('Address is required')}
    if(!city.length){errors.push('City is required')}
    if(!state.length){errors.push('State is required')}
    if(!country.length){errors.push('Country is required')}
    if(!description.length){errors.push('Description is required')}
    if(name.length < 3){errors.push('Name must be 3 or more characters')}


    setValidationErrors(errors)
  }, [price, description, address, city, state, country, name])

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
        price,
        previewImage
    }

    return dispatch(updateSpot(payload)).then(async (response) => {
      // console.log(spotId, 'this is the spotId ================')
      // history.push(`/spots/${spotId}`)
      dispatch(getAllSpots(spotId))
      closeModal()
    })
    // dispatch(getOneSpot(spotId))
    // closeModal()
    // history.push(`/spots/${spotId}`)
  }

  return (
    <>
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          {validationErrors.length > 0 &&
          validationErrors.map((error) => <div className="errors-container" key={error}>{error}</div>)}
        </div>

        <input
        className='input'
        placeholder="Name your spot"
        id="name"
        type="string"
        required
        value={name}
        onChange={updateName} />

        <input
        className='input'
        placeholder="Address"
        id="address"
        type="string"
        required
        value={address}
        onChange={updateAddress} />

        <input
        className='input'
        placeholder="City"
        id="city"
        type="string"
        required
        value={city}
        onChange={updateCity} />

        <input
        className='input'
        placeholder="State"
        id="state"
        type="string"
        required
        value={state}
        onChange={updateState} />

        <input
        className='input'
        placeholder="Country"
        id="country"
        type="string"
        required
        value={country}
        onChange={updateCountry} />

        <input
        className='input'
        placeholder="Description"
        id="description"
        type="string"
        required
        value={description}
        onChange={updateDescription} />

        <input
        className='input'
        placeholder="Price"
        id="price"
        type="number"
        required
        min={"0"}
        value={price}
        onChange={updatePrice} />


        <button  className="edit-btn" type="submit" disabled = {validationErrors.length > 0}>Update Spot</button>

      </form>
    </div>
    </>



  )

}

export default EditFormSpot
