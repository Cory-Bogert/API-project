import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import EditFormSpot from './EditFormSpot'
import './EditForm.css'

function EditSpotFormModal() {
    const [showModal, setShowModal] = useState(false)

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <button className="edit-btn" onClick={() => setShowModal(true)}>Edit Spot</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditFormSpot closeModal={closeModal} />
                </Modal>
            )}

        </>
    )
}

export default EditSpotFormModal
