import { useDispatch, useSelector } from "react-redux";
import { deleteSpot } from "../../store/SpotsReducer";
import { useHistory } from "react-router-dom";

const DeleteSpot = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const spotArr = useSelector(state => state.spots)
    let spots = Object.values(spotArr)
    const spot = spots[0]

    const submitDelete = (e) => {
        e.preventDefault()
        dispatch(deleteSpot(spot.id))
        history.push('/')
    }

    return (
        <div>
            <button onClick={submitDelete}>Delete</button>
        </div>
    )
}

export default DeleteSpot