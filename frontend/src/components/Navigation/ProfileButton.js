import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { useHistory } from 'react-router-dom'
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormPage";
import LoginForm from "../LoginFormModal/LoginForm";
import SignupFormPage from "../SignupFormPage/SignupForm";
import CreateSpotModal from "../CreateSpotForm";

function ProfileButton({ user, setLogin, setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory()
  const [showMenu, setShowMenu] = useState(false);

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
    history.push('/')
  };

  return (
    <>
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />

      </button>
      {showMenu && (user ?
        <ul className="profile-dropdown">
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul> :
        <ul>
          <button onClick={() => {
            setLogin(true)
            setShowModal(true)
          }}>
            Log In
          </button>

          <button onClick={() => {
            setLogin(false)
            setShowModal(true)
          }}>
            Sign Up
          </button>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
