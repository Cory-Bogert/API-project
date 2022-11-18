import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from './SignupForm.js';
// import './SignupForm.css'
function SignUpFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button id="Modal-signup" onClick={() => setShowModal(true)}>Sign Up</button>
      {showModal && (
        <Modal onClose={(e) => {
          setShowModal(false);
          e.stopPropagation();
        }}>
          <SignupFormPage />
        </Modal>
      )}
      </>
  );
}

export default SignUpFormModal;
