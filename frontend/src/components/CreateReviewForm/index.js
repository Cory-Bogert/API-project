import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CreateReview from './CreateReview';

function CreateReviewModal() {
    const [showModal, setShowModal] = useState(false)

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <>
            <button className='review-btn' onClick={() => setShowModal(true)}>Create a Review</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)} >
                    <CreateReview closeModal = {closeModal} />
                </Modal>
            )}

        </>
    )
}

export default CreateReviewModal
