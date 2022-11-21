import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import CreateSpotModal from '../CreateSpotForm';

import './Navigation.css';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  const sessionLinks = (<ProfileButton className='profile-btn' user={sessionUser}/>)


  return (

    <header>
      <nav className='navbar-container'>
        <div className='logo-container'>
          {/* <i class='fa-solid fa-dragon logo-name'></i> */}
          <div className='logo-name'><NavLink className='logo-name' exact to='/'>ErrorBnb</NavLink></div>
        </div>

        <div className='welcome-container'>{sessionUser ? (`Welcome, ${sessionUser.firstName}!`): ('Welcome to ErrorBnb')}</div>
        <div className='navbar-right'>
          <div className='create-spot'>
            <CreateSpotModal />
          </div>

          <div className='user-container'>
            <div className='profile-dropdown'>
              {isLoaded && sessionLinks}
            </div>
          </div>
        </div>


      </nav>
    </header>

  )
  }
export default Navigation
