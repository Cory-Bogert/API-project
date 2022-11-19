import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import CreateSpotForm from './CreateSpotForm'

function CreateSpotModal() {
    const [showModal, setShowModal] = useState(false)

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
        <button onClick={() => setShowModal(true)}>Become A Host</button>
        {showModal && (
            <Modal onClose={() => setShowModal(false)}>
                <CreateSpotForm closeModal={closeModal}/>
            </Modal>
        )}



        </>
    )
}

export default CreateSpotModal
