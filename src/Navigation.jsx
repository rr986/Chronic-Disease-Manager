import React, {useContext} from 'react';
import {NavLink} from 'react-router-dom';
import './App.css';
import {AuthContext} from './context/AuthContext';
import SignOutButton from './acc_components/SignOut';

const Navigation = () => {
  const {currentUser} = useContext(AuthContext);
  return <div>{currentUser ? <NavigationAuth /> : <NavigationNonAuth />}</div>;
};

const NavigationAuth = () => {
  return (
    <nav className='navigation'>
      <ul>
        <li>
          <NavLink
            to='/'
            className={(navData) => (navData.isActive ? 'active' : 'none')}
          >
            Landing
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/chronic_conditions'
            className={(navData) => (navData.isActive ? 'active' : 'none')}
          >
            Chronic Conditions
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/reminder'
            className={(navData) => (navData.isActive ? 'active' : 'none')}
          >
            Reminder
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/voiceinput'
            className={(navData) => (navData.isActive ? 'active' : 'none')}
          >
            VoiceInput
          </NavLink>
        </li>
        <li>
         <NavLink
            to='/diary'
            className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
            Diary
         </NavLink>
          </li>
        <li>
          <NavLink to='/account'>Account</NavLink>
        </li>
        <li>
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
};

const NavigationNonAuth = () => {
  return (
    <nav className='navigation'>
      <ul>
        <li>
          <NavLink to='/'>Landing</NavLink>
        </li>
        <li>
          <NavLink to='/signup'>Sign-up</NavLink>
        </li>

        <li>
          <NavLink to='/signin'>Sign-In</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
