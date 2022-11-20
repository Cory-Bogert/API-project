import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormPage from '../SignupFormPage';
import CreateSpotModal from '../CreateSpotForm';

import './Navigation.css';
import { Modal } from '../../context/Modal';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);
  // const [showModal, setShowModal] = useState(false)
  // const [login, setLogin] = useState(true)
  const sessionLinks = (<ProfileButton className='profile-btn' user={sessionUser}/>)


  return (

    <header>
      <nav className='navbar-container'>
        <div className='logo-container'>
          <i class='fa-solid fa-dragon logo-name'></i>
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

//   return (
//     <div className='nav-container'>
//       <div className='errorbnb-logo'><NavLink exact to='/'> <img src='https://static.dezeen.com/uploads/2014/07/Airbnb-rebrand-by-DesignStudio_dezeen_468_8.jpg' alt=''></img> </NavLink></div>
//        <NavLink exact to='/' className='logo-text'><h2 className='header-logo'>ErrorBnb</h2></NavLink>
//        <ul>
//         <div className='navBar'>
//           {/* {sessionUser && <create} */}
//           {isLoaded && (
//             <ProfileButton user={sessionUser}
//             setLogin={setLogin}
//             setShowModal={setShowModal} />
//           )}
//         </div>
//        </ul>
//        {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           {login ? <LoginFormModal setShowModal={setShowModal}/> : <SignupFormPage setShowModal={setShowModal}/>}
//         </Modal>
//        )}
//     </div>
//   );
// }
  }
export default Navigation
