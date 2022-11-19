import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormPage from '../SignupFormPage';

import './Navigation.css';
import { Modal } from '../../context/Modal';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  const [showModal, setShowModal] = useState(false)
  const [login, setLogin] = useState(true)


  return (
    <div className='nav-container'>
      <div className='errorbnb-logo'><NavLink exact to='/'> <img src='https://static.dezeen.com/uploads/2014/07/Airbnb-rebrand-by-DesignStudio_dezeen_468_8.jpg' alt=''></img> </NavLink></div>
       <NavLink exact to='/' className='logo-text'><h2 className='header-logo'>ErrorBnb</h2></NavLink>
       <ul>
        <div className='navBar'>
          {/* {sessionUser && <create} */}
          {isLoaded && (
            <ProfileButton user={sessionUser}
            setLogin={setLogin}
            setShowModal={setShowModal} />
          )}
        </div>
       </ul>
       {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {login ? <LoginFormModal setShowModal={setShowModal}/> : <SignupFormPage setShowModal={setShowModal}/>}
        </Modal>
       )}
    </div>
  );
}

export default Navigation;
