import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory, NavLink } from 'react-router-dom'
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormPage";
import LoginForm from "../LoginFormModal/LoginForm";
import SignupFormPage from "../SignupFormPage/SignupForm";
// import CreateSpotModal from "../CreateSpotForm";
import DemoUser from "../Demo";
import { Modal } from "../../context/Modal";

function ProfileButton({ user, setLogin, setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignUpModal, setShowSignUpModal] = useState(false)
  const sessionUser = useSelector(state => state.session.user)

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    setShowLoginModal(false)
    setShowSignUpModal(false)
    history.push('/')
  };

  // const mySpots = (e) => {
  //   e.preventDefault()
  //   history.push('/current/spots')
  // }

  if(sessionUser){
    return (
      <>
        <button className='user-profile-btn' onClick={openMenu}>
          <div className='user-proflie-icons'>
            <i className='navbar-user-circle fas fa-user-circle fa-2x'></i>
          </div>
        </button>

        {showMenu && (
          <ul className='user-dropdown'>
            <ul className='user-info'>Welcome {user.firstName}</ul>
            <ul className='user-info'>{user.email}</ul>
            <ul>
              <button className='logout-btn' onClick={logout}>Logout</button>
            </ul>
          </ul>
        )}
      </>
    )
  } else {
    return (
      <>
        <button className='user-profile-btn' onClick={openMenu}>
          <div className='user-profile-icons'>
            <i className='navbar-user-circle fas fa-user-circle fa-2x'></i>
          </div>
        </button>

        {showMenu && (
          <ul className='user-dropdown'>
            <li className='modal-dropdown' onClick={() => setShowSignUpModal(true)}><SignupFormModal /></li>
            <li className='modal-dropdown' onClick={() => setShowLoginModal(true)}><LoginFormModal /></li>
          </ul>
        )}

        {showLoginModal && (
          <Modal onClose={() => setShowLoginModal(false)}>
          <LoginForm />
          <DemoUser />
          </Modal>
        )}

        {showSignUpModal && (
          <Modal onClose={() => setShowSignUpModal(false)}>
            <SignupFormPage />
          </Modal>
        )}

      </>
    )
  }

}

export default ProfileButton
