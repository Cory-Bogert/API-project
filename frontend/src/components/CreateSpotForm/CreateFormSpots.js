import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Route, useHistory, useParams } from 'react-router-dom'
import { createSpot } from "../../store/SpotsReducer";

const CreateSpotForm = ({ closeModal }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const sessionUser = useSelector(state => state.session.user)

  const [validationErrors, setValidationErrors] = useState([])

  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [country, setCountry] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [url, setUrl] = useState("")
  const [preview, setPreview] = useState(false)

  const updateName = (e) => setName(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateUrl = (e) => setUrl(e.target.value)
  const updatePreview = (e) => setPreview(!preview)

  useEffect(() => {
    const errors = [];
    const urlArr = url.split('.')
    const urlEnd = urlArr[urlArr.length - 1]
    const validUrls = ['img', 'jpg', 'jpeg', 'png']

    if(url && !validUrls.includes(urlEnd)) {errors.push('Please provide an image ending with .img, .jpg, .jpeg, or .png')}
    if(price < 0) {errors.push('Minimum price must be at least $0')}
    if(!sessionUser) {errors.push('Must be logged in to create a spot')}
    if(description.length > 254){errors.push("Description can't exceed 255 characters")}

    setValidationErrors(errors)
  }, [url, price, description])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      name,
      address,
      city,
      state,
      country,
      description,
      price
    }

    const imagePayload = {
      url,
      preview: true
    }

    const newSpot = await dispatch(createSpot(imagePayload, payload))
    history.push(`/spots/${newSpot.id}`)
    closeModal()
  }

  return (
    <>
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Create a Spot</h1>
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

        <input
        placeholder="Image Url"
        id="image"
        type="string"
        required
        value={url}
        onChange={updateUrl} />

        <button className="submitButton" type="submit" disabled = {validationErrors.length > 0}>Create New Spot</button>

      </form>
    </div>
    </>
  )
}

export default CreateSpotForm
