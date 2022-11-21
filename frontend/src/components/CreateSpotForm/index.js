import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateSpotForm from "./CreateFormSpots";
import './CreateSpotForm.css'

function CreateSpotModal() {
    const [showModal, setShowModal] = useState(false)

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
        <button className="submit-btn" onClick={() => setShowModal(true)}>Become A Host</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <CreateSpotForm closeModal={closeModal}/>
            </Modal>
        )}



        </>
    )
}

export default CreateSpotModal
